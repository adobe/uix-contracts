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

import type { Properties } from "csstype";
import type { HotKeyCombination } from "./hotKey.ts";

/**
 * Common UIX types.
 */

/**
 * Basic AEM shared context values
 */
export type AEMBaseSharedContext = {
  aemHost: string;
  locale: string;
  theme: string;
  auth: {
    imsToken: string;
    imsOrg: string;
    authScheme?: string | undefined;
  };
};
//& Record<string, unknown>;

// --- Toast
export type Toast = {
  variant: "neutral" | "info" | "negative" | "positive";
  message: string;
  timeout?: number; // number of ms toast should persist
};

export type ToastApi = {
  toaster: {
    display: (toast: Toast) => Promise<void>;
  };
};

/**
 * Adds the source (extension instance) as the first argument to all host functions.
 */
export type AddExtensionArgument<T> = T extends (...args: any[]) => any
  ? // If T is a function, add the source (extension instance) as the first argument
    // TODO: add proper type for extension instance
    (source: any, ...args: Parameters<T>) => ReturnType<T> | ReturnType<T>
  : {
      // Recursively iterate over functions and objects while returning the same type for scalars
      [K in keyof T]: T[K] extends Object | ((...args: any) => any)
        ? AddExtensionArgument<T[K]>
        : T[K];
    };

/**
 * Recursively makes all methods in T optional.
 */
export type PartialMethods<T> = {
  [K in keyof T]?: T[K] extends (...args: any[]) => any
    ? (...args: Parameters<T[K]>) => ReturnType<T[K]> | ReturnType<T[K]>
    : T[K] extends Object
      ? PartialMethods<T[K]>
      : T[K];
};

// -- Icons

