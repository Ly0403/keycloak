import Keycloak from "keycloak-connect";
import dotenv from "dotenv";
import session from "express-session";

export default class KeycloakMiddleware {
  public store = new session.MemoryStore();
  constructor() {
    dotenv.config();
  }
  private config = {
    realm: process.env.KEYCLOAK_REALM as string,
    "auth-server-url": process.env.KEYCLOAK_URL as string,
    "ssl-required": "external",
    resource: process.env.KEYCLOAK_CLIENT as string,
    "public-client": true,
    "confidential-port": 0
  };

  public keycloak = new Keycloak({ store: this.store }, this.config);
}
