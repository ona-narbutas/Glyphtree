// import express, { Router, Request, Response} from 'express';

// import usersController from '../controllers/usersController';
// import postsController from '../controllers/postsControllers';

const express = require('express');
const usersController = require('../controllers/usersController');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.get(
  '/',
  usersController.verifySession,
  postsController.buildFeed,
  (req, res) => {
    return res
      .status(200)
      .json(
        Object.assign({ feed: res.locals.feed }, { user: res.locals.user })
      );
  }
);

router.post('/', postsController.createPost, (req, res) => {
  return res.status(200).json(res.locals.newPost);
});

// retrieve post children
router.get('/children/:parentId', postsController.findChildren, (req, res) => {
  return res.status(200).json(res.locals.children);
});

module.exports = router;
