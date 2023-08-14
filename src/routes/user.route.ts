import express from 'express'
import * as userController from '../controller/user.controller'
import { authenticateToken } from '../middleware/authenticate.middleware';
export const router = express.Router()

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/:id/approve',authenticateToken, userController.approveUser);

router.get('/',authenticateToken, userController.getUsers);
