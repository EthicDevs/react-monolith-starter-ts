import fastify from "fastify";

import type { AppThemeScheme, SectionsWithPages } from "../../app/types";

declare module "fastify" {
  interface FastifyRequest {
    cookies: {
      // Session cookie
      teamtodo_sid: string;
      // Preferred theme scheme on this device
      theme_scheme: AppThemeScheme;
    };
    // A request utility that maps a viewName to its routerPath
    namedViewsPathMap: Record<string, string>;
    // A request utility that maps a routerPath to its viewName
    pathNamedViewsMap: Record<string, string>;
  }

  interface FastifyReply {
    makeRequestHandler: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => <T extends Record<string, any>>(
      viewName: string,
      props: T & CommonViewProps,
      viewCtx?: ViewContext
    ) => Promise<
      FastifyReply<
        Server,
        IncomingMessage,
        ServerResponse,
        RouteGenericInterface,
        unknown
      >
    >;
  }
}
