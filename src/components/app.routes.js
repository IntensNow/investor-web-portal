import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

import NotFoundPage from "../shared/components/not-found/not-found";
import PrivateRoute from "../shared/components/private-route/private-route";

import { DASHBOARD_ROUTE } from "../modules/dashboard/dashboard.constants";
import { HOME_ROUTE } from "./app.constants";
import { LOGIN_ROUTE } from "../modules/login/login.constants";
import { PROFILE_ROUTE } from "../modules/profile/profile.constants";
import { PROGRAMS_ROUTE } from "../modules/programs/programs.constants";
import { REGISTER_ROUTE } from "../modules/register/register.constants";
import { WALLET_ROUTE } from "../modules/wallet/wallet.constants";

import {
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE
} from "../modules/password-reset/password-reset.constants";
import {
  ForgotPasswordRoutes,
  ResetPasswordRoutes
} from "../modules/password-reset/password-reset.routes";
import { PROGRAM_ROUTE } from "../modules/trader/trader.constants";
import DashboardRoutes from "../modules/dashboard/dashboard.routes";
import LoginRoutes from "../modules/login/login.routes";
import ProfileRoutes from "../modules/profile/profile.routes";
import RegisterRoutes from "../modules/register/register.routes";
import TraderRoutes from "../modules/trader/trader.routes";
import ProgramsRoutes from "../modules/programs/programs.routes";
import WalletRoutes from "../modules/wallet/wallet.routes";
import { EMAIL_CONFIRM_ROUTE } from "../modules/email-confirm/email-confirm.constants";
import EmailConfirmRoutes from "../modules/email-confirm/email-confirm.routes";

const AppRoutes = () => (
  <Switch>
    <Route path={EMAIL_CONFIRM_ROUTE} component={EmailConfirmRoutes} />
    <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPasswordRoutes} />
    <Route path={RESET_PASSWORD_ROUTE} component={ResetPasswordRoutes} />
    <Route path={LOGIN_ROUTE} component={LoginRoutes} />
    <Route path={REGISTER_ROUTE} component={RegisterRoutes} />
    <Route path={PROGRAM_ROUTE} component={TraderRoutes} />
    <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
    <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
    <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
    <PrivateRoute path={WALLET_ROUTE} component={WalletRoutes} />
    <Route
      exact
      path={HOME_ROUTE}
      render={() => <Redirect to={PROGRAMS_ROUTE} />}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
