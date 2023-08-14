import express from 'express'
import * as userController from '../controller/user.controller'
export const router = express.Router()

router.post('/signup', userController.signup);

router.post('/login', userController.login);
// router.get('/:id/approve',
