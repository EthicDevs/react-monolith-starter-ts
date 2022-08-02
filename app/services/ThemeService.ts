// 3rd-party
import { FastifyRequest } from "fastify";
// app
import type { AppThemeScheme } from "../types";
import { Const } from "../const";

async function makeThemeService(request: FastifyRequest) {
  return {
    getCurrentUserPreferredScheme(): AppThemeScheme {
      return (
        (request.cookies.theme_scheme as AppThemeScheme) ||
        Const.DEFAULT_THEME_SCHEME
      );
    },
  };
}

export default makeThemeService;
