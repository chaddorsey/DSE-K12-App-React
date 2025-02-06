/**
 * Common error types and interfaces
 */

export type ErrorCode = 
  | 'OFFLINE'
  | 'PORTAL_REDIRECT'
  | 'HTTP_ERROR'
  | 'UNKNOWN_ERROR';

export interface IErrorMessageTemplate {
  title: string;
  message: string;
  action?: string;
} 