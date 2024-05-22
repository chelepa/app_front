import { useContext } from 'react';
import { ContainerApp } from './components/layout/ContainerApp';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { RouteDefault } from './components/rotes/RouteDefault';
import { RoutePermission } from './components/rotes/RoutePermission';
import { AuthContext } from './contexts/Auth/AuthContext';
import { PermissionProvider } from './contexts/Permission/PermissionProvider';
import { RoutePermissionGroup } from './components/rotes/RoutePermissionGroup';
import { PermissionGroupProvider } from './contexts/PermissionGroup/PermissionGroupProvider';
import { RouteCustomer } from './components/rotes/RouteCustomer';
import { CustomerProvider } from './contexts/Customer/CustomerProvider';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
  }

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <ContainerApp>
        <>
          <RouteDefault/>
          <PermissionProvider><RoutePermission /></PermissionProvider>
          <PermissionGroupProvider><RoutePermissionGroup/></PermissionGroupProvider>
          <CustomerProvider><RouteCustomer/></CustomerProvider>
        </>
      </ContainerApp>
      <Footer />
    </div>
  );
}

export default App;
