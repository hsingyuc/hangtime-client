import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

export class UserController {

    private userRepository = getRepository(User);

    async register(request: Request, response: Response, next: NextFunction) {
        const user = this.userRepository.create(request.body);
        return this.userRepository.save(user);
    }

    async auth(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({email:request.body.email});

        if ( ! user ) {
            return {"error": "User not found!"};
        }

        const isValid = bcrypt.compareSync(request.body.password, user.password);
        
        if( isValid ) {
            const token = jwt.sign({ user: { id: user.id } }, 'secret-to-update', { expiresIn: '20160m' });
            return {"data": token};
        }

        return {"error": "Password not valid!"};
    }

    async getSessions(request: Request, response: Response, next: NextFunction) {
       if ( request.user.id !== parseInt(request.params.id) ) {
           response.sendStatus(401);
       }

        const user = await this.userRepository.findOne(request.params.id, { relations: ["sessions"] });

        if( ! user ) {
            return {"error": "User not found!"};
        }
        
        return { "data": user.sessions };
    }

}