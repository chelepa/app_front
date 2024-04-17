import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Home } from './components/pages/Home/Home';
import { Permission } from './components/pages/Permission/Permission';
import { PermissionProvider } from './contexts/Permission/PermissionProvider';
import { PermissionCreate } from './components/pages/Permission/PermissionCreate';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
  }

  return (
    <div className="App">
      <Header handleLogout={handleLogout}/>
      <Container customClass='' msg="" type="">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/permission" element={<PermissionProvider><Permission/></PermissionProvider>} />
          <Route path="/permission/create" element={<PermissionProvider><PermissionCreate/></PermissionProvider>} />
        </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
