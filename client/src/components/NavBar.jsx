import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import Notification from "./Chat/Notification.jsx";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Duchatte
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
              <Notification />
                <Link
                  to="/logout"
                  onClick={() => logoutUser()}
                  className="link-light text-decoration-none"
                >
                  LogOut
                </Link>
                )
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
