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
import type {
  AddExtensionArgument,
  Button,
  ModalApi,
  ToastApi,
  ProgressCircleApi,
  HeaderItemsApi,
  HeaderDeleteItemsApi,
  AEMBaseSharedContext,
  ContentFragment,
} from "@adobe/uix-commons-contract";

export type CFAdminSharedContext = {} & AEMBaseSharedContext;

export type ActionBarItemsApi = {
  actionBar?: {
    getButtons?: () => Promise<ActionBarItem[]>;
  };
};

export type ActionBarItem = Button & {
  subItems?: Button[];
};

export type ActionBarDeleteItemsApi = {
  actionBar?: {
    deleteButtons?: () => Promise<ActionBarItemId[]>;
  };
};

export type ActionBarItemId = {
  id: string;
};

export type FragmentSelectionsApi = {
  fragmentSelections?: {
    getSelections?: () => Promise<ContentFragment[]>;
  };
};

export type ColumnRenderObject = {
  [key: string]: string;
};

export type ColumnItem = {
  id: string;
  label: string;
  render: (fragments: ContentFragment[]) => Promise<ColumnRenderObject>;
  align?: "start" | "center" | "end";
  allowsResizing?: boolean;
  allowsToggle?: boolean;
  hideHeader?: boolean;
  showDivider?: boolean;
  width?: number | string;
  mainWidth?: number | string;
  maxWidth?: number | string;
};

export type ContentFragmentGridApi = {
  contentFragmentGrid?: {
    getColumns: () => Promise<ColumnItem[]>;
  };
};
export type NavigationApi = {
  navigation: {
    openEditor: (fragmentPath: string) => Promise<void>;
  };
};

export type ExtensionRequirements = {
  updateOn: string;
};

/**
 * All available types for CF Editor.
 */
export type CFAdmin = {
  outgoing: ActionBarItemsApi & HeaderItemsApi & HeaderDeleteItemsApi & FragmentSelectionsApi & ContentFragmentGridApi;
  incoming: ProgressCircleApi & ModalApi & ToastApi & NavigationApi;
  sharedContext: CFAdminSharedContext;
};

export { AddExtensionArgument };
