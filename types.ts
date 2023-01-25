export type Post = {
  post_id: number,
  is_root: boolean,
  created_at: string,
  content: string,
  reads: number,
  root_id: number,
  parent_id: (number | null),
  author_id: number,
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