import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="vite logo"
              src="/vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Church Transactions
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;