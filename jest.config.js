module.exports = {
    // Other configuration above...

    // Add the next three options if using TypeScript
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    preset: "ts-jest",
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.[t|j]sx?$": "ts-jest",
        "^.+\\.svg?$": "<rootDir>/transform.js",
        "^.+\\.scss?$": "<rootDir>/transform.js"
    },
    "testEnvironment": "jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
};