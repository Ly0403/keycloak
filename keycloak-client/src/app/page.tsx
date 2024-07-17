"use client";

import { useState } from "react";
import { Button, Container, Image } from "react-bootstrap";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  const goToRegister = () => {
    window.location.href="http://localhost:8080/admin/test/console";
  }
  const logout = () => {
    window.location.href="http://localhost:3001/logout";
  }

  const login = () => {
    window.location.href="http://localhost:3001/auth";
  }

  return (
    <>
      {isAuth && <h1>Welcome</h1>}
      {!isAuth && (
        <Container>
          <Image alt="keycloak" src="/images/keycloak.png" rounded />
          <Button className="m-4" variant="dark" onClick={login}>
            Login
          </Button>
          <Button className="m-4" variant="danger" onClick={goToRegister}>
            Register
          </Button>
          <Button className="m-4" variant="warning" onClick={logout}>
            Logout
          </Button>
        </Container>
      )}
    </>
  );
}
