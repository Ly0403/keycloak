import express, { Response } from "express";
import KeycloakMiddleware from "../middlewares/keycloak";
import TokenMiddleware from "../middlewares/tokenMiddleware";

export default class AuthController {
  public router = express.Router();
  private keycloakMiddleware: KeycloakMiddleware;
  private tokenMiddleware: TokenMiddleware;

  constructor({
    keycloakMiddleware,
    tokenMiddleware,
  }: {
    keycloakMiddleware: KeycloakMiddleware;
    tokenMiddleware: TokenMiddleware;
  }) {
    this.keycloakMiddleware = keycloakMiddleware;
    this.tokenMiddleware = tokenMiddleware;
    this.handleRoutes();
  }

  private handleRoutes() {
    this.router.get(
      "/",
      this.keycloakMiddleware.keycloak.protect(),
      this.tokenMiddleware.router,
      (req: any, res: Response) => {
        res.redirect("http://localhost:3000/")
      }
    );
  }
}
