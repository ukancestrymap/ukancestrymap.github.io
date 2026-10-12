// Choosing between the light and dark themes. New: the original frontend
// (OxfordRSE/fastsmc_app_frontend) had only a light theme.
//
// src/theme-init.js repeats the logic of readSetting, resolveTheme and
// applyTheme in a small script inlined into each page, which sets the theme
// before the page is first drawn, so a dark page never flashes white while the
// app loads. Keep the two in step.

import type { Theme } from '../components/palette'

/** The visitor's choice: follow the device's setting, or always light or dark. */
export type ThemeSetting = 'system' | 'light' | 'dark'

/** The choices, in the order the theme menu offers them. */
export const themeSettings: readonly ThemeSetting[] = [
  'system',
  'light',
  'dark',
]

/** Where the browser keeps the choice; nothing is kept for 'system'. */
export const themeStorageKey = 'theme'

/** The media query that says whether the device is set to dark. */
export const darkQuery = '(prefers-color-scheme: dark)'

/**
 * The theme to show.
 *
 * @param setting - The visitor's choice.
 * @param deviceIsDark - Whether the device is set to dark.
 * @returns The theme.
 */
export function resolveTheme(
  setting: ThemeSetting,
  deviceIsDark: boolean,
): Theme {
  if (setting === 'system') return deviceIsDark ? 'dark' : 'light'
  return setting
}

/**
 * Reads the visitor's choice from the browser.
 *
 * @remarks
 * Storage can be unavailable, as in some private windows, or hold anything;
 * both mean following the device.
 *
 * @returns The stored choice, or 'system'.
 */
export function readSetting(): ThemeSetting {
  try {
    const stored = localStorage.getItem(themeStorageKey)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    return 'system'
  }
}

/**
 * Keeps the visitor's choice in the browser, for their next visit.
 *
 * @param setting - The choice; 'system' removes any stored one.
 */
export function writeSetting(setting: ThemeSetting): void {
  try {
    if (setting === 'system') localStorage.removeItem(themeStorageKey)
    else localStorage.setItem(themeStorageKey, setting)
  } catch {
    // Not kept: the choice still applies until the page is closed.
  }
}

/**
 * Shows a theme: the `dark` class switches the stylesheet's colours, and
 * `color-scheme` the browser's own, such as scroll bars and form controls.
 *
 * @param root - The page's root element.
 * @param theme - The theme to show.
 */
export function applyTheme(root: HTMLElement, theme: Theme): void {
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}
