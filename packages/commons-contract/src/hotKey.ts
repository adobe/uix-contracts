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

import { z } from "zod";
declare const Digit: z.ZodEnum<{
  0: "0";
  1: "1";
  2: "2";
  3: "3";
  4: "4";
  5: "5";
  6: "6";
  7: "7";
  8: "8";
  9: "9";
}>;
declare const Char: z.ZodEnum<{
  a: "a";
  b: "b";
  c: "c";
  d: "d";
  e: "e";
  f: "f";
  g: "g";
  h: "h";
  i: "i";
  j: "j";
  k: "k";
  l: "l";
  m: "m";
  n: "n";
  o: "o";
  p: "p";
  q: "q";
  r: "r";
  s: "s";
  t: "t";
  u: "u";
  v: "v";
  w: "w";
  x: "x";
  y: "y";
  z: "z";
}>;
declare const SpecialKeys: z.ZodEnum<{
  minus: "minus";
  equal: "equal";
  bracketleft: "bracketleft";
  bracketright: "bracketright";
  backslash: "backslash";
  semicolon: "semicolon";
  quote: "quote";
  comma: "comma";
  period: "period";
  slash: "slash";
  backquote: "backquote";
  enter: "enter";
  escape: "escape";
  backspace: "backspace";
  tab: "tab";
  insert: "insert";
  home: "home";
  end: "end";
  pageup: "pageup";
  pagedown: "pagedown";
  delete: "delete";
  arrowup: "arrowup";
  arrowdown: "arrowdown";
  arrowleft: "arrowleft";
  arrowright: "arrowright";
}>;
declare const Modifier: z.ZodEnum<{
  "": "";
  "shift+ctrl+": "shift+ctrl+";
  "shift+alt+": "shift+alt+";
  "shift+cmd+": "shift+cmd+";
  "ctrl+alt+": "ctrl+alt+";
  "ctrl+cmd+": "ctrl+cmd+";
  "alt+cmd+": "alt+cmd+";
  "shift+ctrl+alt+": "shift+ctrl+alt+";
  "shift+ctrl+cmd+": "shift+ctrl+cmd+";
  "shift+alt+cmd+": "shift+alt+cmd+";
  "ctrl+alt+cmd+": "ctrl+alt+cmd+";
  "shift+ctrl+alt+cmd+": "shift+ctrl+alt+cmd+";
  "shift+": "shift+";
  "ctrl+": "ctrl+";
  "alt+": "alt+";
  "cmd+": "cmd+";
}>;
export type KeyType =
  | z.infer<typeof Digit>
  | z.infer<typeof Char>
  | z.infer<typeof SpecialKeys>;
export type ModifierType = z.infer<typeof Modifier>;
export type HotKeyCombination = `${ModifierType}${KeyType}`;
export type HotKeysMap = Record<Uppercase<string>, HotKeyCombination>;
