// import express, { Router, Request, Response } from 'express';
// import usersController from '../controllers/usersController';

const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();
router.post('/', usersController.authenticate, (req, res) => {
  return res.status(200).send(JSON.stringify(res.locals.newUser || res.locals.foundUser))
})

module.exports = router;