export type IconVariant =
  | "_123"
  | "_3DMaterials"
  | "ABC"
  | "AEMScreens"
  | "Actions"
  | "AdDisplay"
  | "AdPrint"
  | "Add"
  | "AddCircle"
  | "AddTo"
  | "AddToSelection"
  | "Airplane"
  | "Alert"
  | "AlertAdd"
  | "AlertCheck"
  | "AlertCircle"
  | "AlertCircleFilled"
  | "Algorithm"
  | "Alias"
  | "AlignBottom"
  | "AlignCenter"
  | "AlignLeft"
  | "AlignMiddle"
  | "AlignRight"
  | "AlignTop"
  | "Amusementpark"
  | "Anchor"
  | "AnchorSelect"
  | "Annotate"
  | "AnnotatePen"
  | "Answer"
  | "AnswerFavorite"
  | "App"
  | "AppRefresh"
  | "AppleFiles"
  | "ApplicationDelivery"
  | "ApproveReject"
  | "Apps"
  | "Archive"
  | "ArchiveRemove"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowUpRight"
  | "Artboard"
  | "Article"
  | "Asset"
  | "AssetCheck"
  | "AssetsAdded"
  | "AssetsDownloaded"
  | "AssetsExpired"
  | "AssetsLinkedPublished"
  | "AssetsModified"
  | "AssetsPublished"
  | "Asterisk"
  | "At"
  | "Attach"
  | "AttachmentExclude"
  | "Attributes"
  | "Audio"
  | "AutomatedSegment"
  | "Back"
  | "Back30Seconds"
  | "BackAndroid"
  | "Beaker"
  | "BeakerCheck"
  | "BeakerShare"
  | "Bell"
  | "BidRule"
  | "BidRuleAdd"
  | "Blower"
  | "Blur"
  | "Book"
  | "Bookmark"
  | "BookmarkSingle"
  | "BookmarkSingleOutline"
  | "BookmarkSmall"
  | "BookmarkSmallOutline"
  | "Boolean"
  | "Border"
  | "Box"
  | "BoxAdd"
  | "BoxExport"
  | "BoxImport"
  | "Brackets"
  | "BracketsSquare"
  | "Branch1"
  | "Branch2"
  | "Branch3"
  | "BranchCircle"
  | "BreadcrumbNavigation"
  | "Breakdown"
  | "BreakdownAdd"
  | "Briefcase"
  | "Browse"
  | "Brush"
  | "Bug"
  | "Building"
  | "BulkEditUsers"
  | "Button"
  | "CCLibrary"
  | "Calculator"
  | "Calendar"
  | "CalendarAdd"
  | "CalendarLocked"
  | "CalendarUnlocked"
  | "CallCenter"
  | "Camera"
  | "CameraFlip"
  | "CameraRefresh"
  | "Campaign"
  | "CampaignAdd"
  | "CampaignClose"
  | "CampaignDelete"
  | "CampaignEdit"
  | "Cancel"
  | "Capitals"
  | "Captcha"
  | "Car"
  | "Card"
  | "Channel"
  | "Chat"
  | "ChatAdd"
  | "CheckPause"
  | "Checkmark"
  | "CheckmarkCircle"
  | "CheckmarkCircleOutline"
  | "ChevronDoubleLeft"
  | "ChevronDoubleRight"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronUpDown"
  | "Circle"
  | "ClassicGridView"
  | "Clock"
  | "ClockCheck"
  | "CloneStamp"
  | "Close"
  | "CloseCaptions"
  | "CloseCircle"
  | "Cloud"
  | "CloudDisconnected"
  | "CloudError"
  | "CloudOutline"
  | "Code"
  | "Collection"
  | "CollectionAdd"
  | "CollectionAddTo"
  | "CollectionCheck"
  | "CollectionEdit"
  | "CollectionExclude"
  | "CollectionLink"
  | "ColorFill"
  | "ColorPalette"
  | "ColorWheel"
  | "ColumnSettings"
  | "ColumnTwoA"
  | "ColumnTwoB"
  | "ColumnTwoC"
  | "Comment"
  | "Compare"
  | "Compass"
  | "Condition"
  | "ConfidenceFour"
  | "ConfidenceOne"
  | "ConfidenceThree"
  | "ConfidenceTwo"
  | "Contrast"
  | "ConversionFunnel"
  | "Copy"
  | "CoverImage"
  | "CreditCard"
  | "Crop"
  | "CropLightning"
  | "CropRotate"
  | "Crosshairs"
  | "Curate"
  | "Cut"
  | "Dashboard"
  | "Data"
  | "DataAdd"
  | "DataBook"
  | "DataCheck"
  | "DataCorrelated"
  | "DataDownload"
  | "DataEdit"
  | "DataMapping"
  | "DataRefresh"
  | "DataRemove"
  | "DataSettings"
  | "DataUnavailable"
  | "DataUpload"
  | "DataUser"
  | "Date"
  | "DateInput"
  | "Deduplication"
  | "Delegate"
  | "Delete"
  | "DeleteOutline"
  | "Demographic"
  | "Deselect"
  | "DeselectCircular"
  | "DesktopAndMobile"
  | "DeviceDesktop"
  | "DeviceLaptop"
  | "DevicePhone"
  | "DevicePhoneRefresh"
  | "DevicePreview"
  | "DeviceRotateLandscape"
  | "DeviceRotatePortrait"
  | "DeviceTV"
  | "DeviceTablet"
  | "Devices"
  | "DistributeBottomEdge"
  | "DistributeHorizontalCenter"
  | "DistributeHorizontally"
  | "DistributeLeftEdge"
  | "DistributeRightEdge"
  | "DistributeSpaceHoriz"
  | "DistributeSpaceVert"
  | "DistributeTopEdge"
  | "DistributeVerticalCenter"
  | "DistributeVertically"
  | "Divide"
  | "DividePath"
  | "Document"
  | "DocumentFragment"
  | "DocumentFragmentGroup"
  | "DocumentOutline"
  | "DocumentRefresh"
  | "Dolly"
  | "Download"
  | "DownloadFromCloud"
  | "DownloadFromCloudOutline"
  | "Draft"
  | "DragHandle"
  | "Draw"
  | "Dropdown"
  | "Duplicate"
  | "Edit"
  | "EditCircle"
  | "EditExclude"
  | "EditIn"
  | "EditInLight"
  | "Education"
  | "Effects"
  | "Efficient"
  | "Ellipse"
  | "Email"
  | "EmailCancel"
  | "EmailCheck"
  | "EmailExclude"
  | "EmailExcludeOutline"
  | "EmailGear"
  | "EmailGearOutline"
  | "EmailKey"
  | "EmailKeyOutline"
  | "EmailLightning"
  | "EmailNotification"
  | "EmailOutline"
  | "EmailRefresh"
  | "EmailSchedule"
  | "Engagement"
  | "Erase"
  | "Event"
  | "EventExclude"
  | "EventShare"
  | "Events"
  | "ExcludeOverlap"
  | "Experience"
  | "ExperienceAdd"
  | "ExperienceAddTo"
  | "ExperienceExport"
  | "ExperienceImport"
  | "Export"
  | "ExportOriginal"
  | "Exposure"
  | "Extension"
  | "FacebookCoverImage"
  | "Fast"
  | "FastForward"
  | "FastForwardCircle"
  | "Feature"
  | "Feed"
  | "FeedAdd"
  | "FeedManagement"
  | "Feedback"
  | "FileAdd"
  | "FileCSV"
  | "FileCampaign"
  | "FileChart"
  | "FileCheckedOut"
  | "FileCode"
  | "FileData"
  | "FileEmail"
  | "FileExcel"
  | "FileFolder"
  | "FileGear"
  | "FileGlobe"
  | "FileHTML"
  | "FileImportant"
  | "FileJson"
  | "FileKey"
  | "FileMobile"
  | "FilePDF"
  | "FileShare"
  | "FileSingleWebPage"
  | "FileSpace"
  | "FileTemplate"
  | "FileTxt"
  | "FileUser"
  | "FileWord"
  | "FileWorkflow"
  | "FileXML"
  | "FileZip"
  | "FilingCabinet"
  | "Filmroll"
  | "FilmrollAutoAdd"
  | "Filter"
  | "FilterAdd"
  | "FilterCheck"
  | "FilterDelete"
  | "FilterEdit"
  | "FilterHeart"
  | "FilterRemove"
  | "FilterStar"
  | "FindAndReplace"
  | "Flag"
  | "FlagExclude"
  | "FlashAuto"
  | "FlashOff"
  | "FlashOn"
  | "Flashlight"
  | "FlashlightOff"
  | "FlashlightOn"
  | "FlipHorizontal"
  | "FlipVertical"
  | "Folder"
  | "Folder2Color"
  | "FolderAdd"
  | "FolderAddTo"
  | "FolderArchive"
  | "FolderDelete"
  | "FolderGear"
  | "FolderLocked"
  | "FolderOpen"
  | "FolderOpenOutline"
  | "FolderOutline"
  | "FolderRemove"
  | "FolderSearch"
  | "FolderUser"
  | "Follow"
  | "FollowOff"
  | "ForPlacementOnly"
  | "Forecast"
  | "Form"
  | "Forward"
  | "FullScreen"
  | "FullScreenExit"
  | "Function"
  | "Game"
  | "Gauge1"
  | "Gauge2"
  | "Gauge3"
  | "Gauge4"
  | "Gauge5"
  | "Gears"
  | "GearsAdd"
  | "GearsDelete"
  | "GearsEdit"
  | "GenderFemale"
  | "GenderMale"
  | "Gift"
  | "Globe"
  | "GlobeCheck"
  | "GlobeClock"
  | "GlobeEnter"
  | "GlobeExit"
  | "GlobeGrid"
  | "GlobeOutline"
  | "GlobeRemove"
  | "GlobeSearch"
  | "GlobeStrike"
  | "GlobeStrikeClock"
  | "Gradient"
  | "GraphArea"
  | "GraphAreaStacked"
  | "GraphBarHorizontal"
  | "GraphBarHorizontalAdd"
  | "GraphBarHorizontalStacked"
  | "GraphBarVertical"
  | "GraphBarVerticalAdd"
  | "GraphBarVerticalStacked"
  | "GraphBubble"
  | "GraphBullet"
  | "GraphConfidenceBands"
  | "GraphDonut"
  | "GraphDonutAdd"
  | "GraphGantt"
  | "GraphHistogram"
  | "GraphPathing"
  | "GraphPie"
  | "GraphProfitCurve"
  | "GraphScatter"
  | "GraphStream"
  | "GraphStreamRanked"
  | "GraphStreamRankedAdd"
  | "GraphSunburst"
  | "GraphTree"
  | "GraphTrend"
  | "GraphTrendAdd"
  | "GraphTrendAlert"
  | "Graphic"
  | "Group"
  | "Hammer"
  | "Hand"
  | "Hand0"
  | "Hand1"
  | "Hand2"
  | "Hand3"
  | "Hand4"
  | "Heal"
  | "Heart"
  | "Help"
  | "HelpOutline"
  | "Histogram"
  | "History"
  | "Home"
  | "Homepage"
  | "HotFixes"
  | "HotelBed"
  | "IdentityService"
  | "Image"
  | "ImageAdd"
  | "ImageAlbum"
  | "ImageAutoMode"
  | "ImageCarousel"
  | "ImageCheck"
  | "ImageCheckedOut"
  | "ImageMapCircle"
  | "ImageMapPolygon"
  | "ImageMapRectangle"
  | "ImageNext"
  | "ImageProfile"
  | "ImageSearch"
  | "ImageText"
  | "Images"
  | "Import"
  | "Inbox"
  | "Individual"
  | "Info"
  | "InfoOutline"
  | "IntersectOverlap"
  | "InvertAdj"
  | "Journey"
  | "JourneyAction"
  | "JourneyData"
  | "JourneyEvent"
  | "JourneyEvent2"
  | "JourneyReports"
  | "JourneyVoyager"
  | "JumpToTop"
  | "Key"
  | "KeyClock"
  | "KeyExclude"
  | "Keyboard"
  | "Label"
  | "LabelExclude"
  | "Labels"
  | "Landscape"
  | "Launch"
  | "Layers"
  | "LayersBackward"
  | "LayersBringToFront"
  | "LayersForward"
  | "LayersSendToBack"
  | "Light"
  | "Line"
  | "LineHeight"
  | "LinearGradient"
  | "Link"
  | "LinkCheck"
  | "LinkGlobe"
  | "LinkNav"
  | "LinkOff"
  | "LinkOut"
  | "LinkOutLight"
  | "LinkPage"
  | "LinkUser"
  | "Location"
  | "LocationBasedDate"
  | "LocationBasedEvent"
  | "LocationContribution"
  | "LockClosed"
  | "LockOpen"
  | "LogOut"
  | "Login"
  | "Looks"
  | "LoupeView"
  | "MBox"
  | "MagicWand"
  | "Magnify"
  | "Mailbox"
  | "MapView"
  | "MarginBottom"
  | "MarginLeft"
  | "MarginRight"
  | "MarginTop"
  | "MarketingActivities"
  | "Maximize"
  | "Measure"
  | "Menu"
  | "Merge"
  | "MergeLayers"
  | "Messenger"
  | "Minimize"
  | "MobileServices"
  | "ModernGridView"
  | "Money"
  | "Monitoring"
  | "Moon"
  | "More"
  | "MoreCircle"
  | "MoreSmall"
  | "MoreSmallList"
  | "MoreSmallListVert"
  | "MoreVertical"
  | "Move"
  | "MoveLeftRight"
  | "MoveTo"
  | "MoveUpDown"
  | "MovieCamera"
  | "Multiple"
  | "MultipleAdd"
  | "MultipleCheck"
  | "MultipleExclude"
  | "NamingOrder"
  | "NewItem"
  | "News"
  | "NewsAdd"
  | "NoEdit"
  | "Note"
  | "NoteAdd"
  | "OS"
  | "Offer"
  | "OfferDelete"
  | "OnAir"
  | "OpenIn"
  | "OpenInLight"
  | "OpenRecent"
  | "OpenRecentOutline"
  | "Orbit"
  | "Organisations"
  | "Organize"
  | "OutlinePath"
  | "PaddingBottom"
  | "PaddingLeft"
  | "PaddingRight"
  | "PaddingTop"
  | "PageBreak"
  | "PageExclude"
  | "PageGear"
  | "PageRule"
  | "PageShare"
  | "PageTag"
  | "PagesExclude"
  | "Pan"
  | "Panel"
  | "Paste"
  | "PasteHTML"
  | "PasteList"
  | "PasteText"
  | "Pattern"
  | "Pause"
  | "PauseCircle"
  | "Pawn"
  | "Pending"
  | "PeopleGroup"
  | "PersonalizationField"
  | "Perspective"
  | "PinOff"
  | "PinOn"
  | "Pivot"
  | "PlatformDataMapping"
  | "Play"
  | "PlayCircle"
  | "Plug"
  | "Polygon"
  | "PolygonSelect"
  | "PopIn"
  | "Portrait"
  | "Preset"
  | "Preview"
  | "Print"
  | "PrintPreview"
  | "Project"
  | "ProjectAdd"
  | "ProjectEdit"
  | "ProjectNameEdit"
  | "Promote"
  | "Properties"
  | "PropertiesCopy"
  | "PublishCheck"
  | "PublishPending"
  | "PublishReject"
  | "PublishRemove"
  | "PublishSchedule"
  | "PushNotification"
  | "Question"
  | "QuickSelect"
  | "RSS"
  | "RadialGradient"
  | "Rail"
  | "RailBottom"
  | "RailLeft"
  | "RailRight"
  | "RailRightClose"
  | "RailRightOpen"
  | "RailTop"
  | "RangeMask"
  | "RealTimeCustomerProfile"
  | "RectSelect"
  | "Rectangle"
  | "Redo"
  | "Refresh"
  | "RegionSelect"
  | "Relevance"
  | "Remove"
  | "RemoveCircle"
  | "Rename"
  | "Reorder"
  | "Replay"
  | "Replies"
  | "Reply"
  | "ReplyAll"
  | "Report"
  | "ReportAdd"
  | "Resize"
  | "Retweet"
  | "Reuse"
  | "Revenue"
  | "Revert"
  | "Rewind"
  | "RewindCircle"
  | "Ribbon"
  | "RotateCCW"
  | "RotateCCWBold"
  | "RotateCW"
  | "RotateCWBold"
  | "RotateLeft"
  | "RotateLeftOutline"
  | "RotateRight"
  | "RotateRightOutline"
  | "SMS"
  | "SMSKey"
  | "SMSLightning"
  | "SMSRefresh"
  | "SQLQuery"
  | "Sampler"
  | "Sandbox"
  | "SaveAsFloppy"
  | "SaveFloppy"
  | "SaveTo"
  | "SaveToLight"
  | "Scribble"
  | "Search"
  | "Seat"
  | "SeatAdd"
  | "Segmentation"
  | "Segments"
  | "Select"
  | "SelectAdd"
  | "SelectBox"
  | "SelectBoxAll"
  | "SelectCircular"
  | "SelectContainer"
  | "SelectGear"
  | "SelectIntersect"
  | "Selection"
  | "SelectionChecked"
  | "SelectionMove"
  | "Send"
  | "SentimentNegative"
  | "SentimentNeutral"
  | "SentimentPositive"
  | "Separator"
  | "Servers"
  | "Settings"
  | "Shapes"
  | "Share"
  | "ShareAndroid"
  | "ShareCheck"
  | "ShareLight"
  | "ShareWindows"
  | "Sharpen"
  | "Shield"
  | "Ship"
  | "Shop"
  | "ShoppingCart"
  | "ShowAllLayers"
  | "ShowMenu"
  | "ShowOneLayer"
  | "Shuffle"
  | "Slice"
  | "Slow"
  | "SmallCaps"
  | "Snapshot"
  | "SocialNetwork"
  | "SortOrderDown"
  | "SortOrderUp"
  | "Spam"
  | "Spellcheck"
  | "Spin"
  | "SplitView"
  | "SpotHeal"
  | "Stadium"
  | "Stage"
  | "Stamp"
  | "Star"
  | "StarOutline"
  | "Starburst"
  | "StepBackward"
  | "StepBackwardCircle"
  | "StepForward"
  | "StepForwardCircle"
  | "Stop"
  | "StopCircle"
  | "Stopwatch"
  | "Straighten"
  | "StraightenOutline"
  | "StrokeWidth"
  | "Subscribe"
  | "SubtractFrontPath"
  | "SuccessMetric"
  | "Summarize"
  | "Survey"
  | "Switch"
  | "Sync"
  | "SyncRemove"
  | "Table"
  | "TableAdd"
  | "TableAndChart"
  | "TableColumnAddLeft"
  | "TableColumnAddRight"
  | "TableColumnMerge"
  | "TableColumnRemoveCenter"
  | "TableColumnSplit"
  | "TableEdit"
  | "TableHistogram"
  | "TableMergeCells"
  | "TableRowAddBottom"
  | "TableRowAddTop"
  | "TableRowMerge"
  | "TableRowRemoveCenter"
  | "TableRowSplit"
  | "TableSelectColumn"
  | "TableSelectRow"
  | "TagBold"
  | "TagItalic"
  | "TagUnderline"
  | "Target"
  | "Targeted"
  | "TaskList"
  | "Teapot"
  | "Temperature"
  | "TestAB"
  | "TestABEdit"
  | "TestABGear"
  | "TestABRemove"
  | "TestProfile"
  | "Text"
  | "TextAdd"
  | "TextAlignCenter"
  | "TextAlignJustify"
  | "TextAlignLeft"
  | "TextAlignRight"
  | "TextBaselineShift"
  | "TextBold"
  | "TextBulleted"
  | "TextBulletedAttach"
  | "TextBulletedHierarchy"
  | "TextBulletedHierarchyExclude"
  | "TextColor"
  | "TextDecrease"
  | "TextEdit"
  | "TextExclude"
  | "TextIncrease"
  | "TextIndentDecrease"
  | "TextIndentIncrease"
  | "TextItalic"
  | "TextKerning"
  | "TextLetteredLowerCase"
  | "TextLetteredUpperCase"
  | "TextNumbered"
  | "TextParagraph"
  | "TextRomanLowercase"
  | "TextRomanUppercase"
  | "TextSize"
  | "TextSizeAdd"
  | "TextSpaceAfter"
  | "TextSpaceBefore"
  | "TextStrikethrough"
  | "TextStroke"
  | "TextStyle"
  | "TextSubscript"
  | "TextSuperscript"
  | "TextTracking"
  | "TextUnderline"
  | "ThumbDown"
  | "ThumbDownOutline"
  | "ThumbUp"
  | "ThumbUpOutline"
  | "Tips"
  | "Train"
  | "TransferToPlatform"
  | "Transparency"
  | "Trap"
  | "TreeCollapse"
  | "TreeCollapseAll"
  | "TreeExpand"
  | "TreeExpandAll"
  | "TrendInspect"
  | "TrimPath"
  | "Trophy"
  | "Type"
  | "USA"
  | "Underline"
  | "Undo"
  | "Ungroup"
  | "Unlink"
  | "Unmerge"
  | "UploadToCloud"
  | "UploadToCloudOutline"
  | "User"
  | "UserActivity"
  | "UserAdd"
  | "UserAdmin"
  | "UserArrow"
  | "UserCheckedOut"
  | "UserDeveloper"
  | "UserEdit"
  | "UserExclude"
  | "UserGroup"
  | "UserLock"
  | "UserShare"
  | "UsersAdd"
  | "UsersExclude"
  | "UsersLock"
  | "UsersShare"
  | "Variable"
  | "VectorDraw"
  | "VideoCheckedOut"
  | "VideoFilled"
  | "VideoOutline"
  | "ViewAllTags"
  | "ViewBiWeek"
  | "ViewCard"
  | "ViewColumn"
  | "ViewDay"
  | "ViewDetail"
  | "ViewGrid"
  | "ViewList"
  | "ViewRow"
  | "ViewSingle"
  | "ViewStack"
  | "ViewWeek"
  | "ViewedMarkAs"
  | "Vignette"
  | "Visibility"
  | "VisibilityOff"
  | "Visit"
  | "VisitShare"
  | "VoiceOver"
  | "VolumeMute"
  | "VolumeOne"
  | "VolumeThree"
  | "VolumeTwo"
  | "Watch"
  | "WebPage"
  | "WebPages"
  | "Workflow"
  | "WorkflowAdd"
  | "Wrench"
  | "ZoomIn"
  | "ZoomOut";

