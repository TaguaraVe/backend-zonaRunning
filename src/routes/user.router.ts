import {Router} from 'express'
import {create,getOne,getAll,update, remove, login, verifyCode, logged, resetPassword, updatePassword, setAvatar} from '../controllers/user.controllers'
import verifyJWT from '../utils/verifyJWT'

export const routerUser = Router()


routerUser.route('/')
        .get(getAll) //Getting all users
        .post(create) // Creating a new user 
        
routerUser.route('/login') //Post --->> //users/login ----------> public endpoint
        .post(login)

routerUser.route('/me') //Get --> users/me private endPoint
        .get(verifyJWT,logged)
        
routerUser.route('/reset_password') //Post --> /users/reset_password ------------ public EndPont
        .post(resetPassword)
        
    
        
routerUser.route('/:id')
        .get(verifyJWT, getOne) //getting one user
        .put(verifyJWT,update) //updating one user
        .delete(remove) //removing one user 
       
        
routerUser.route('/verify/:code') 
    .get(verifyCode)

routerUser.route('/reset_password/:code') // Post -----> /users/reset_password/:code -----> public endpoint
    .post(updatePassword)

routerUser.route('/avatar/:id')
    .post(setAvatar) //update avatar