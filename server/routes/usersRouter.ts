import express, { Router, Request, Response } from 'express';
import usersController from '../controllers/usersController';

const router: Router = express.Router();
router.post('/', usersController.authenticate, (req: Request,res: Response) => {
  return res.status(200).send(JSON.stringify(res.locals.newUser)) // *** REPLACE PLACEHOLDER***
})

export default router;