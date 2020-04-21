import {UserController} from "./controller/UserController";
import {SessionController} from "./controller/SessionController";
import {authenticate} from "./middleware";

export const Routes = [{
    method: "post",
    route: "/users",
    controller: UserController,
    action: "register"
}, {
    method: "post",
    route: "/users/auth",
    controller: UserController,
    action: "auth"
}, {
    method: "get",
    route: "/users/:id/sessions",
    controller: UserController,
    middleware: authenticate,
    action: "getSessions"
}, {
    method: "post",
    route: "/sessions",
    controller: SessionController,
    middleware: authenticate,
    action: "create"
}];