import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Session} from "../entity/Session";

export class SessionController {

    private sessionRepository = getRepository(Session);

    async create(request: Request, response: Response, next: NextFunction) {
        const sessionData = {...request.body, user: request.user.id};
        const session = this.sessionRepository.create(sessionData);
        return this.sessionRepository.save(session);
    }

}
