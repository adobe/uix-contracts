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
  FieldPrivateMethodsEditor,
  AddExtensionArgument,
  DataApi,
  PartialMethods,
  ModalApi,
  ToastApi,
  RailApi,
  ProgressCircleApi,
  ReloadApi,
  HeaderItemsApi,
  HeaderDeleteItemsApi,
  AEMBaseSharedContext,
  RteWidgetApi,
  RteApi,
  SetStylesProps,
  ResourceStatus,
  PreviewStatus,
  ScheduledPublicationStatus,
  TagItem,
  Variation,
  FragmentModel,
  CfReferencedFragment,
  CfReferencedAsset,
  AuthoringInfo,
  CfReferences,
  ContentFragment,
} from "@adobe/uix-commons-contract";
import { ProcessedCanvasFieldModel } from "./canvasField";

export type CFEditorSharedContext = {} & AEMBaseSharedContext;

export type Highlight = {
  description?: HighlightOffset[];
  name: HighlightOffset[];
};

export type HighlightOffset = {
  offset: number;
  length: number;
};

export type ContentFragmentApi = {
  contentFragment: {
    getContentFragment: () => Promise<ContentFragment>;
  };
};

export type NavigationApi = {
  navigation: {
    /**
     * If the useHeadlessEditor parameter is undefined, the content fragment will be opened in the headless editor only if the feature AemFeatures.ACTION_OPEN_NEW_EDITOR is enabled.
     * shouldClearBreadcrumbs works only for a headless editor.
     */
    openEditor: (
      fragmentPath: string,
      shouldClearBreadcrumbs: boolean,
    ) => Promise<void>;
  };
};

export type FieldPrivateMethodsCFEditor<ModelT> = FieldPrivateMethodsEditor<
  ProcessedCanvasFieldModel<ModelT>
>;

type Definition = {
  pathExp?: string;
  modelPathExp?: string;
  fieldTypeExp?: string;
  fieldNameExp?: string;
  url: string;
  overlay?: boolean;
};

export type CFEditorFieldApi = {
  field: {
    getDefinition: () => Promise<Definition>;
  };
};

/**
 * All available types for CF Editor.
 */
export type CFEditor = {
  outgoing: RteApi &
    RailApi &
    HeaderItemsApi &
    HeaderDeleteItemsApi &
    CFEditorFieldApi;
  incoming: ProgressCircleApi &
    ReloadApi &
    ModalApi &
    DataApi &
    RteWidgetApi &
    ToastApi &
    NavigationApi &
    ContentFragmentApi;
  sharedContext: CFEditorSharedContext;
};

export { AddExtensionArgument };
