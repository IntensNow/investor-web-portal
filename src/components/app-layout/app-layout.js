import "./app-layout.scss";

import Header from "components/header/header";
import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
