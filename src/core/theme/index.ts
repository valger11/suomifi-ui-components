import { typography } from './typography';
import { colors, shadows, gradients, outlines } from './colors';
import { zindexes } from './zindexes';

export type ThemeProp = typeof suomifiTheme;

export interface ThemeComponent {
  /** Default as suomifiTheme */
  theme?: ThemeProp;
}

export const suomifiTheme = {
  typography,
  colors,
  shadows,
  gradients,
  outlines,
  zindexes,
};
