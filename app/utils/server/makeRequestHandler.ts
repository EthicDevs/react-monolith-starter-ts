// 3rd-party
import type { ViewContext } from "@ethicdevs/fastify-stream-react-views";
import type { FastifyReply, FastifyRequest } from "fastify";
// app
import type { CommonViewProps } from "../../types";
import { Const } from "../../const";

export const makeRequestHandler = {
  getter: () => {
    return (request: FastifyRequest, reply: FastifyReply) => {
      // here you could retrieve data from request when it happens, i.e.
      // const { param, } = request.params as { param?: string; };
      return <T extends Record<string, unknown>>(
        viewName: string,
        props?: T & CommonViewProps,
        viewCtx?: ViewContext
      ) => {
        // Or you could use named routes / convert path to named view
        // const routerPath = request.routerPath.trim();
        // const viewNameFromPath = request.pathNamedViewsMap[routerPath];
        // const viewPathFromName = request.namedViewsPathMap[viewNameFromPath];
        const viewProps: T & { commonProps: CommonViewProps } = {
          ...props,
          commonProps: {
            title: props?.title,
            themeScheme:
              (request.cookies?.["theme_scheme"]?.split(".")?.[0] ||
                Const.DEFAULT_THEME_SCHEME) === "light"
                ? "light"
                : "dark",
          },
        } as T & { commonProps: CommonViewProps };

        return reply.streamReactView(viewName, viewProps as any, viewCtx);
      };
    };
  },
};
