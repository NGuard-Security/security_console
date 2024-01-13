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

export const APIPremiumType = {
  FREE: 0,
  PROFESSIONAL: 1,
  ENTERPRISE: 2,
} as const
export type APIPremiumType = (typeof APIPremiumType)[keyof typeof APIPremiumType]

export const APIInviteType = {
  RECAPTCHA: 2,
  OAUTH: 3,
  VERIFY: 4,
} as const
export type APIInviteType = (typeof APIInviteType)[keyof typeof APIInviteType]
