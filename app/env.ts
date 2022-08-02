// std
import fs from "fs";
import path from "path";
// 3rd-party
import dotEnvFlow from "dotenv-flow";

import { Env as NodeEnv } from "@ethicdevs/react-monolith";

const NODE_ENV = process.env.NODE_ENV;
const ENV_FILES_DIR = path.resolve(path.join(__dirname, ".."));

const baseOpts = {
  node_env: NODE_ENV,
};

const files = dotEnvFlow.listDotenvFiles(ENV_FILES_DIR, baseOpts);

function getLoadableFilesDisplay(): string {
  return files.filter((path) => fs.existsSync(path) === true).join("\n  * ");
}

if (files.length > 0) {
  console.log(`[env] Loading environment variables from files:
  * ${getLoadableFilesDisplay()}`);
} else {
  console.log(
    `[env] Found no file to load environment variables from, using system environment.`
  );
}

const res = dotEnvFlow.config({
  ...baseOpts,
  encoding: "utf8",
  default_node_env: "development",
  purge_dotenv: true, // Avoid dependencies 'dotenv' to take priority
  silent: true,
});

if (res.error) {
  throw res.error;
}

const isValidNodeEnv = (env?: string | null): env is NodeEnv => {
  if (env == null) {
    return false;
  }
  if (["development", "test", "production"].includes(env)) {
    return true;
  }
  return false;
};

const getNodeEnv = (
  env?: string | null,
  defaultEnv: "production" = "production"
): NodeEnv => {
  if (isValidNodeEnv(env)) {
    return env;
  }
  return defaultEnv;
};

const getCookieName = (cookieName?: string | null): string => {
  if (cookieName == null || cookieName === "fake") {
    throw new Error("[env] COOKIE_NAME is missing.");
  }
  return String(cookieName);
};

const getDeploymentDomain = (deploymentDomain?: string | null): string => {
  if (deploymentDomain == null || deploymentDomain === "fake") {
    throw new Error("[env] DEPLOYMENT_DOMAIN is missing.");
  }
  return String(deploymentDomain);
};
const getDeploymentScheme = (
  deploymentScheme?: string | null
): "http" | "https" => {
  if (deploymentScheme == null || deploymentScheme === "fake") {
    throw new Error("[env] DEPLOYMENT_SCHEME is missing.");
  }
  const validSchemes = ["http", "https"];
  if (validSchemes.includes(deploymentScheme) === false) {
    throw new Error(
      `[env] DEPLOYMENT_SCHEME value is invalid. Must be one of: "${validSchemes.join(
        '", "'
      )}". Received: "${deploymentScheme}".`
    );
  }
  return String(deploymentScheme) as "http" | "https";
};

const getSessionSecret = (sessionSecret?: string | null): string => {
  if (sessionSecret == null || sessionSecret === "fake") {
    throw new Error("[env] SESSION_SECRET is missing.");
  }
  return String(sessionSecret);
};

interface IEnv {
  NODE_ENV: NodeEnv;
  COOKIE_NAME: string;
  DEPLOYMENT_DOMAIN: string;
  DEPLOYMENT_SCHEME: "http" | "https";
  SESSION_SECRET: string;
}

export const Env: IEnv = {
  NODE_ENV: getNodeEnv(process.env.NODE_ENV),
  COOKIE_NAME: getCookieName(process.env.COOKIE_NAME),
  DEPLOYMENT_DOMAIN: getDeploymentDomain(process.env.DEPLOYMENT_DOMAIN),
  DEPLOYMENT_SCHEME: getDeploymentScheme(process.env.DEPLOYMENT_SCHEME),
  SESSION_SECRET: getSessionSecret(process.env.SESSION_SECRET),
};
