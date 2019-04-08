import { SerializedStyles } from '@emotion/core';
import { suomifiTheme, ThemeProp } from '../theme';

interface BaseStylesInterface {
  theme: ThemeProp;
  [key: string]: any;
}

/**
 *  Get CSS export from baseStyles generated by Emotion/Styled
 * @param baseStyles Emotion CSS
 * @param props properties needed to get desired styles from components
 */
export const cssFromBaseStyles = (
  baseStyles: ({ theme }: BaseStylesInterface) => SerializedStyles,
  props = {},
) => baseStyles({ ...props, theme: suomifiTheme }).styles;

export function objValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
