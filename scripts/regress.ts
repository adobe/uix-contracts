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
import * as fs from "fs";
import { compareTypeStrings } from "./regressCheck";

const [, , fileA, fileB] = process.argv;
const verbose =
  process.env.VERBOSE === "1" || process.argv.includes("--verbose");

if (!fileA || !fileB) {
  console.error("Usage: regress.ts <fileA> <fileB>");
  process.exit(1);
}

if (!fs.existsSync(fileA)) {
  console.error(`File not found: ${fileA}`);
  process.exit(1);
}
if (!fs.existsSync(fileB)) {
  console.error(`File not found: ${fileB}`);
  process.exit(1);
}

const sourceA = fs.readFileSync(fileA, "utf8");
const sourceB = fs.readFileSync(fileB, "utf8");
const ok = compareTypeStrings(sourceA, sourceB, { verbose });
if (!ok) process.exit(1);
