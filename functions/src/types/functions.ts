import { ParamsDictionary } from 'express-serve-static-core';

export interface FunctionContext {
  auth?: {
    token: {
      admin: boolean;
    }
  }
}

export interface FunctionData {
  uid: string;
  role: string;
}

export type FunctionRequest = {
  get: (name: string) => string;
  header: (name: string) => string;
  [key: string]: any;
} & ParamsDictionary; 