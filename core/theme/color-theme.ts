import { vars } from "nativewind";
import { THEME } from "./theme";

export const themes = {
  light: vars({
    "--color-primary": THEME.light.primary,
    "--color-invert": THEME.light.invert,
    "--color-secondary": THEME.light.secondary,
    "--color-background": THEME.light.background,
    "--color-darker": THEME.light.darker,
    "--color-text": THEME.light.text,
    "--color-text-secondary": THEME.light.textSecondary,
    "--color-highlight": THEME.light.highlight,
    "--color-border": THEME.light.border,
  }),
  dark: vars({
    "--color-primary": THEME.dark.primary,
    "--color-invert": THEME.dark.invert,
    "--color-secondary": THEME.dark.secondary,
    "--color-background": THEME.dark.background,
    "--color-darker": THEME.dark.darker,
    "--color-text": THEME.dark.text,
    "--color-text-secondary": THEME.dark.textSecondary,
    "--color-highlight": THEME.dark.highlight,
    "--color-border": THEME.dark.border,
  }),
};
