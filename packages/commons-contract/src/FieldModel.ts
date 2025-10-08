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
import type { RulesLogic } from "json-logic-js";

type FieldModelBase<Component, ValueType> = {
  component: Component;
  name: string;
  label: string | null;
  description?: string | null;
  valueType?: ValueType;
  valueFormat?: string;
  value?: unknown;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  multi?: boolean;
  placeholder?: string;
  validation?: unknown;
  hidden?: boolean;
  raw?: unknown;
  condition?: RulesLogic;
};

const NativeValueTypeZod = z.enum([
  "string",
  "string[]",
  "number",
  "boolean",
  "time",
  "date",
  "date-time",
]);
const NativeComponentTypeZod = z.enum([
  "boolean",
  "checkbox-group",
  "container",
  "date-time",
  "fallback",
  "json",
  "number",
  "radio-group",
  "reference",
  "select",
  "tab",
  "tags",
  "text",
  "richtext",
  "text-input",
  "text-area",
]);
type Custom = string & Record<never, never>;
type NativeValueType = z.infer<typeof NativeValueTypeZod>;
type NativeComponentType = z.infer<typeof NativeComponentTypeZod> | Custom;

type FieldModel<
  ComponentType = NativeComponentType,
  ValueType = NativeValueType,
  CustomAttributes = unknown,
> = FieldModelBase<ComponentType, ValueType> & CustomAttributes;
export type { NativeComponentType, NativeValueType, FieldModel };
