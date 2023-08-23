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
    console.log('in build feed');
    try {
      // if (!res.locals.user?.signedIn) {
      if (true) {
        // We'll want to build feed differently depending on if user is logged in
        const queryText = `SELECT posts.*, tree_titles.title, users.username 
                          FROM posts LEFT OUTER JOIN users
                          ON posts.author_id = users.user_id
                          LEFT OUTER JOIN tree_titles
                          ON posts.title_id = tree_titles.title_id
                          WHERE posts.is_root = true`;
        const feedData = await db.query(queryText, []);
        res.locals.feed = feedData.rows;
        // TO-DO: if user is logged in, build feet of posts by followed authors + most recent roots
      } else {
        const queryText = `SELECT * FROM posts`;
        const feedData = await db.query(queryText, []);
        res.locals.feed = feedData.rows;
      }
      return next();
    } catch (err) {
      return next({
        log: 'Error in postsController.buildFeed: ' + err,
        status: 500,
        message: { err: 'Error building feed' },
      });
    }
  },

  createPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (res.locals.user?.signedIn) {
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
    } else {
      return next({
        log: 'ERROR in postsController.createPost: no signin credentials',
        status: 401,
        message: {
          err: 'Could not save post - invalid or missing credentials.',
        },
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

      const queryText = `SELECT posts.*, tree_titles.title, users.username 
      FROM posts LEFT OUTER JOIN users
      ON posts.post_id = $1
      LEFT OUTER JOIN tree_titles
      ON posts.title_id = tree_titles.title_id`;
      const values = [post_id];

      const dbRes = await db.query(queryText, values);
      res.locals.post = dbRes.rows[0];
      console.log('response: ', res.locals.post);
      return next();
    } catch (err) {
      return next({
        log: 'Error in postsController.findPost: ' + err,
        status: 500,
        message: { err: 'Error finding post' },
      });
    }
  },

  findChildren: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const parent_id = req.params.parentId;

      const queryText = `SELECT posts.*, tree_titles.title, users.username 
      FROM posts LEFT OUTER JOIN users
      ON posts.author_id = users.user_id
      LEFT OUTER JOIN tree_titles
      ON posts.title_id = tree_titles.title_id
      WHERE posts.parent_id = $1`;
      const values = [parent_id];

      const dbRes = await db.query(queryText, values);
      console.log('database response: ', dbRes.rows);

      res.locals.children = dbRes.rows.length ? dbRes.rows : 'no children';
      return next();
    } catch (err) {
      return next({
        log: 'Error in postsController.findChildren: ' + err,
        status: 500,
        message: { err: 'Error finding children' },
      });
    }
  },
};

export default postsController;
