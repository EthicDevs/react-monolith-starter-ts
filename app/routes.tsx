// 1st-party
import type { IRouteParams } from "@ethicdevs/react-monolith";
import { AppRouter, AppRouterGroup, Router } from "@ethicdevs/react-monolith";
// 3rd-party
import React from "react";
// app
import { HomeView } from "./views";
import { ThemeController } from "./controllers";

export enum DocAppRoute {
  HOME = "home",
  API_THEME_GET = "api.theme.get",
}

export interface DocAppRoutesParams extends IRouteParams {
  [DocAppRoute.HOME]: undefined;
  [DocAppRoute.API_THEME_GET]: undefined;
}

const DocAppRouter: AppRouter = () => (
  <Router.Root>
    <Router.Group type={AppRouterGroup.DEFAULT}>
      <Router.Route name={DocAppRoute.HOME} path={"/"} view={HomeView} />
    </Router.Group>
    <Router.Group type={AppRouterGroup.API}>
      <Router.Route
        name={DocAppRoute.API_THEME_GET}
        method={"GET"}
        path={"/api/theme"}
        handler={ThemeController.getCurrentUserPreferredThemeScheme}
      />
    </Router.Group>
  </Router.Root>
);

export default DocAppRouter;
