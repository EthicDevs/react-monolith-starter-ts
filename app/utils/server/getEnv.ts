import type { Env } from "@ethicdevs/react-monolith";

const baseEnv: Env = "production";

export function getEnv(): Env {
  if (process.env.NODE_ENV == null) {
    return baseEnv;
  }
  if (["production", "development", "test"].includes(process.env.NODE_ENV)) {
    return process.env.NODE_ENV as Env;
  }
  return baseEnv;
}
