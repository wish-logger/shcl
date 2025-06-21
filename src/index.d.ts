/**
 * SHCL - Wish Color Line
 * Advanced terminal string styling library
 */

export interface ColorFunction {
  (text: string): string;
  (...args: any[]): string;
}

export interface RgbFunction {
  (r: number, g: number, b: number): ColorFunction;
}

export interface HexFunction {
  (hexColor: string): ColorFunction;
}

export interface Ansi256Function {
  (code: number): ColorFunction;
}

export interface GradientFunction {
  (colors: string[], text: string): string;
}

export interface RainbowFunction {
  (text: string): string;
}

/**
 * Animation options for controlling display behavior
 */
export interface AnimationOptions {
  /** Clear the line before each frame (default: true) */
  clearLine?: boolean;
  /** Display each frame on a new line (default: false) */
  newLine?: boolean;
  /** Animate in the same line position (default: true) */
  sameLine?: boolean;
}

/**
 * Advanced animation function with customizable options
 * @param text - Text to animate
 * @param frames - Array of color functions to cycle through
 * @param interval - Animation speed in milliseconds (default: 100)
 * @param options - Animation display options
 * @returns NodeJS.Timeout - Animation interval that can be cleared
 */
export interface AnimateFunction {
  (text: string, frames: ColorFunction[], interval?: number, options?: AnimationOptions): NodeJS.Timeout;
}

/**
 * Simple blinking animation between two colors
 * @param text - Text to animate
 * @param color1 - First color (default: '#ffffff')
 * @param color2 - Second color (default: '#000000')
 * @returns NodeJS.Timeout - Animation interval that can be cleared
 */
export interface BlinkFunction {
  (text: string, color1?: string, color2?: string): NodeJS.Timeout;
}

/**
 * Color support information
 */
export interface SupportsColor {
  stdout: boolean;
  stderr: boolean;
  level: number;
}

export interface ChainableStyle {
  // Basic colors
  black: ChainableStyle;
  red: ChainableStyle;
  green: ChainableStyle;
  yellow: ChainableStyle;
  blue: ChainableStyle;
  magenta: ChainableStyle;
  cyan: ChainableStyle;
  white: ChainableStyle;
  
  // Bright colors
  brightBlack: ChainableStyle;
  brightRed: ChainableStyle;
  brightGreen: ChainableStyle;
  brightYellow: ChainableStyle;
  brightBlue: ChainableStyle;
  brightMagenta: ChainableStyle;
  brightCyan: ChainableStyle;
  brightWhite: ChainableStyle;
  
  // Aliases
  gray: ChainableStyle;
  grey: ChainableStyle;
  
  // Background colors
  bgBlack: ChainableStyle;
  bgRed: ChainableStyle;
  bgGreen: ChainableStyle;
  bgYellow: ChainableStyle;
  bgBlue: ChainableStyle;
  bgMagenta: ChainableStyle;
  bgCyan: ChainableStyle;
  bgWhite: ChainableStyle;
  
  // Bright background colors
  bgBrightBlack: ChainableStyle;
  bgBrightRed: ChainableStyle;
  bgBrightGreen: ChainableStyle;
  bgBrightYellow: ChainableStyle;
  bgBrightBlue: ChainableStyle;
  bgBrightMagenta: ChainableStyle;
  bgBrightCyan: ChainableStyle;
  bgBrightWhite: ChainableStyle;
  
  // Background aliases
  bgGray: ChainableStyle;
  bgGrey: ChainableStyle;
  
  // Text styles
  bold: ChainableStyle;
  dim: ChainableStyle;
  italic: ChainableStyle;
  underline: ChainableStyle;
  overline: ChainableStyle;
  blink: ChainableStyle;
  inverse: ChainableStyle;
  reverse: ChainableStyle;
  hidden: ChainableStyle;
  strikethrough: ChainableStyle;
  visible: ChainableStyle;
  
