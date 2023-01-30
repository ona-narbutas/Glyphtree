import express, {Request, Response} from 'express';
import { AuthOperation, MiddlewareError } from '../../types';
import { db } from '../server';
import dotenv from "dotenv";
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds: number = 10;

const usersController = {
  authenticate: async (req: Request, res: Response, next: Function) => {
    try {
      // determine whether the request is asking to sign up or just log in
      const operation: AuthOperation = req.body.operation;
  
      // if the operation is asking to sign up, create a new user account and log user in
      if (operation === 'signUp') {
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
  
        const hash: string = await bcrypt.hash(password, saltRounds);
        const queryText = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email`;
        const values = [username, email, hash];
        const response = await db.query(queryText, values);
        res.locals.newUser = response.rows[0];
        res.cookie('Auth', jwt.sign(
          {
            user_id: res.locals.newUser.user_id,
            email: res.locals.newUser.email,
            username: res.locals.newUser.username,
          }, 
          process.env.TOKEN_KEY || 'no_key',
          {
            expiresIn: '2h',
          }
        ));

      // if operation is asking to log in, validate and log in
      } else {
        const email: string = req.body.email;
        const password: string = req.body.password;

        const queryText = `SELECT user_id, username, email, password FROM users WHERE email = $1;`
        const values = [email];
        const user = await db.query(queryText, values);
        res.locals.foundUser = user.rows[0];
        console.log("found user: ", res.locals.foundUser);

        const verificationResult: boolean = await bcrypt.compare(password, res.locals.foundUser.password);
        console.log('result: ', verificationResult);
        res.cookie('Auth', jwt.sign(
          {
            user_id: res.locals.foundUser.user_id,
            email: res.locals.foundUser.email,
            username: res.locals.foundUser.username,
          }, 
          process.env.TOKEN_KEY || 'no_key',
          {
            expiresIn: '2h',
          }
        ));
        return next();


      }
      return next();

    } catch(error) {
      console.log('error in promise: ', error)
      return next(error);
    }
    
  },
  verifySession: async (req: Request, res: Response, next: Function) => {
    if (req.cookies.Auth) {
      try {
        const auth = jwt.verify(req.cookies.Auth, process.env.TOKEN_KEY || 'no_key');
        res.locals.signedIn = auth;
        res.set({
          'signedIn': true
        })
      } catch (err) {
        res.locals.signedIn = false;
        res.set({
          'signedIn' : false,
        })
      }
    } else {
      res.locals.signedIn = false;
      res.set({
        'signedIn': false
      })
    }
    
    return next();
  }
}

export default usersController;