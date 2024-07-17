import { Response } from "express";
import express from "express";

export default class TokenMiddleware {
  public router = express.Router();

  constructor() {
    this.extract();
  }

  private extract() {
    this.router.use("*", (req: any, res: Response, next: any) => {
      const token= JSON.parse(req.session["keycloak-token"]);
      if(!token){
        throw new Error("No token");
      }
      const user = JSON.parse(Buffer.from(token.access_token.split('.')[1], 'base64').toString('utf-8'))
      req.user = user;
      next();
    });
  }
}