  // Advanced color functions
  rgb: RgbFunction;
  bgRgb: RgbFunction;
  hex: HexFunction;
  bgHex: HexFunction;
  ansi256: Ansi256Function;
  bgAnsi256: Ansi256Function;
  
  // Callable as function
  (...args: any[]): string;
}

export interface SHCL {
  // Basic colors
  black: ColorFunction & ChainableStyle;
  red: ColorFunction & ChainableStyle;
  green: ColorFunction & ChainableStyle;
  yellow: ColorFunction & ChainableStyle;
  blue: ColorFunction & ChainableStyle;
  magenta: ColorFunction & ChainableStyle;
  cyan: ColorFunction & ChainableStyle;
  white: ColorFunction & ChainableStyle;
  
  // Bright colors
  brightBlack: ColorFunction & ChainableStyle;
  brightRed: ColorFunction & ChainableStyle;
  brightGreen: ColorFunction & ChainableStyle;
  brightYellow: ColorFunction & ChainableStyle;
  brightBlue: ColorFunction & ChainableStyle;
  brightMagenta: ColorFunction & ChainableStyle;
  brightCyan: ColorFunction & ChainableStyle;
  brightWhite: ColorFunction & ChainableStyle;
  
  // Color aliases
  gray: ColorFunction & ChainableStyle;
  grey: ColorFunction & ChainableStyle;
  
  // Background colors
  bgBlack: ColorFunction & ChainableStyle;
  bgRed: ColorFunction & ChainableStyle;
  bgGreen: ColorFunction & ChainableStyle;
  bgYellow: ColorFunction & ChainableStyle;
  bgBlue: ColorFunction & ChainableStyle;
  bgMagenta: ColorFunction & ChainableStyle;
  bgCyan: ColorFunction & ChainableStyle;
  bgWhite: ColorFunction & ChainableStyle;
  
  // Bright background colors
  bgBrightBlack: ColorFunction & ChainableStyle;
  bgBrightRed: ColorFunction & ChainableStyle;
  bgBrightGreen: ColorFunction & ChainableStyle;
  bgBrightYellow: ColorFunction & ChainableStyle;
  bgBrightBlue: ColorFunction & ChainableStyle;
  bgBrightMagenta: ColorFunction & ChainableStyle;
  bgBrightCyan: ColorFunction & ChainableStyle;
  bgBrightWhite: ColorFunction & ChainableStyle;
  
  // Background aliases
  bgGray: ColorFunction & ChainableStyle;
  bgGrey: ColorFunction & ChainableStyle;
  
  // Text styles
  bold: ColorFunction & ChainableStyle;
  dim: ColorFunction & ChainableStyle;
  italic: ColorFunction & ChainableStyle;
  underline: ColorFunction & ChainableStyle;
  overline: ColorFunction & ChainableStyle;
  blink: ColorFunction & ChainableStyle;
  inverse: ColorFunction & ChainableStyle;
  reverse: ColorFunction & ChainableStyle;
  hidden: ColorFunction & ChainableStyle;
  strikethrough: ColorFunction & ChainableStyle;
  visible: ColorFunction & ChainableStyle;
  
  // Advanced color functions
  rgb: RgbFunction;
  bgRgb: RgbFunction;
  hex: HexFunction;
  bgHex: HexFunction;
  ansi256: Ansi256Function;
  bgAnsi256: Ansi256Function;
  
  // Special effects
  gradient: GradientFunction;
  rainbow: RainbowFunction;
  animate: AnimateFunction;
  blink: BlinkFunction;
  
  // Color support detection
  level: number;
  supportsColor: SupportsColor;
  supportsColorStderr: SupportsColor;
  
  // Exported arrays for validation
  modifierNames: string[];
  foregroundColorNames: string[];
  backgroundColorNames: string[];
  colorNames: string[];
}

declare const shcl: SHCL;
export default shcl; 