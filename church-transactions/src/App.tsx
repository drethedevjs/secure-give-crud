import Home from './Home.js';
import { Container } from 'react-bootstrap';
import Header from './header.js';
import Footer from './Footer.js';

function App() {

  return (
    <>
      <Header/>
      <Container>
        <Home/>
      </Container>
      <Footer />
    </>
  )
}

export default App
