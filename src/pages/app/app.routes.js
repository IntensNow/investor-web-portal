import AppLayout from "components/app-layout/app-layout";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import DashboardRoutes from "pages/dashboard/dashboard.routes";
import NotFoundPage from "pages/not-found/not-found.routes";
import PrivateRoute from "pages/private-route";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { HOME_ROUTE } from "pages/root.routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
        <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
        <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppLayout>
  );
};

export default AppRoutes;
