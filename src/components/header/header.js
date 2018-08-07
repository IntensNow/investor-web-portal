import "./header.scss";

import Navigation from "components/navigation/navigation";
import ProfileHeaderContainer from "modules/profile-header/components/profile-header-container";
import React from "react";

const Header = () => {
  return (
    <div className={"header"}>
      <Navigation />
      <ProfileHeaderContainer />
    </div>
  );
};

export default Header;
