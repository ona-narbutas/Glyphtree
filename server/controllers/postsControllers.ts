import express, { Request, Response } from 'express';
import { db } from '../server';

const postsController = {
  buildFeed: async (req: Request, res: Response, next: Function) => {
    // TO-DO: if user not logged in, build feed of most recent root posts
    if (!res.locals.signedIn) {
      const queryText = `SELECT posts.*, users.username FROM posts INNER JOIN users
                        ON posts.author_id = users.user_id`;
      const feedData = await db.query(queryText, []);
      res.locals.feed = feedData.rows;
    // TO-DO: if user is logged in, build feet of posts by followed authors + most recent roots
    } else {
      const queryText = `SELECT * FROM posts`;
      const feedData = await db.query(queryText, []);
      res.locals.feed = feedData.rows;
    }
    return next();
  }
}

export default postsController;