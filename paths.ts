import { join, resolve } from "path";

// This file is where you can configure all the paths that will be used
// to truly match your own workflow/preferences if and when needed.

// The project root folder (where package.json is)
export const ROOT_FOLDER = resolve(join(__dirname));
// Where to get public content to serve static (fastify-static)
// in prod it would be better to let that to nginx/whatever else
export const PUBLIC_FOLDER_NAME = "public";
export const PUBLIC_FOLDER =
  process.env.NODE_ENV === "production"
    ? resolve(join(ROOT_FOLDER, "..", PUBLIC_FOLDER_NAME))
    : resolve(join(ROOT_FOLDER, PUBLIC_FOLDER_NAME));
// Where are external dependencies stored in public folder?
// i.e; ${PUBLIC_FOLDER}/<ASSET_DEPS_FOLDER_NAME>/dep.env.js
export const ASSET_DEPS_FOLDER_NAME = ".deps";
// Location of the app source code
export const APP_FOLDER = resolve(join(ROOT_FOLDER, "app"));
// Location of the JSX routes file within app source code
export const ROUTES_FILE =
  process.env.NODE_ENV === "production"
    ? resolve(join(APP_FOLDER, "routes.js"))
    : resolve(join(APP_FOLDER, "routes.tsx"));
// Location of the views folder within app source code
export const VIEWS_FOLDER = resolve(join(APP_FOLDER, "views"));
// Location of the islands folder within app source code
export const ISLANDS_FOLDER = resolve(join(APP_FOLDER, "islands"));
// Where to put compiled distributable
export const DIST_FOLDER =
  process.env.NODE_ENV === "production"
    ? ROOT_FOLDER
    : resolve(join(ROOT_FOLDER, "dist"));
// Where the migrations are stored.
export const MIGRATIONS_FOLDER = resolve(join(ROOT_FOLDER, "migrations"));