// -- Rails

export type Rail = {
  extension: string;
  header: string;
  id: string;
  url: string;
  icon: IconVariant;
  hotkey?: HotKeyCombination;
};

export type RailApi = {
  rightPanel?: {
    addRails?: () => Promise<Rail[]>;
  };
};

/// --- loader

export type ProgressCircleApi = {
  progressCircle: {
    /**
     * Starts a progress circle that shows the presence of background system operation in a visual way.
     * The progress circle also blocks all user interactions with the UI.
     *
     * @remarks
     * Please keep in mind, multiple extensions may use the progress circle simultaneously. The progress
     * circle will not disappear until all involved extensions call the `stop` method.
     */
    start: () => Promise<void>;
    stop: () => Promise<void>;
  };
};

// ------ modal

export const MODAL_AUTO_RESIZE = "auto";

/**
 * Modal dialog API exposed to all GuestServers.
 */
export type ModalApi = {
  modal: {
    /**
     * Open a modal dialog in the host application which displays a page in the caller
     * extension. Modals are shown one at a time with no stacking, and extensions
     * cannot override or dismiss modals created by other extensions.
     */
    showUrl(modal: Modal): Promise<void>;
    /**
     * Close the open modal. If the open modal does not belong to the calling
     * extension, reject with an error.
     */
    close(): Promise<void>;
  };
};

