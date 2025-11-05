import { useContext } from "react";
import { ThemeContext } from "./themeProvider";

export function useTheme() {
  return useContext(ThemeContext);
}