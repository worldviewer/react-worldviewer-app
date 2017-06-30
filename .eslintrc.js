// https://gist.github.com/nkbt/9efd4facb391edbf8048
// Strict ESLint config for React, ES6 (based on Airbnb Code style)

module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "plugins": ["react"],

  "parser": "babel-eslint",

  "parserOptions": {
      "ecmaFeatures": {
        "arrowFunctions": true,
        "binaryLiterals": true,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": true,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": true,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": true,
        "regexUFlag": true,
        "regexYFlag": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodeCodePointEscapes": true,
        "globalReturn": true,
        "jsx": true
      },
      "sourceType": "module",
      "allowImportExportEverywhere": true
  },

  "rules": {

    //
    //Possible Errors
    //
    // The following rules point out areas where you might have made mistakes.
    //
    "comma-dangle": 1, // disallow or enforce trailing commas
    "no-cond-assign": 1, // disallow assignment in conditional expressions
    "no-console": 1, // disallow use of console (off by default in the node environment)
    "no-constant-condition": 1, // disallow use of constant expressions in conditions
    "no-control-regex": 1, // disallow control characters in regular expressions
    "no-debugger": 1, // disallow use of debugger
    "no-dupe-args": 1, // disallow duplicate arguments in functions
    "no-dupe-keys": 1, // disallow duplicate keys when creating object literals
    "no-duplicate-case": 1, // disallow a duplicate case label.
    "no-empty": 1, // disallow empty statements
    "no-empty-character-class": 1, // disallow the use of empty character classes in regular expressions
    "no-ex-assign": 1, // disallow assigning to the exception in a catch block
    "no-extra-boolean-cast": 1, // disallow double-negation boolean casts in a boolean context
    "no-extra-parens": 0, // disallow unnecessary parentheses (off by default)
    "no-extra-semi": 1, // disallow unnecessary semicolons
    "no-func-assign": 1, // disallow overwriting functions written as function declarations
    "no-inner-declarations": 1, // disallow function or variable declarations in nested blocks
    "no-invalid-regexp": 1, // disallow invalid regular expression strings in the RegExp constructor
    "no-irregular-whitespace": 1, // disallow irregular whitespace outside of strings and comments
    "no-negated-in-lhs": 1, // disallow negation of the left operand of an in expression
    "no-obj-calls": 1, // disallow the use of object properties of the global object (Math and JSON) as functions
    "no-regex-spaces": 1, // disallow multiple spaces in a regular expression literal
    "quote-props": 1, // require quotes around object literal property names
    "no-sparse-arrays": 1, // disallow sparse arrays
    "no-unreachable": 1, // disallow unreachable statements after a return, throw, continue, or break statement
    "use-isnan": 1, // disallow comparisons with the value NaN
    "valid-jsdoc": 1, // Ensure JSDoc comments are valid (off by default)
    "valid-typeof": 1, // Ensure that the results of typeof are compared against a valid string

    //
    // Best Practices
    //
    // These are rules designed to prevent you from making mistakes.
    // They either prescribe a better way of doing something or help you avoid footguns.
    //
    "block-scoped-var": 0, // treat var statements as if they were block scoped (off by default). 0: deep destructuring is not compatible https://github.com/eslint/eslint/issues/1863
    "complexity": 0, // specify the maximum cyclomatic complexity allowed in a program (off by default)
    "consistent-return": 1, // require return statements to either always or never specify values
    "curly": 1, // specify curly brace conventions for all control statements
    "default-case": 1, // require default case in switch statements (off by default)
    "dot-notation": 1, // encourages use of dot notation whenever possible
    "eqeqeq": 1, // require the use of === and !==
    "guard-for-in": 1, // make sure for-in loops have an if statement (off by default)
    "no-alert": 1, // disallow the use of alert, confirm, and prompt
    "no-caller": 1, // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 1, // disallow division operators explicitly at beginning of regular expression (off by default)
    "no-else-return": 1, // disallow else after a return in an if (off by default)
    "no-labels": 1, // disallow use of labels for anything other then loops and switches
    "no-eq-null": 1, // disallow comparisons to null without a type-checking operator (off by default)
    "no-eval": 1, // disallow use of eval()
    "no-extend-native": 1, // disallow adding to native types
    "no-extra-bind": 1, // disallow unnecessary function binding
    "no-fallthrough": 1, // disallow fallthrough of case statements
    "no-floating-decimal": 1, // disallow the use of leading or trailing decimal points in numeric literals (off by default)
    "no-implied-eval": 1, // disallow use of eval()-like methods
    "no-iterator": 1, // disallow usage of __iterator__ property
    "no-labels": 1, // disallow use of labeled statements
    "no-lone-blocks": 1, // disallow unnecessary nested blocks
    "no-loop-func": 1, // disallow creation of functions within loops
    "no-multi-spaces": 1, // disallow use of multiple spaces
    "no-multi-str": 1, // disallow use of multiline strings
    "no-native-reassign": 1, // disallow reassignments of native objects
    "no-new": 1, // disallow use of new operator when not part of the assignment or comparison
    "no-new-func": 1, // disallow use of new operator for Function object
    "no-new-wrappers": 1, // disallows creating new instances of String,Number, and Boolean
    "no-octal": 1, // disallow use of octal literals
    "no-octal-escape": 1, // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-param-reassign": 1, // disallow reassignment of function parameters (off by default)
    "no-process-env": 1, // disallow use of process.env (off by default)
    "no-proto": 1, // disallow usage of __proto__ property
    "no-redeclare": 1, // disallow declaring the same variable more then once
    "no-return-assign": 1, // disallow use of assignment in return statement
    "no-script-url": 1, // disallow use of javascript: urls.
    "no-self-compare": 1, // disallow comparisons where both sides are exactly the same (off by default)
    "no-sequences": 1, // disallow use of comma operator
    "no-throw-literal": 1, // restrict what can be thrown as an exception (off by default)
    "no-unused-expressions": 1, // disallow usage of expressions in statement position
    "no-void": 1, // disallow use of void operator (off by default)
    "no-warning-comments": [0, {"terms": ["todo", "fixme"], "location": "start"}], // disallow usage of configurable warning terms in comments": 1, // e.g. TODO or FIXME (off by default)
    "no-with": 1, // disallow use of the with statement
    "radix": 1, // require use of the second argument for parseInt() (off by default)
    "vars-on-top": 1, // requires to declare all vars on top of their containing scope (off by default)
    "wrap-iife": 1, // require immediate function invocation to be wrapped in parentheses (off by default)
    "yoda": 1, // require or disallow Yoda conditions

    //
    // Strict Mode
    //
    // These rules relate to using strict mode.
    //
    "strict": 0, // controls location of Use Strict Directives. 0: required by `babel-eslint`

    //
    // Variables
    //
    // These rules have to do with variable declarations.
    //
    "no-catch-shadow": 1, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    "no-delete-var": 1, // disallow deletion of variables
    "no-label-var": 1, // disallow labels that share a name with a variable
    "no-shadow": 1, // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 1, // disallow shadowing of names such as arguments
    "no-undef": 1, // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 1, // disallow use of undefined when initializing variables
    "no-undefined": 1, // disallow use of undefined variable (off by default)
    "no-unused-vars": 1, // disallow declaration of variables that are not used in the code
    "no-use-before-define": 1, // disallow use of variables before they are defined

    //
    //Stylistic Issues
    //
    // These rules are purely matters of style and are quite subjective.
    //
    "indent": [1, "tab"], // this option sets a specific tab width for your code (off by default)
    "brace-style": 1, // enforce one true brace style (off by default)
    "camelcase": 1, // require camel case names
    "comma-spacing": [1, {"before": false, "after": true}], // enforce spacing before and after comma
    "comma-style": [1, "last"], // enforce one true comma style (off by default)
    "consistent-this": [1, "_this"], // enforces consistent naming when capturing the current execution context (off by default)
    "eol-last": 1, // enforce newline at the end of file, with no multiple empty lines
    "func-names": 0, // require function expressions to have a name (off by default)
    "func-style": 0, // enforces use of function declarations or expressions (off by default)
    "key-spacing": [1, {"beforeColon": false, "afterColon": true}], // enforces spacing between keys and values in object literal properties
    "max-nested-callbacks": [1, 3], // specify the maximum depth callbacks can be nested (off by default)
    "new-cap": [1, {newIsCap: true, capIsNew: false}], // require a capital letter for constructors
    "new-parens": 1, // disallow the omission of parentheses when invoking a constructor with no arguments
    "newline-after-var": 0, // allow/disallow an empty newline after var statement (off by default)
    "no-array-constructor": 1, // disallow use of the Array constructor
    "no-inline-comments": 1, // disallow comments inline after code (off by default)
    "no-lonely-if": 1, // disallow if as the only statement in an else block (off by default)
    "no-mixed-spaces-and-tabs": 1, // disallow mixed spaces and tabs for indentation
    "no-multiple-empty-lines": [1, {"max": 2}], // disallow multiple empty lines (off by default)
    "no-nested-ternary": 1, // disallow nested ternary expressions (off by default)
    "no-new-object": 1, // disallow use of the Object constructor
    "no-spaced-func": 1, // disallow space between function identifier and application
    "no-ternary": 0, // disallow the use of ternary operators (off by default)
    "no-trailing-spaces": 1, // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 1, // disallow dangling underscores in identifiers
    "no-extra-parens": [1, "all"], // disallow wrapping of non-IIFE statements in parens
    "one-var": [1, "never"], // allow just one var statement per function (off by default)
    "operator-assignment": [1, "never"], // require assignment operator shorthand where possible or prohibit it entirely (off by default)
    "padded-blocks": [1, "never"], // enforce padding within blocks (off by default)
    "quote-props": [1, "as-needed"], // require quotes around object literal property names (off by default)
    "quotes": [1, "single"], // specify whether double or single quotes should be used
    "semi": [1, "always"], // require or disallow use of semicolons instead of ASI
    "semi-spacing": [1, {"before": false, "after": true}], // enforce spacing before and after semicolons
    "sort-vars": 0, // sort variables within the same declaration block (off by default)
    "space-before-blocks": [1, "always"], // require or disallow space before blocks (off by default)
    "space-before-function-paren": [1, {"anonymous": "always", "named": "never"}], // require or disallow space before function opening parenthesis (off by default)
    // "object-curly-spacing": [1, "never"],
    // "array-bracket-spacing": [1, "never"],
    // "computed-property-spacing": [1, "never"],
    "space-in-parens": [1, "never"], // require or disallow spaces inside parentheses (off by default)
    "space-infix-ops": ["error", {"int32Hint": false}], // require spaces around operators
    "keyword-spacing": [1, {"before": true, "after": true}], // require a space after return, throw, and case
    "space-unary-ops": [1, {"words": true, "nonwords": false}], // Require or disallow spaces before/after unary operators (words on by default, nonwords off by default)
    "spaced-comment": [1, "always"], // require or disallow a space immediately following the // in a line comment (off by default)
    "wrap-regex": 0, // require regex literals to be wrapped in parentheses (off by default)

    //
    // ECMAScript 6
    //
    // These rules are only relevant to ES6 environments and are off by default.
    //
    "no-var": 1, // require let or const instead of var (off by default)
    "generator-star-spacing": [2, "before"], // enforce the spacing around the * in generator functions (off by default)

    //
    // Legacy
    //
    // The following rules are included for compatibility with JSHint and JSLint.
    // While the names of the rules may not match up with the JSHint/JSLint counterpart,
    // the functionality is the same.
    //
    "max-depth": [1, 3], // specify the maximum depth that blocks can be nested (off by default)
    "max-len": [1, 100, 2], // specify the maximum length of a line in your program (off by default)
    "max-params": [1, 5], // limits the number of parameters that can be used in the function declaration. (off by default)
    "max-statements": 0, // specify the maximum number of statement allowed in a function (off by default)
    "no-bitwise": 0, // disallow use of bitwise operators (off by default)
    "no-plusplus": 1, // disallow use of unary operators, ++ and -- (off by default)

    //
    // eslint-plugin-react
    //
    // React specific linting rules for ESLint
    //
    "react/display-name": 0, // Prevent missing displayName in a React component definition
    "jsx-quotes": [1, "prefer-double"], // Enforce quote style for JSX attributes
    "react/jsx-no-undef": 1, // Disallow undeclared variables in JSX
    "react/jsx-sort-props": 0, // Enforce props alphabetical sorting
    "react/jsx-uses-react": 1, // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": 1, // Prevent variables used in JSX to be incorrectly marked as unused
    "react/no-did-mount-set-state": 1, // Prevent usage of setState in componentDidMount
    "react/no-did-update-set-state": 1, // Prevent usage of setState in componentDidUpdate
    "react/no-multi-comp": 0, // Prevent multiple component definition per file
    "react/no-unknown-property": 1, // Prevent usage of unknown DOM property
    "react/prop-types": 1, // Prevent missing props validation in a React component definition
    "react/react-in-jsx-scope": 1, // Prevent missing React when using JSX
    "react/self-closing-comp": 1, // Prevent extra closing tags for components without children
    "react/jsx-wrap-multilines": 2, // Prevent missing parentheses around multilines JSX
  }
}