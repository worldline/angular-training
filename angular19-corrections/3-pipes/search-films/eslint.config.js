// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: ["tsconfig.json", "e2e/tsconfig.json"],
        createDefaultProgram: true,
        ecmaFeatures: {
          modules: true,
        }
      }
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/use-component-view-encapsulation": "error",

      "@typescript-eslint/array-type": ["error", {
          default: "array",
      }],

      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": ["warn"],


      "@typescript-eslint/member-ordering": ["error", {
          classes: ["field", "constructor", "method"],
      }],

      "@typescript-eslint/naming-convention": ["error", {
          selector: "default",
          format: ["camelCase"],
      }, {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "should", "has", "can", "did", "will"],
      }, {
          selector: "variable",
          format: ["camelCase", "PascalCase"],
      }, {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
      }, {
          selector: [
              "classProperty",
              "objectLiteralProperty",
              "typeProperty",
              "classMethod",
              "objectLiteralMethod",
              "typeMethod",
              "accessor",
              "enumMember",
          ],

          format: null,
          modifiers: ["requiresQuotes"],
      }, {
          selector: "typeLike",
          format: ["PascalCase"],
      }, {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "forbid",
      }, {
          selector: "parameter",
          modifiers: ["unused"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
      }, {
          selector: "classProperty",
          modifiers: ["public"],
          format: ["camelCase", "PascalCase"],
      }],

      "@typescript-eslint/no-extraneous-class": ["error", {
          allowEmpty: true,
      }],

      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@/semi": ["error", "never"],

      "@typescript-eslint/unbound-method": ["error", {
          ignoreStatic: true,
      }],

      "array-bracket-spacing": ["error", "never"],
      "arrow-parens": ["error", "as-needed"],
      "block-spacing": ["error", "always"],

      "brace-style": ["error", "1tbs", {
          allowSingleLine: false,
      }],

      "comma-dangle": "error",

      "comma-spacing": ["error", {
          before: false,
          after: true,
      }],

      complexity: ["error", {
          max: 10,
      }],

      curly: ["error", "all"],
      "dot-location": ["error", "property"],
      "function-call-argument-newline": ["error", "consistent"],
      "func-call-spacing": ["error", "never"],
      "linebreak-style": ["error", "unix"],
      "max-classes-per-file": ["error", 1],

      "max-len": ["error", {
          code: 250,
      }],

      "no-duplicate-imports": "error",
      "no-extra-bind": "error",
      "no-invalid-this": "error",
      "no-multiple-empty-lines": "error",
      "no-multi-spaces": "error",
      "no-new-func": "error",

      "no-plusplus": ["error", {
          allowForLoopAfterthoughts: true,
      }],

      "no-sequences": "error",
      "no-template-curly-in-string": "error",
      "no-trailing-spaces": "error",

      "no-underscore-dangle": ["error", {
          allowAfterThis: true,
      }],

      "no-useless-constructor": "off",

      "object-curly-spacing": ["error", "always", {
          arraysInObjects: false,
          objectsInObjects: false,
      }],

      "padding-line-between-statements": ["error", {
          blankLine: "always",
          prev: "*",
          next: "return",
      }],

      "prefer-template": "error",
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "space-in-parens": ["error", "never"],
      "template-curly-spacing": ["error", "never"]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
