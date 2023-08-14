import express from 'express'
import * as userController from '../controller/user.controller'
import { authenticateToken } from '../middleware/authenticate.middleware';
export const router = express.Router()

router.use(authenticateToken)

router.post('/signup', userController.signup);

router.post('/login', userController.login);
// router.get('/:id/approve',
