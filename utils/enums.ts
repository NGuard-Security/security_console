export const LOADING_STATE = {
  Connecting: 0,
  Success: 1,
  Failed: 2,
} as const
export type LOADING_STATE = (typeof LOADING_STATE)[keyof typeof LOADING_STATE]

export const ALERT = {
  Alert: 0,
  Success: 1,
  Warning: 2,
  Danger: 3,
  Emerg: 4,
} as const
export type ALERT = (typeof ALERT)[keyof typeof ALERT]
