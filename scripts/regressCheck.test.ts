/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { compareTypeStrings } from "./regressCheck";

describe("Type regression tool", () => {
  it("passes for identical types", () => {
    const code = `export type X = { a: string; b?: number }`;
    expect(compareTypeStrings(code, code)).toBe(true);
  });

  it("fails if required property added", () => {
    const a = `export type X = { a: string }`;
    const b = `export type X = { a: string; b: number }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes if optional property added", () => {
    const a = `export type X = { a: string }`;
    const b = `export type X = { a: string; b?: number }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("passes for unchanged type alias", () => {
    const a = `export type Y = string; export type X = { a: Y }`;
    const b = `export type Y = string; export type X = { a: Y }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("fails for changed type alias", () => {
    const a = `export type Y = string; export type X = { a: Y }`;
    const b = `export type Y = number; export type X = { a: Y }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes for union extension", () => {
    const a = `export type X = 'a' | 'b'`;
    const b = `export type X = 'a' | 'b' | 'c'`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("fails for union reduction", () => {
    const a = `export type X = 'a' | 'b' | 'c'`;
    const b = `export type X = 'a' | 'b'`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes for unchanged function argument optionality", () => {
    const code = `export type X = { f: (a?: string) => void }`;
    expect(compareTypeStrings(code, code)).toBe(true);
  });

  it("fails if function argument becomes required", () => {
    const a = `export type X = { f: (a?: string) => void }`;
    const b = `export type X = { f: (a: string) => void }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if required property is added to a nested object", () => {
    const a = `export type X = { a: { b: string } }`;
    const b = `export type X = { a: { b: string; c: number } }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if optional property becomes required in a nested object", () => {
    const a = `export type X = { a: { b?: string } }`;
    const b = `export type X = { a: { b: string } }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if nested function argument becomes required", () => {
    const a = `export type X = { a: { f: (x?: number) => void } }`;
    const b = `export type X = { a: { f: (x: number) => void } }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if function argument is removed", () => {
    const a = `export type X = { f: (a: string, b: number) => void }`;
    const b = `export type X = { f: (a: string) => void }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if new required function argument is added", () => {
    const a = `export type X = { f: (a: string) => void }`;
    const b = `export type X = { f: (a: string, b: number) => void }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes if new optional function argument is added", () => {
    const a = `export type X = { f: (a: string) => void }`;
    const b = `export type X = { f: (a: string, b?: number) => void }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("fails for union reduction in nested property", () => {
    const a = `export type X = { a: 'a' | 'b' | 'c' }`;
    const b = `export type X = { a: 'a' | 'b' }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes for union extension in nested property", () => {
    const a = `export type X = { a: 'a' | 'b' }`;
    const b = `export type X = { a: 'a' | 'b' | 'c' }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("fails for type alias change in nested property", () => {
    const a = `export type Y = string; export type X = { a: { y: Y } }`;
    const b = `export type Y = number; export type X = { a: { y: Y } }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("fails if function return type regresses", () => {
    const a = `export type X = { f: () => string }`;
    const b = `export type X = { f: () => number }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("passes for generics", () => {
    const a = `export type X<T> = () => T`;
    expect(compareTypeStrings(a, a)).toBe(true);
  });

  it("allows adding required property to Guest API type", () => {
    const a = `/**\n * @category Guest API\n */\nexport type X = { a: { b: () => void } }`;
    const b = `/**\n * @category Guest API\n */\nexport type X = { a: { b: () => void; c: () => void } }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });

  it("still fails for required property added to non-Guest API type", () => {
    const a = `export type X = { a: string }`;
    const b = `export type X = { a: string; b: number }`;
    expect(compareTypeStrings(a, b)).toBe(false);
  });

  it("allows adding required property to deeply nested object under Guest API type", () => {
    const a = `/**\n * @category Guest API\n*/\nexport type X = { a: string }`;
    const b = `/**\n * @category Guest API\n*/\nexport type X = { a: string; b: number }`;
    expect(compareTypeStrings(a, b)).toBe(true);
  });
});
