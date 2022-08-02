// 1st-party
import { ReqHandler } from "@ethicdevs/react-monolith";
// app
import { makeThemeService } from "../services";

// An API endpoint that returns the currently set preferred theme scheme.
const getCurrentUserPreferredThemeScheme: ReqHandler = async (
  request,
  reply
) => {
  const themeService = await makeThemeService(request);
  const preferredThemeScheme = themeService.getCurrentUserPreferredScheme();
  return reply.status(200).send(preferredThemeScheme);
};

const ThemeController = {
  getCurrentUserPreferredThemeScheme,
};

export default ThemeController;
