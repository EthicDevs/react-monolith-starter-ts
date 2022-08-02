// 3rd-party
import { AppServer } from "@ethicdevs/react-monolith";
import { preHandlerHookHandler } from "fastify";
// lib
import { Env } from "../../env";

export const localAppDomainPreHandler: preHandlerHookHandler = (
  request,
  reply,
  done
) => {
  const { $port } = (request.server as AppServer).reactMonolith!;

  // Safe-guard local requests to not forget because setting cookies on
  // the `localhost` domain is not consistent across browsers and lead to
  // testing/developing kind of "on the wrong env". To fix this we use an
  // entry in the /etc/hosts file that maps to a locally known domain name
  // on which we can set cookies as if we were in production mode/real domain.
  if (request.hostname === `localhost:${$port}`) {
    console.log(
      `--- REQUEST TO 'localhost' DETECTED, PLEASE USE '${Env.DEPLOYMENT_DOMAIN}' INSTEAD FOR COOKIES TO WORK! ---`
    );
    console.log(
      `--- MAKE SURE YOU HAVE '127.0.0.1   ${Env.DEPLOYMENT_DOMAIN}' SET IN YOUR '/etc/hosts' FILE! ---`
    );
    console.log(
      `--- REDIRECTED TO 'http://${Env.DEPLOYMENT_DOMAIN}:${$port}' ---`
    );
    reply.redirect(
      301,
      `http://${Env.DEPLOYMENT_DOMAIN}:${$port}${request.url}`
    );
  }
  done();
};