export type Modal = {
  /**
   * Title of the modal to display.
   * @default ""
   */
  title: string;
  /**
   * URL of the page to load in the dialog frame. The URL must have the same
   * origin as the extension making the modal request.
   */
  url: string;
  /**
   * A number of pixels, a CSS value, or the keyword 'auto'. The 'auto' keyword
   * will grow or shrink the modal to the height of the document in the iframe
   * every time the guest document resizes, to a minimum of 20% and a maximum of
   * 75% of window height. In fullscreen mode, this is ignored.
   * @default "auto"
   */
  height?: string | number | typeof MODAL_AUTO_RESIZE;
  /**
   * A number of pixels, a CSS value, or the keyword 'auto'.  The 'auto' keyword
   * will grow or shrink the modal to the width of the document in the iframe
   * every time the guest document resizes, to a minimum of 20% and a maximum of
   * 75% of window width. In fullscreen mode, this is ignored.
   * @default "auto"
   */
  width?: string | number | typeof MODAL_AUTO_RESIZE;
  /**
   * Display the dialog as large as possible. It will overlay most of the
   * application, leaving small borders to indicate overlay.
   * If true, any "width" and "height" parameters will be ignored.
   *
   * @see [Fullscreen Dialogs](https://react-spectrum.adobe.com/react-spectrum/DialogTrigger.html#fullscreen)
   * @default false
   */
  fullscreen?: boolean;
  /**
   * Show the dismiss button, so a user can close the modal no matter what state
   * it is in. If an extension disables this, it must provide its own UI control
   * which calls `modal.close()`.
   * @default true
   */
  isDismissable?: boolean;
  /**
   * Preserve the progress spinner that displays before the modal contents load.
   * When `false` or unset, the modal will show a progress spinner until the
   * guest in the iframe is connected, and then display the frame contents.
   * If the `modal.showUrl()` call sets `{ loading: true }`, the spinner will
   * continue displaying after the guest has connected, until the guest calls
   * `modal.set({ loading: false })`. A modal which needs to do data fetching
   * or layout adjustment after connecting should set `{ loading: true }` and
   * then dismiss it from the modal when its UI is ready.
   * @default false
   */
  loading?: boolean;
};

