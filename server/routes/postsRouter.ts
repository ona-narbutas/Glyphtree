import { Router, Request, Response, NextFunction } from 'express';

import usersController from '../controllers/usersController';
import postsController from '../controllers/postsController';

const postsRouter: Router = Router();

postsRouter.get(
  '/',
  usersController.verifySession,
  postsController.buildFeed,
  (req: Request, res: Response): Response => {
    return res
      .status(200)
      .json(
        Object.assign({ feed: res.locals.feed }, { user: res.locals.user })
      );
  }
);

postsRouter.post('/', postsController.createPost, (req, res): Response => {
  return res.status(200).json(res.locals.newPost);
});

// retrieve individual post
postsRouter.get(
  '/:postId',
  (req: Request, res: Response, next: NextFunction): Response | void => {
    console.log('post router');
    return next();
  },
  postsController.findPost,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.post);
  }
);

// retrieve post children
postsRouter.get(
  '/children/:parentId',
  postsController.findChildren,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.children);
  }
);

export default postsRouter;
