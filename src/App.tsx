import { useContext } from 'react';
import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { RouteDefault } from './components/rotes/RouteDefault';
import { RoutePermission } from './components/rotes/RoutePermission';
import { AuthContext } from './contexts/Auth/AuthContext';
import { PermissionProvider } from './contexts/Permission/PermissionProvider';
import { ContainerApp } from './components/layout/ContainerApp';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
  }

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <ContainerApp>
        <div className="App1">
          <RouteDefault/>
          <PermissionProvider><RoutePermission /></PermissionProvider>
        </div>
      </ContainerApp>
      <Footer />
    </div>
  );
}

export default App;
