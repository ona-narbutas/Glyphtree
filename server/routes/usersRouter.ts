import { Router, Request, Response } from 'express';
import usersController from '../controllers/usersController';

const usersRouter: Router = Router();
usersRouter.post(
  '/',
  usersController.authenticate,
  (req: Request, res: Response): Response => {
    return res
      .status(200)
      .send(JSON.stringify(res.locals.newUser || res.locals.foundUser));
  }
);
export default usersRouter;
