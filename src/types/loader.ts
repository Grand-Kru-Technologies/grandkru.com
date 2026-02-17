export const LoaderAnimationStatus = {
  INITIALIZED: "initialized",
  RENDERED: "rendered",
  TRACKING_PROGRESS: "tracking_progress",
  LEAVING: "leaving",
} as const;

export type LoaderAnimationStatusType =
  (typeof LoaderAnimationStatus)[keyof typeof LoaderAnimationStatus];
