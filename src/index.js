/**
 * SHCL - Wish Color Line
 * Ultra-fast terminal styling library with advanced features
 * @author ImpulseDev
 * @version 1.0.0
 */

// Color code mappings for maximum lookup speed
const colors = {
  // Basic colors
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  
  // Bright colors with aliases
  brightBlack: 90,
  gray: 90,
  grey: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97
};

const bgColors = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  
  // Bright background colors with aliases
  bgBrightBlack: 100,
  bgGray: 100,
  bgGrey: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
};

const styles = {
  reset: 0,
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  overline: 53,
  blink: 5,
  inverse: 7,
  reverse: 7,
  hidden: 8,
  strikethrough: 9,
  visible: 'visible'
};

// Pre-compiled ANSI escape sequence generator for speed
const esc = (code) => `\x1b[${code}m`;
const reset = esc(styles.reset);

// Color support detection - cached for performance
const supportsColor = {
  stdout: process.stdout.isTTY && process.env.TERM !== 'dumb',
  stderr: process.stderr.isTTY && process.env.TERM !== 'dumb',
  level: process.stdout.isTTY ? 
    (process.env.COLORTERM === 'truecolor' ? 3 : 2) : 0
};

// Override with FORCE_COLOR environment variable
if (process.env.FORCE_COLOR) {
  const level = parseInt(process.env.FORCE_COLOR, 10);
  supportsColor.level = level;
  supportsColor.stdout = level > 0;
  supportsColor.stderr = level > 0;
}

/**
 * Creates optimized styled text function
 * @param {Array} codes - ANSI codes to apply
 * @returns {Function} Styled text function
 */
function createStyle(codes) {
  return (...args) => {
    // Fast path for empty arguments
    if (args.length === 0) return reset;
    
    // Join arguments efficiently
    const text = args.length === 1 ? String(args[0]) : args.join(' ');
    
    // Handle visibility special case
    if (codes.includes('visible') && !supportsColor.stdout) {
      return text;
    }
    
    // Pre-filter and map codes for maximum speed
    const openCodes = codes
      .filter(code => code !== 'visible')
      .map(code => 
        typeof code === 'string' && code.includes(';') 
          ? `\x1b[${code}m` 
          : esc(code)
      );
    
    return openCodes.join('') + text + reset;
  };
}

/**
 * RGB color function with optimized code generation
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {Function} Chainable color function
 */
function rgb(r, g, b) {
  return createChainableFunction([`38;2;${r};${g};${b}`]);
}

/**
 * RGB background color function
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {Function} Chainable background color function
 */
function bgRgb(r, g, b) {
  return createChainableFunction([`48;2;${r};${g};${b}`]);
}

/**
 * Hex color function with optimized parsing
 * @param {string} hexColor - Hex color string (e.g., '#FF6B6B')
 * @returns {Function} Chainable color function
 */
function hex(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return rgb(r, g, b);
}

/**
 * Hex background color function
 * @param {string} hexColor - Hex color string (e.g., '#FF6B6B')
 * @returns {Function} Chainable background color function
 */
function bgHex(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return bgRgb(r, g, b);
}

/**
 * ANSI 256 color function
 * @param {number} code - ANSI color code (0-255)
 * @returns {Function} Chainable color function
 */
function ansi256(code) {
  return createChainableFunction([`38;5;${code}`]);
}

/**
 * ANSI 256 background color function
 * @param {number} code - ANSI color code (0-255)
 * @returns {Function} Chainable background color function
 */
function bgAnsi256(code) {
  return createChainableFunction([`48;5;${code}`]);
}

/**
 * Create gradient text with smooth color transitions
 * @param {Array<string>} colors - Array of hex color strings
 * @param {string} text - Text to apply gradient to
 * @returns {string} Styled text with gradient
 */
