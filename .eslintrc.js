module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jasmine": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "overrides": [
      {
        "files": ["**/*.ts", "**/*.tsx"],
        "extends": [
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:prettier/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "project": "tsconfig.json",
            "sourceType": "module"
        },
        "plugins": [
            "@typescript-eslint",
            "prettier"
        ],
        "rules": {
            "prettier/prettier": "error"
        }
      }
    ]
  };