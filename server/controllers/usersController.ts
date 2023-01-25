import express, {Request, Response} from 'express';
import { AuthOperation, MiddlewareError } from '../../types';
import { db } from '../server';

import bcrypt from 'bcrypt';
const saltRounds: number = 10;

const usersController = {
  authenticate: async (req: Request, res: Response, next: Function) => {
    try {
      // determine whether the request is asking to sign up or just log in
      const operation: AuthOperation = req.body.operation;
  
      // if the operation is asking to sign up, create a new user account and log user in
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;

      const hash: string = await bcrypt.hash(password, saltRounds);
      const queryText = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email`;
      const values = [username, email, hash];
      const response = await db.query(queryText, values);
      res.locals.newUser = response.rows[0];
      return next();

    } catch(error) {
      console.log('error in promise: ', error)
      return next(error);
    }
    
  }
}

export default usersController;