import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import db from '../models';

interface PostsController {
  buildFeed: RequestHandler;
  createPost: RequestHandler;
  findPost: RequestHandler;
  findChildren: RequestHandler;
}

const postsController: PostsController = {
  buildFeed: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
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
  },

  createPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log('creating post: ', req.body);
      const queryText = `INSERT INTO posts (content, author_id, parent_id, is_root, root_id)
                        VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        req.body.content,
        req.body.author_id,
        req.body.parent_id,
        req.body.is_root,
        req.body.root_id || null,
      ];
      const newPost = await db.query(queryText, values);
      res.locals.newPost = newPost.rows[0];
      console.log('saved post: ', res.locals.newPost);
      return next();
    } catch (err) {
      return next({
        log: 'ERROR in postsController.createPost: ' + err,
        status: 500,
        message: { err: 'Could not create post' },
      });
    }
  },

  findPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    console.log('in findPost controller');
    try {
      const post_id = req.params.postId;

      const queryText = `SELECT posts.*, users.username FROM posts INNER JOIN users
      ON posts.post_id = $1`;
      const values = [post_id];

      const dbRes = await db.query(queryText, values);
      res.locals.post = dbRes.rows[0];
      console.log('response: ', res.locals.post);
      return next();
    } catch (err) {
      return next(err);
    }
  },

  findChildren: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const parent_id = req.params.parentId;

      const queryText = `SELECT posts.*, users.username FROM posts INNER JOIN users
      ON posts.author_id = users.user_id
      WHERE posts.parent_id = $1`;
      const values = [parent_id];

      const dbRes = await db.query(queryText, values);
      console.log('database response: ', dbRes.rows);

      res.locals.children = dbRes.rows.length ? dbRes.rows : 'no children';
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default postsController;
