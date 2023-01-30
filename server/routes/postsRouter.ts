import express, { Router, Request, Response} from 'express';

import usersController from '../controllers/usersController';
import postsController from '../controllers/postsControllers';

const router: Router = express.Router();
router.get('/', usersController.verifySession, postsController.buildFeed, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.feed);
})

export default router;