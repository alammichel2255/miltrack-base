module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        // "jest/no-disabled-tests": "warn",
        // "jest/no-identical-title": "warn",
        // "jest/valid-expect": "warn"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": [
        "node_modules"
    ]
}
