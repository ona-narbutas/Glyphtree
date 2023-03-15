import React, { Dispatch } from "react"

export type Post = {
  post_id: number,
  is_root: boolean,
  created_at: string,
  content: string,
  reads: number,
  root_id: number,
  parent_id: (number | null),
  author_id: number,
  username: string
}

export interface Props {

}

export type MiddlewareError = {
  log: string,
  status: number,
  message: {
    err: string
  }
}

export type UsersController = {
  authenticate: Function
}

export type AuthOperation = ('signUp' | 'logIn');

export type FunctionComponent<Props extends {}> = (
    props: Props,
    context?: any,
  ) => JSX.Element | null;

export interface AuthProps {
  toggleAuth: Dispatch<React.SetStateAction<boolean>>;
}

export interface UserInputType {
  operation: string,
  email: string,
  password: string,
  username?: string
}

export type jsx = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];