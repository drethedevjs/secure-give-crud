import { Container } from 'react-bootstrap';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Home from './components/Home.js';

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
