const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  modulePathIgnorePatterns: [
    '/__mocks__/',
    '/phantogram/',
    '/mock-finalization-registry',
    '/mock-weak-ref',
    '/mock-messageduplex',
    '/.yalc/@adobe/uix-core/',
    '/.yalc/@adobe/uix-guest/',
    '/packages/cf-editor-contract/.yalc/@adobe/uix-core/',
    '/packages/cf-editor-contract/.yalc/@adobe/uix-guest/',
  ],
};