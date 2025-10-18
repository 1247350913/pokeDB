// eslint.config.js
import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,

  // TypeScript base
  ...ts.configs.recommendedTypeChecked.map(c => ({
    ...c,
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist/**", "build/**", "node_modules/**"],
    languageOptions: {
      ...c.languageOptions,
      parserOptions: {
        ...c.languageOptions?.parserOptions,
        projectService: true, // TS project references OK
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),

  // React (client)
  {
    files: ["client/**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": hooks },
    languageOptions: {
      globals: {
        ...globals.browser,
        // Vite define vars if any
        __APP_VERSION__: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Electron main/preload (Node + Electron globals)
  {
    files: ["electron/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly",
        __filename: "readonly",
        // electron preload may expose window.electron types, etc.
      },
    },
    rules: {},
  },
];
