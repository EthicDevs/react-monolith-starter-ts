// 3rd-party
import {
  AppServer,
  makeAppServer,
  startAppServer,
  stopAppServerAndExit,
} from "@ethicdevs/react-monolith";

import fastifyCookie, { CookieSerializeOptions } from "@fastify/cookie";
import fastifyServeStatic from "fastify-static";

// app
import * as paths from "../paths";
import { Const } from "./const";
import { Env } from "./env";
import { version as appVersion } from "../package.json";
import {
  getEnv,
  localAppDomainPreHandler,
  makeRequestHandler,
  sessionSetupPreHandler,
} from "./utils/server";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4100;

let server: null | AppServer = null;

async function main(): Promise<AppServer> {
  const depsBaseUrl = `/${paths.PUBLIC_FOLDER_NAME}/${paths.ASSET_DEPS_FOLDER_NAME}`;
  const publicBaseUrl = `/${paths.PUBLIC_FOLDER_NAME}`;

  const cookiesOpts: CookieSerializeOptions = {
    domain: `.${Env.DEPLOYMENT_DOMAIN}`,
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "lax",
    signed: true,
  };

  server = await makeAppServer(HOST, PORT, {
    appName: Const.APP_NAME,
    appVersion,
    env: getEnv(),
    a11y: {
      localeDirection: "ltr",
    },
    assets: {
      depsFolder: paths.ASSET_DEPS_FOLDER_NAME,
      importPrefix: publicBaseUrl,
    },
    featureFlags: {
      withStyledSSR: true,
      withImportsMap: true,
    },
    paths: {
      assetsOutFolder: paths.PUBLIC_FOLDER,
      distFolder: paths.DIST_FOLDER,
      islandsFolder: paths.ISLANDS_FOLDER,
      rootFolder: paths.ROOT_FOLDER,
      routesFile: paths.ROUTES_FILE,
      viewsFolder: paths.VIEWS_FOLDER,
    },
    externalDependencies: {
      "cross-fetch": "CrossFetch",
      "markdown-to-jsx": "MarkdownToJSX",
    },
    baseHeadTags: [
      {
        kind: "meta",
        name: "og:site_name",
        content: Const.APP_NAME,
      },
    ],
    baseScriptTags: [
      {
        // so ES Modules script[type=importmap] works in Firefox/older browsers
        async: true,
        id: "es-importmap-shim",
        src: `${depsBaseUrl}/es-module-shims.production.min.js`,
        type: "application/javascript",
      },
      {
        // so assets under publicBaseUrl gets cached by a service worker on client side.
        async: true,
        defer: false,
        id: "importmap-service-worker-register",
        src: `/register-imsw.js`,
        type: "module",
      },
    ],
    setupServerBeforeRoutes(s) {
      // register cookie plugin
      s.register(fastifyCookie, {
        secret: Env.SESSION_SECRET,
        parseOptions: cookiesOpts,
      });
      // make own reply decorator to inject common props in all views
      s.decorateReply("makeRequestHandler", makeRequestHandler);
      // check for local domain setup (cookies do not work on localhost)
      s.addHook("preHandler", localAppDomainPreHandler);
      // pre handler that takes care of session setup if needed
      s.addHook("preHandler", sessionSetupPreHandler);
    },
  });

  server.register(fastifyServeStatic, {
    root: paths.PUBLIC_FOLDER,
    prefix: publicBaseUrl,
  });

  server.get("/interceptor-imsw.js", {}, async (_, reply) => {
    return reply.sendFile("interceptor-imsw.js");
  });
  server.get("/register-imsw.js", {}, async (_, reply) => {
    return reply.sendFile("register-imsw.js");
  });

  await startAppServer(server);
  return server;
}

// Catch errors that are fatal
["unhandledRejection", "uncaughtException"].forEach((exception) => {
  process.on(exception, async (reason: Error) => {
    await stopAppServerAndExit(server, reason);
  });
});

// Catch standard linux signals to kill a daemon
["SIGQUIT", "SIGTERM", "SIGINT"].forEach((killSignal) => {
  process.on(killSignal, async () => {
    await stopAppServerAndExit(server);
  });
});

// Start the application server
main()
  .then((server) => {
    // safe because it wont start if null
    const { $config, $host, $port } = server.reactMonolith!;
    console.log(
      `[🚀][${$config.env}] App Server ready at http://${$host}:${$port} !`
    );
  })
  .catch(async (err) => {
    const error = err as Error;
    console.error(`[❌] Cannot start App Server. Error: ${error.message}`);
    await stopAppServerAndExit(null, error);
  });
