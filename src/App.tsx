import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Home } from './components/pages/Home';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  }

  return (
    <div className="App">
      <Header handleLogout={handleLogout}/>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
