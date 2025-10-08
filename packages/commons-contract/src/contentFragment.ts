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

export type ContentFragment = {
  path: string;
  etag: string;
  model: {
    path: string;
    title: string;
  };
  fragmentId: string;
  metadata: {
    title: string;
    description: string;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    publishedBy: string;
    publishedDate: string;
    status: ResourceStatus;
    scheduledStatus?: {
      /** One of publishing actions. */
      action?: "PUBLISH" | "UNPUBLISH";
      /** Operation status. */
      status?: "PENDING" | "SCHEDULED" | "QUEUED";
      /** User performing the scheduling of the operation. */
      scheduledBy?: string;
      /**
       * Moment when operation was scheduled.
       * @format date-time
       */
      scheduledDate?: string;
    };
    previewStatus?: PreviewStatus;
  };
  main: Record<string, any>;
  tags: TagItem[];
  variations: Record<string, Variation>;
};

export type TagItem = {
  name: string;
  id: string;
  path?: string;
  description?: string;
  tagCategoryName?: string;
  tagCategoryId?: string;
  highlight?: Highlight;
  title?: string;
  titlePath?: string;
};

export type Variation = {
  title?: string;
  description?: string;
  tags?: TagItem[];
  elements: { [key: string]: any };
  references?: CfReferences;
};

export type CfReferencedFragment = {
  title: string;
  model: FragmentModel;
  status: ResourceStatus;
};
export type CfReferencedAsset = {
  name?: string;
  title?: string | null;
  size?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  status?: ResourceStatus;
  id?: string;
  path?: string;
  created?: Partial<AuthoringInfo>;
};

export type AuthoringInfo = {
  at: string;
  by: string;
  fullName: string;
};

export type CfReferences = {
  [key: string]: CfReferencedFragment | CfReferencedAsset | CfReferencedAsset[];
};

export type FragmentModel = {
  path?: string;
  title?: string;
  name?: string;
  id?: string;
};

export type ResourceStatus =
  | "NEW"
  | "DRAFT"
  | "PUBLISHED"
  | "MODIFIED"
  | "UNPUBLISHED";

export declare enum PreviewStatus {
  IN_SYNC = "IN_SYNC",
  OUT_OF_SYNC = "OUT_OF_SYNC",
}

export type ScheduledPublicationStatus = {
  /** One of publishing actions. */
  action?: "PUBLISH" | "UNPUBLISH";
  /** Operation status. */
  status?: "PENDING" | "SCHEDULED" | "QUEUED";
  /** User performing the scheduling of the operation. */
  scheduledBy?: string;
  /**
   * Moment when operation was scheduled.
   * @format date-time
   */
  scheduledDate?: string;
};