function gradient(colors, text) {
  if (!Array.isArray(colors) || colors.length < 2) {
    throw new Error('Gradient requires at least 2 colors');
  }
  
  let result = '';
  const length = text.length;
  
  for (let i = 0; i < length; i++) {
    const ratio = i / (length - 1);
    const colorIndex = ratio * (colors.length - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.ceil(colorIndex);
    const localRatio = colorIndex - lowerIndex;
    
    if (lowerIndex === upperIndex) {
      result += hex(colors[lowerIndex])(text[i]);
    } else {
      const color = interpolateColor(colors[lowerIndex], colors[upperIndex], localRatio);
      result += hex(color)(text[i]);
    }
  }
  
  return result;
}

/**
 * Fast color interpolation function
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @param {number} ratio - Interpolation ratio (0-1)
 * @returns {string} Interpolated hex color
 */
function interpolateColor(color1, color2, ratio) {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Rainbow text effect with predefined colors
 * @param {string} text - Text to apply rainbow effect to
 * @returns {string} Rainbow styled text
 */
function rainbow(text) {
  const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
  return gradient(rainbowColors, text);
}

/**
 * Advanced animation function with display options
 * @param {string} text - Text to animate
 * @param {Array<Function>} frames - Array of color functions
 * @param {number} interval - Animation interval in milliseconds (default: 100)
 * @param {Object} options - Animation options
 * @param {boolean} options.clearLine - Clear line before each frame (default: true)
 * @param {boolean} options.newLine - Display each frame on new line (default: false)
 * @param {boolean} options.sameLine - Animate in same line (default: true)
 * @returns {NodeJS.Timeout} Animation interval ID
 */
function animate(text, frames, interval = 100, options = {}) {
  const { 
    clearLine = true,
    newLine = false,
    sameLine = true
  } = options;
  
  let currentFrame = 0;
  return setInterval(() => {
    if (newLine) {
      process.stdout.write(frames[currentFrame](text) + '\n');
    } else if (sameLine) {
      const output = (clearLine ? '\r\x1b[K' : '\r') + frames[currentFrame](text);
      process.stdout.write(output);
    } else {
      process.stdout.write(frames[currentFrame](text));
    }
    currentFrame = (currentFrame + 1) % frames.length;
  }, interval);
}

/**
 * Simple blinking animation between two colors
 * @param {string} text - Text to blink
 * @param {string} color1 - First color (default: '#ffffff')
 * @param {string} color2 - Second color (default: '#000000')
 * @returns {NodeJS.Timeout} Animation interval ID
 */
function blink(text, color1 = '#ffffff', color2 = '#000000') {
  const frames = [hex(color1), hex(color2)];
  return animate(text, frames, 500);
}

/**
 * Creates ultra-fast chainable styling function using Proxy
 * @param {Array} codes - Initial ANSI codes
 * @returns {Proxy} Chainable styling function
 */
function createChainableFunction(codes) {
  const fn = (...args) => createStyle(codes)(...args);
  
  return new Proxy(fn, {
    get(target, prop) {
      if (colors[prop] !== undefined) {
        return createChainableFunction([...codes, colors[prop]]);
      }

      if (bgColors[prop] !== undefined) {
        return createChainableFunction([...codes, bgColors[prop]]);
      }

      if (styles[prop] !== undefined && prop !== 'reset') {
        return createChainableFunction([...codes, styles[prop]]);
      }
      
      if (prop === 'ansi256') {
        return (code) => createChainableFunction([...codes, `38;5;${code}`]);
      }
      if (prop === 'bgAnsi256') {
        return (code) => createChainableFunction([...codes, `48;5;${code}`]);
      }
      
      if (prop === 'rgb') {
        return (r, g, b) => createChainableFunction([...codes, `38;2;${r};${g};${b}`]);
      }
      if (prop === 'bgRgb') {
        return (r, g, b) => createChainableFunction([...codes, `48;2;${r};${g};${b}`]);
      }
      
      if (prop === 'hex') {
        return (hexColor) => {
          const hex = hexColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          return createChainableFunction([...codes, `38;2;${r};${g};${b}`]);
        };
      }
      if (prop === 'bgHex') {
        return (hexColor) => {
          const hex = hexColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          return createChainableFunction([...codes, `48;2;${r};${g};${b}`]);
        };
      }

      return target[prop];
    }
  });
}

const modifierNames = Object.keys(styles).filter(key => key !== 'reset');
const foregroundColorNames = Object.keys(colors);
const backgroundColorNames = Object.keys(bgColors);
const colorNames = [...foregroundColorNames, ...backgroundColorNames];

/**
 * Creates main SHCL proxy with optimized property access
 * @returns {Proxy} Main SHCL object with all styling functions
 */
function createShclProxy() {
  const baseObj = {
    rgb,
    bgRgb,
    hex,
    bgHex,
    ansi256,
    bgAnsi256,
    
    gradient,
    rainbow,
    animate,
    blink,
    
    level: supportsColor.level,
    supportsColor,
    supportsColorStderr: supportsColor,
    
    modifierNames,
    foregroundColorNames,
    backgroundColorNames,
    colorNames
  };
  
  return new Proxy(baseObj, {
    get(target, prop) {
      if (target[prop] !== undefined) {
        return target[prop];
      }
      
      if (colors[prop] !== undefined) {
        return createChainableFunction([colors[prop]]);
      }

      if (bgColors[prop] !== undefined) {
        return createChainableFunction([bgColors[prop]]);
      }

      if (styles[prop] !== undefined && prop !== 'reset') {
        return createChainableFunction([styles[prop]]);
      }
      
      return undefined;
    }
  });
}

const shcl = createShclProxy();
module.exports = shcl;