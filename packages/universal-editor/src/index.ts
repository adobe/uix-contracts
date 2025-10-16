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

import {
  HeaderItemsApi,
  IconVariant,
  ModalApi,
  Rail,
  RailApi,
  FieldModel,
  FieldPrivateMethodsEditor,
} from "@adobe/uix-commons-contract";
import type { OpPatch } from "json-patch";

export type ExtensionRenderer = {
  extension: string;
  dataType: string;
  url: string;
  icon?: IconVariant;
};

export type CanvasExtensionApi = {
  canvas?: {
    getRenderers?(): Promise<ExtensionRenderer[]>;
  };
};

export type Caller = {
  id: string;
  url: URL;
};

export type CopyInfo = Partial<{
  copyIndex: number;
  originalId: string;
  copies: string[];
}>;

export type Editable = {
  id: string;
  rect: DOMRect;
  label: string;
  parentid: string;
  selector: string;
  isComponent: boolean;
  children?: string[];
  filter?: string;
  resource?: string;
  prop?: string;
  type?: string;
  model?: string;
  component?: string;
  content?: string;
  copyInfo?: CopyInfo;
};

export type Target = { editable: Editable };

type EditorState = {
  selected: Record<string, boolean>;
  editables: Editable[];
  location: string;
  connections: Record<string, string>;
  customTokens: Record<string, string>;
};

export type EditorStateApi = {
  editorState?: {
    get?(): Promise<EditorState>;
  };
};

export type EditorActionsApi = {
  editorActions?: {
    selectEditables?(caller: Caller, editables: Editable[]): Promise<void>;
    update?(
      caller: Caller,
      args: { target: Target; patch: OpPatch },
    ): Promise<void>;
    navigateTo?(caller: Caller, href: string): Promise<void>;
    refreshPage?(caller: Caller): Promise<void>;
    reloadExtension?(caller: Caller, id: string): Promise<void>;
  };
};

export type RemoteAppApi = {
  remoteApp?: {
    triggerEvent?(
      caller: Caller,
      eventName: string,
      selector?: string | undefined,
      payload?: unknown,
    ): Promise<void>;
  };
};

export type EventsExtensionApi = {
  events?: {
    listen?(event: string, data: unknown): void;
  };
};

export type FieldPrivateMethodsUniversalEditor =
  FieldPrivateMethodsEditor<FieldModel>;

export type UniversalEditorFieldApi = {
  field: FieldPrivateMethodsUniversalEditor;
};

export type UnivewrsalEditorSharedContent = {
  authScheme: string;
  theme: string;
  token: string;
  locale: string;
  orgId: string;
};

export type UniversalEditor = {
  outgoing: RailApi &
    HeaderItemsApi &
    CanvasExtensionApi &
    HeaderItemsApi &
    EventsExtensionApi;
  incoming: ModalApi & RemoteAppApi & EditorStateApi & EditorActionsApi;
  sharedContext: UnivewrsalEditorSharedContent;
};

export type UniversalEditorFieldUIApi = UniversalEditor["incoming"] &
  UniversalEditorFieldApi;

export type { Rail, RailApi };
