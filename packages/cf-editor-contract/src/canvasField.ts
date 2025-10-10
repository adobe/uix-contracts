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

import { CSSProperties } from "@adobe/uix-commons-contract";

const CANVAS_METATYPE = {
  TEXT_SINGLE: "text-single",
  TEXT_MULTI: "text-multi",
  ENUMERATION: "enumeration",
  NUMBER: "number",
  DATE: "date",
  BOOLEAN: "boolean",
  JSON: "json",
  FRAGMENT_REFERENCE: "fragment-reference",
  REFERENCE: "reference",
  TAGS: "tags",
  TABS_PLACEHOLDER: "tab-placeholder",
};

type MetaType = (typeof CANVAS_METATYPE)[keyof typeof CANVAS_METATYPE];

type ModelValueTypes =
  | "boolean"
  | "string"
  | "string[]"
  | "content-fragment"
  | "long"
  | "double"
  | "calendar/date"
  | "calendar/time"
  | "calendar/datetime"
  | "date"
  | "time"
  | "datetime";

type FileSizeUnits = "B" | "KB" | "MB" | "GB" | "TB";

type CanvasFieldModel<BaseType> = {
  metaType: MetaType;
  name: string;

  listOrder?: number;

  multifield?: boolean;
  valueType?: ModelValueTypes;
  value?: BaseType;

  fieldLabel?: string;
  fieldDescription?: string;

  validation?: string;
  validationRegex?: string;

  renderReadOnly?: boolean;
  renderAs?: string;

  defaultMimeType?: string;

  rootPath?: string;

  acceptedTypes?: string[];

  customErrorMsg?: string;

  emptyText?: string;

  // constraints
  required?: boolean | null;
  maxLength?: number;
  unique?: boolean;
  /**
   * @deprecated use maxItems
   */
  maxSize?: number;
  maxItems?: number;
  /**
   * @deprecated use minItems
   */
  minSize?: number;
  minItems?: number;

  imageWidthMin?: number;
  imageWidthMax?: number;
  imageHeightMin?: number;
  imageHeightMax?: number;

  filesizeMin?: number;
  filesizeMinUnit?: FileSizeUnits;
  filesizeMax?: number;
  filesizeMaxUnit?: FileSizeUnits;

  numberMin?: number;
  numberMax?: number;

  allowedModels?: null | string[];
  allowedModelTagIds?: string[];
  allowNew?: boolean;
  allowMultiple?: boolean;

  emptyOption?: boolean;
  options?: Array<{
    name: string;
    value: string;
  }>;

  // not sure:
  styles?: CSSProperties;
};

export type ProcessedCanvasFieldModel<BaseType> = CanvasFieldModel<BaseType> & {
  renderMulti?: boolean;
};
