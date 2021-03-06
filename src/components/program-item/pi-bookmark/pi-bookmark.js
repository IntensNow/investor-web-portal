import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./pi-bookmark.css";

const PIBookmark = ({ isFavorite, onClick, className }) => {
  return (
    <i
      onClick={onClick}
      className={classnames("fas fa-bookmark", "pi-bookmark", className, {
        "pi-bookmark--active": isFavorite
      })}
    />
  );
};

PIBookmark.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PIBookmark;