//TODO: Add modal internal change API

// ----- Host API
export type ReloadApi = {
  navigation: {
    reload(): Promise<void>;
  };
};

// ------ Header buttons API
export type HeaderItemsApi = {
  headerMenu?: {
    getButtons?: () => Promise<HeaderItem[]>;
  };
};

export type HeaderItem = Button & {
  variant: "cta" | "primary" | "secondary" | "negative" | "action";
  subItems?: Button[];
};

export type Button = {
  id: string;
  label: string;
  icon?: IconVariant;
  onClick(): Promise<void>;
};

// ------ Header delete items API

export type HeaderDeleteItemsApi = {
  headerMenu?: {
    deleteButtons?(): Promise<HeaderItemId[]>;
  };
};

export type HeaderItemId = {
  id: string;
};

// ----- DATA API

export type Field = {
  name: string;
  label: string;
  isMultiField: boolean;
  value: string | string[] | undefined;
  type: string;
};

export interface CSSProperties extends Properties<string | number> {}

export type DataApi = {
  dataApi: {
    getFields: () => Promise<Field[]>;
    setValue: (name: string, value: string, multi?: number) => Promise<void>;
    setStyles: (name: string, value: CSSProperties) => Promise<void>;
  };
};

// ----- RTE API
export type Colors = {
  allowedColors?: string[];
  isAllowedCustomColors?: boolean;
};

