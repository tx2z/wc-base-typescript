# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm start` - Start development server with live reload (runs rollup in watch mode)
- `npm run build` - Build all components to `dist/` folder
- `npm test` - Run tests with Karma (opens Chrome and Firefox)
- `npm run lint` - Run ESLint on TypeScript files
- `npm run storybook` - Start Storybook development server
- `npm run storybook-build` - Build static Storybook to `dist-storybook/`

## Architecture

This is a web components starter project using TypeScript and Rollup. Each component is self-contained and builds to both ES module and IIFE formats.

### Component Structure

Components live in `src/components/<component-name>/` with this file structure:
- `index.ts` - Entry point that registers the custom element via `customElements.define()`
- `<name>.component.ts` - Main component class extending `HTMLElement`
- `<name>.component.html` - HTML template (imported as string via rollup-plugin-html)
- `<name>.component.css` - Styles (imported as string, injected into shadow DOM)
- `<name>.component.spec.ts` - Jasmine tests
- `<name>.component.interfaces.d.ts` - TypeScript interfaces
- `@component.stories.ts` - Storybook stories (optional)
- `package.json` - Per-component package.json for NPM publishing
- `README.md` - Component documentation

### Component Patterns

Three example patterns are provided:
- **base-component** - Standard web component with Shadow DOM, no external dependencies
- **lithtml-component** - Uses lit-html for templating
- **noshadow-component** - Custom element without Shadow DOM

### Build Output

Rollup compiles each component separately to `dist/components/<name>/`:
- `<camelCaseName>.js` - ES module format
- `<camelCaseName>.dist.js` - IIFE format (minified)
- TypeScript declaration files
- `package.json` for NPM publishing

### Shared Helpers

`src/helpers.ts` provides utility functions:
- `prepareTemplate()` - Template variable replacement using `${variable}` syntax
- `attrToCamel()` - Convert hyphenated attributes to camelCase

## MCP Servers

This project includes a Playwright MCP server (`.mcp.json`) for browser automation and testing. Use it to:
- Visually test components in the browser after running `npm start`
- Navigate to `http://localhost:10001` (default dev server port) to interact with components
- Take screenshots and verify component rendering
