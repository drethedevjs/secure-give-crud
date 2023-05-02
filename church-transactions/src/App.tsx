import Home from './Home.js';
import { Container } from 'react-bootstrap';
import Header from './header.js';

function App() {

  return (
    <>
      <Header/>
      <Container>
        <Home/>
      </Container>
    </>
  )
}

export default App
