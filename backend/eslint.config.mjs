import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error", 
      "prefer-const": ["error", { "ignoreReadBeforeAssign": true }],
      "no-unused-expressions": "error",
      "arrow-body-style": ["error", "always"],
      "curly": ["error", "multi", "consistent"]
    }
  }
];