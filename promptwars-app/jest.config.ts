export default {
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/__tests__/*.test.ts"],
      transform: { "^.+\\.ts$": ["ts-jest", {}] },
    },
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/__tests__/*.test.tsx"],
      setupFilesAfterFramework: ["@testing-library/jest-dom"],
      transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }] },
    },
  ],
};
