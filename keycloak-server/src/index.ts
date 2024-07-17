import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import AuthController from "./controllers/auth.controller";
import KeycloakMiddleware from "./middlewares/keycloak";
import TokenMiddleware from "./middlewares/tokenMiddleware";
import ContainerAwilix from "./utilities/container";

dotenv.config();
const app = express();

const container = new ContainerAwilix();

container.registerClass("authController", AuthController);
container.registerClass("keycloakMiddleware", KeycloakMiddleware);
container.registerClass("tokenMiddleware", TokenMiddleware);

const keycloak = container.resolve("keycloakMiddleware").keycloak;

app.use(
  session({
    secret: "KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub",
    resave: false,
    saveUninitialized: true,
    store: keycloak.store,
  })
);
app.use(keycloak.middleware({ logout: "/logout" }));
app.use(express.json());
app.use("/auth", container.resolve("authController").router);

app.use((req, res, next) => {
  res.status(404).send("Not Found!");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(500).send(err.message);
});

app.listen(process.env.PORT, () => {
  console.log("The server is listening on port " + process.env.PORT);
});
