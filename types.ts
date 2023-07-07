import React, { Dispatch } from 'react';

// --------------------GLOBAL TYPES--------------------

export type AuthOperation = 'signUp' | 'logIn';

// --------------------FRONTEND TYPES--------------------

export type Post = {
  post_id: number;
  is_root: boolean;
  created_at: string;
  content: string;
  reads: number;
  root_id: number;
  parent_id: number | null;
  author_id: number;
  username: string;
  children?: Post[] | null;
};

export type MiddlewareError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

export type FunctionComponent<Props extends {}> = (
  props: Props,
  context?: any
) => JSX.Element | null;

export interface AuthProps {
  toggleAuth: Dispatch<React.SetStateAction<boolean>>;
}

export interface UserInputType {
  operation: string;
  email: string;
  password: string;
  username?: string;
}

// --------------------BACKEND TYPES--------------------
export interface ServerError {
  message: {
    err: string;
  };
  status: number;
  log: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  bio?: string;
}
