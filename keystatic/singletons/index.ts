import { caroselloHomeSingleton } from "./caroselloHome";
import { navbarHeaderSingleton } from "./navbarHeader";
import { settings } from "./settings";
import { homePage } from "./pages/home";

export const singletons = {
  caroselloHome: caroselloHomeSingleton,
  navbarHeader: navbarHeaderSingleton,
  home: homePage,
  settings: settings,
};
