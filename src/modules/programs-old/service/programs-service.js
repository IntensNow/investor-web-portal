import authService from "../../../services/auth-service";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import filterPaneActionsFactory from "../../filter-pane/actions/filter-pane-actions";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";
import { composeFilteringActionType } from "../../filtering/helpers/filtering-helpers";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import sortingActionsFactory from "../../sorting/actions/sorting-actions";
import programsActions from "../actions/programs-actions";
import * as actionTypes from "../actions/programs-actions.constants";
import { SORTING_FILTER_NAME } from "../programs.constants";
import { composeProgramsFilters } from "./programs-helpers";

const favoritePrograms = programsActions.favoriteProgramCreator(
  actionTypes.PROGRAMS_FAVORITE
);

const filteringActions = filteringActionsFactory(actionTypes.PROGRAMS);
const sortingActions = sortingActionsFactory(actionTypes.PROGRAMS);
const filterPaneActions = filterPaneActionsFactory(actionTypes.PROGRAMS);

const getPrograms = () => (dispatch, getState) => {
  const { paging } = getState().programsData.programs;
  const { skip, take } = calculateSkipAndTake(paging);

  const { filtering } = getState().programsData.programs;
  const { sorting } = getState().programsData.programs;

  let data = {
    filter: { skip, take, equityChartLength: 365 }
  };
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }

  data.filter = { ...data.filter, ...composeProgramsFilters(filtering) };
  data.filter = {
    ...data.filter,
    [SORTING_FILTER_NAME]: sorting.value || sorting.defaultValue
  };

  const setLogoAndOrder = response => {
    response.investmentPrograms.forEach((x, idx) => {
      x.order = skip + idx + 1;
    });

    return response;
  };

  return dispatch(programsActions.fetchPrograms(data, setLogoAndOrder)).then(
    response => {
      const totalPages = calculateTotalPages(response.value.total, take);
      dispatch(updateProgramListPaging({ totalPages }));
      return response;
    }
  );
};

const updateProgramListPaging = paging => {
  const pagingActionsProgramList = pagingActionsFactory(actionTypes.PROGRAMS);
  return pagingActionsProgramList.updatePaging(paging);
};

const changeProgramListPage = paging => dispatch => {
  dispatch(updateProgramListPaging(paging));
  dispatch(getPrograms());
};

const changeProgramListFilter = filter => dispatch => {
  dispatch(filteringActions.updateFilter(filter));
  dispatch(
    updateProgramListPaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};

const changeProgramListSorting = sorting => dispatch => {
  dispatch(sortingActions.updateSorting(sorting));
  dispatch(
    updateProgramListPaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};

const clearProgramListFilter = filterName => (dispatch, getState) => {
  const { filtering } = getState().programsData.programs;
  const filter = filtering.defaultFilters.find(x => x.name === filterName);
  dispatch(filteringActions.updateFilter(filter));
  dispatch(
    updateProgramListPaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};

const clearProgramListFilters = () => dispatch => {
  dispatch(
    clearDataActionFactory(
      composeFilteringActionType(actionTypes.PROGRAMS)
    ).clearData()
  );
  dispatch(
    updateProgramListPaging({
      currentPage: 0
    })
  );
  dispatch(getPrograms());
};

const updateAfterInvestment = () => dispatch => {
  return Promise.all([dispatch(getPrograms())]);
};

const openFilterPane = () => {
  return filterPaneActions.openFilter();
};

const closeFilterPane = () => {
  return filterPaneActions.closeFilter();
};

const toggleFavoriteProgram = program => dispatch => {
  const { id: programId, isFavorite } = program;
  const requestData = {
    programId
  };
  if (authService.getAuthArg()) {
    requestData.authorization = authService.getAuthArg();
  }
  dispatch(
    isFavorite
      ? favoritePrograms.removeFavoriteProgram(requestData)
      : favoritePrograms.addFavoriteProgram(requestData)
  );
};

const programsService = {
  getPrograms,
  changeProgramListPage,
  updateAfterInvestment,
  openFilterPane,
  closeFilterPane,
  changeProgramListFilter,
  changeProgramListSorting,
  clearProgramListFilter,
  clearProgramListFilters,
  toggleFavoriteProgram
};
export default programsService;
