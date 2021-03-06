import React from "react";

import ProgramItem from "./program-item/program-item";

const ProgramList = ({
  programs,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram
}) => {
  if (programs.length === 0) return <div>There are no programs</div>;
  return programs.map((program, idx) => {
    program.order = program.order || idx + 1;
    return (
      <ProgramItem
        key={program.id}
        program={program}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        toggleFavoriteProgram={toggleFavoriteProgram}
      />
    );
  });
};

export default ProgramList;