export type Widget = {
  id: string;
  label: string;
  url: string;
  extension_id: string;
};

export type Badge = {
  id: string;
  prefix: string;
  suffix: string;
  backgroundColor: string;
  textColor: string;
};

export type CoreButton = {
  id: CoreButtonId;
  toolbarGroup?: number;
};

export type RichTextEditorState = {
  text: string;
  html: string;
  selectedText: string;
  selectedHtml: string;
};

export type ToolbarButton = {
  id: string;
  icon?: IconVariant;
  text?: string;
  tooltip: string;
  toolbarGroup?: number;
  onClick: (state: RichTextEditorState) => ExtensionInstruction[];
};

export type ExtensionInstruction = {
  type: "replaceContent" | "insertContent";
  value: string;
};

export const CORE_BUTTON_IDS = [
  "aligncenter",
  "alignjustify",
  "alignleft",
  "alignnone",
  "alignright",
  "blockquote",
  "backcolor",
  "bold",
  "copy",
  "cut",
  "fontfamily",
  "fontsize",
  "forecolor",
  "blocks",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "indent",
  "italic",
  "language",
  "lineheight",
  "newdocument",
  "outdent",
  "paste",
  "redo",
  "remove",
  "removeformat",
  "selectall",
  "strikethrough",
  "styles",
  "subscript",
  "superscript",
  "underline",
  "undo",
  "visualaid",
  "pastetext",
  "link",
  "openlink",
  "unlink",
  "table",
  "tablecellprops",
  "tablecopyrow",
  "tablecutrow",
  "tabledelete",
  "tabledeletecol",
  "tabledeleterow",
  "tableinsertdialog",
  "tableinsertcolafter",
  "tableinsertcolbefore",
  "tableinsertrowafter",
  "tableinsertrowbefore",
  "tablemergecells",
  "tablepasterowafter",
  "tablepasterowbefore",
  "tableprops",
  "tablerowprops",
  "tablesplitcells",
  "tableclass",
  "tablecellclass",
  "tablecellvalign",
  "tablecellborderwidth",
  "tablecellborderstyle",
  "tablecaption",
  "tablecellbackgroundcolor",
  "tablecellbordercolor",
  "tablerowheader",
  "tablecolheader",
  "code",
  "fullscreen",
  "bullist",
  "numlist",
  "charmap",
  "preview",
  "searchreplace",
  "visualblocks",
  "insertdatetime",
  "media",
  "anchor",
] as const;
export type CoreButtonId = (typeof CORE_BUTTON_IDS)[number];

