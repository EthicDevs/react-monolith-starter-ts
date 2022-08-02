// 3rd-party
import { preHandlerHookHandler } from "fastify";
// lib
import { Const } from "../../const";

export const sessionSetupPreHandler: preHandlerHookHandler = (
  request,
  reply,
  done
) => {
  if (request.cookies.theme_scheme == null) {
    reply.setCookie("theme_scheme", Const.DEFAULT_THEME_SCHEME);
  }
  done();
};
