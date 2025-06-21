# 🎨 SHCL - Wish Color Line

**Advanced terminal string styling library with unique features!**

[![npm version](https://badge.fury.io/js/shcl.svg)](https://www.npmjs.com/package/shcl)
[![npm downloads](https://img.shields.io/npm/dm/shcl.svg)](https://www.npmjs.com/package/shcl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Why SHCL?

SHCL (Wish Color Line) is a powerful terminal styling library built with modern JavaScript. It offers unique features like **gradient text**, **rainbow effects**, **advanced animations**, **ANSI 256 colors**, **chainable API**, and **ultra-fast performance** with Proxy-based implementation.

**Built specifically for [Wish Logger](https://wishlogger.xyz/) - a Discord logging bot**

## ✨ Features

- 🎨 **Full color support** - Basic colors, bright colors, RGB, Hex
- 🌈 **Gradient text effects** - Create beautiful color transitions
- 🌟 **Rainbow text** - Stunning rainbow effects
- 🎯 **ANSI 256 colors** - Extended color palette
- 🎪 **Background colors and styles** - Complete styling options
- ⚡ **Ultra-fast performance** - Proxy-based optimized implementation
- 🔗 **Chainable API** - `shcl.red.bold.underline('text')`
- 📱 **Animation support** - Text animations and effects
- 🔥 **TypeScript support** - Full type definitions included
- 💻 **Cross-platform** - Windows, Linux, macOS
- 📦 **Multiple arguments** - `shcl.red('Hello', 'World')`

## 📦 Installation

```bash
npm install shcl
```

## 🎯 Basic Usage

```javascript
const shcl = require('shcl');

// Basic colors
console.log(shcl.red('Hello World!'));
console.log(shcl.green('Success message'));
console.log(shcl.blue('Information'));

// Multiple arguments
console.log(shcl.red('Hello', 'World', 'from', 'SHCL!'));

// Chaining styles
console.log(shcl.red.bold('Bold red text'));
console.log(shcl.blue.underline.italic('Blue italic underlined'));

// Background colors
console.log(shcl.bgYellow('Warning background'));
console.log(shcl.white.bgRed('White text on red background'));
```

## 🌈 Unique Features

### Gradient Text
```javascript
// Create beautiful gradient effects
console.log(shcl.gradient(['#FF6B6B', '#4ECDC4'], 'Amazing gradient!'));
console.log(shcl.gradient(['#FF0000', '#00FF00', '#0000FF'], 'RGB gradient'));
console.log(shcl.gradient(['#FFD93D', '#FF6B6B', '#4ECDC4'], 'Multi-color!'));
```

### Rainbow Effect
```javascript
// Stunning rainbow text
console.log(shcl.rainbow('This is rainbow text!'));
console.log(shcl.rainbow('SHCL is awesome!'));
```

### Advanced Color Support
```javascript
// RGB colors
console.log(shcl.rgb(255, 100, 150)('Custom RGB'));
console.log(shcl.bgRgb(50, 150, 255)('RGB Background'));

// Hex colors
console.log(shcl.hex('#FF6B6B')('Hex color'));
console.log(shcl.bgHex('#4ECDC4')('Hex background'));

// ANSI 256 colors
console.log(shcl.ansi256(196)('ANSI color 196'));
console.log(shcl.bgAnsi256(226)('ANSI background 226'));
```

### Advanced Chaining
```javascript
// Chain everything together
console.log(shcl.red.bold.underline.inverse('All styles!'));
console.log(shcl.rgb(255, 100, 150).bgAnsi256(18).bold('RGB + ANSI + Bold'));
console.log(shcl.hex('#FF6B6B').underline.italic('Hex with styles'));
```

## 📊 Available Colors & Styles

### Basic Colors
- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- `gray`, `grey` (aliases for `brightBlack`)

### Bright Colors  
- `brightBlack`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

### Background Colors
- `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- `bgGray`, `bgGrey` (aliases for `bgBrightBlack`)
- `bgBrightBlack`, `bgBrightRed`, `bgBrightGreen`, `bgBrightYellow`, `bgBrightBlue`, `bgBrightMagenta`, `bgBrightCyan`, `bgBrightWhite`

### Text Styles
- `bold`, `dim`, `italic`, `underline`, `overline`, `blink`, `inverse`, `hidden`, `strikethrough`, `visible`

## 🎭 Animation Support

SHCL provides advanced animation capabilities with multiple display modes:

### Basic Blinking Animation
```javascript
// Simple blinking text with default colors (white/black)
const animation = shcl.blink('Blinking text!');

// Custom colors for blinking
const colorBlink = shcl.blink('Custom blink!', '#FF6B6B', '#4ECDC4');

// Stop animation after 5 seconds
setTimeout(() => clearInterval(animation), 5000);
```

### Advanced Custom Animations
```javascript
// Create custom animation frames
const frames = [shcl.red, shcl.green, shcl.blue, shcl.yellow];

// Basic animation with default options
const basicAnimation = shcl.animate('Animated text', frames, 200);

// Animation with custom options
const customAnimation = shcl.animate('Custom animation', frames, 150, {
  clearLine: true,    // Clear line before each frame (default: true)
  newLine: false,     // Each frame on new line (default: false)  
  sameLine: true      // Animate in same line (default: true)
});
```

### Animation Display Modes

#### Same Line Animation (Default)
```javascript
// Animates in the same position, replacing previous frame
shcl.animate('Loading...', [shcl.red, shcl.green, shcl.blue], 200, {
  sameLine: true,     // Default behavior
  clearLine: true     // Clears line before each frame
});
```

#### New Line Animation
```javascript
// Each frame appears on a new line
shcl.animate('Progress', [shcl.red, shcl.yellow, shcl.green], 300, {
  newLine: true,      // Each frame on new line
  sameLine: false     // Disable same line mode
});
```

#### Append Mode
```javascript
// Frames are appended without clearing (creates trail effect)
shcl.animate('Trail', [shcl.red, shcl.green, shcl.blue], 100, {
  clearLine: false,   // Don't clear line
  sameLine: false,    // Don't use same line
  newLine: false      // Don't use new lines
});
```

### Animation Examples

#### Loading Spinner
```javascript
const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinnerFrames = spinner.map(char => shcl.cyan.bold);
const loading = shcl.animate('Loading...', spinnerFrames, 80);
```

#### Progress Bar Animation
```javascript
const progressFrames = [
  shcl.red,
  shcl.yellow, 
  shcl.green
];
const progress = shcl.animate('█████████░ 90%', progressFrames, 500);
```

#### Rainbow Animation
```javascript
const rainbowFrames = [
  shcl.red,
  shcl.yellow,
  shcl.green,
  shcl.cyan,
  shcl.blue,
  shcl.magenta
];
const rainbow = shcl.animate('🌈 Rainbow!', rainbowFrames, 200);
```

## 💻 TypeScript Support

```typescript
import shcl from 'shcl';

const message: string = shcl.green('TypeScript ready!');
console.log(message);

// Access exported arrays
console.log('Available colors:', shcl.colorNames.length);
console.log('Available modifiers:', shcl.modifierNames);
```

## 📊 Color Support Detection

```javascript
// Check color support
console.log('Color level:', shcl.level); // 0-3
console.log('Supports color:', shcl.supportsColor.stdout);

// Available arrays for validation
console.log('Colors:', shcl.colorNames);
console.log('Modifiers:', shcl.modifierNames);
console.log('Foreground:', shcl.foregroundColorNames);
console.log('Background:', shcl.backgroundColorNames);
```

## ⚡ Performance

SHCL is optimized for ultra-fast performance using modern Proxy-based implementation:

- **Instant chaining** - No pre-generated properties
- **Memory efficient** - Dynamic property creation
- **Fast execution** - Optimized ANSI code generation

```javascript
// Performance test included in package
npm test
```

## 📝 Examples

### Create a Colorful CLI App
```javascript
const shcl = require('shcl');

console.log(shcl.blue.bold('🚀 My CLI App'));
console.log(shcl.green('✅ Success: Operation completed'));
console.log(shcl.yellow('⚠️  Warning: Check your input'));
console.log(shcl.red('❌ Error: Something went wrong'));
console.log(shcl.rainbow('🌈 Beautiful rainbow text!'));
console.log(shcl.gradient(['#FF6B6B', '#4ECDC4'], '🎨 Gradient magic!'));
```

### Progress Indicators
```javascript
const shcl = require('shcl');

console.log(shcl.blue('Loading...'));
console.log(shcl.green('█████████░') + ' 90%');
console.log(shcl.rainbow('🎉 Complete!'));
```

### Variable Assignment
```javascript
const error = shcl.bold.red;
const warning = shcl.hex('#FFA500');
const success = shcl.green.bold;

console.log(error('Error message'));
console.log(warning('Warning message'));  
console.log(success('Success message'));
```

## 🧪 Testing

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by **ImpulseDev** - Advanced terminal styling for modern applications!

---

**Install SHCL today and make your terminal output beautiful! 🎨**

```bash
npm install shcl
``` 