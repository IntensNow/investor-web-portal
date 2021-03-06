import { loginServicelogout } from "modules/login/service/login-service";
import { fetchProfileHeaderInfo } from "modules/profile-header/actions/profile-header-actions";
import ProfileHeader from "modules/profile-header/components/profile-header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

class ProfileHeaderContainer extends Component {
  componentDidMount() {
    this.props.fetchProfileHeaderInfo();
  }

  render() {
    if (!this.props.info.data) return null;
    return (
      <ProfileHeader
        {...this.props.info.data}
        logout={this.props.loginServicelogout}
      />
    );
  }
}

const mapDispatchToProps = {
  fetchProfileHeaderInfo,
  loginServicelogout
};

const mapStateToProps = state => ({
  ...state.profileHeader
});

export default compose(
  isAuthenticated,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileHeaderContainer);