/**
 * @category Guest API
 */
export type RteApi = {
  rte?: {
    ut?: () => Promise<ToolbarButton[]>;
    getCoreButtons?: () => Promise<CoreButton[]>;
    removeButtons?: () => Promise<CoreButton[]>;
    getWidgets?: () => Promise<Widget[]>;
    getBadges?: () => Promise<Badge[]>;
    getColors?: () => Promise<Colors[]>;
  };
};

/**
 * Available only in widget's UI frame.
 */
export type RteWidgetApi = {
  rte: {
    applyInstructions: (instructions: ExtensionInstruction[]) => Promise<void>;
    closeWidget: () => Promise<void>;
  };
};

export type {
  NativeComponentType,
  NativeValueType,
  FieldModel,
} from "./FieldModel.ts";

export type SetStylesProps = {
  current?: CSSProperties;
  parent?: CSSProperties;
};

type PositionsType = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  viewportHeight: number;
  viewportWidth: number;
};

export type TEST = string;

export type ValidationResult = MessageDescriptor | string | null;

export type MessageValue = boolean | Date | null | undefined;

export interface MessageDescriptor {
  messageId: string;
  defaultMessage: string;
  description: string;
  values?: {
    [key: string]: MessageValue;
  };
}

export type FieldPrivateMethodsEditor<ModelT> = {
  getModel: () => Promise<ModelT>;
  getDefaultValue: () => Promise<unknown>;
  getValidationState: () => Promise<"invalid" | "valid">;
  onValidationStateChange: (e: unknown, callback: () => void) => Promise<void>;
  onChange: (e: unknown, v: unknown) => Promise<void>;
  setHeight: (_: unknown, height: number) => Promise<void>;
  getBoundingClientRect: (
    _: unknown,
    element?: string,
  ) => Promise<PositionsType>;
  setStyles: (_: unknown, styles: SetStylesProps) => Promise<void>;
  getValue: () => Promise<string>;
  getError: () => Promise<ValidationResult>;
};
