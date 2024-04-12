import { useContext } from 'react';
import styles from './Permission.module.css'
import { PermissionContext } from '../../contexts/Permission/PermissionContext';
import { Message } from '../layout/Message';
import { useLocation } from 'react-router-dom';
import { Container } from '../layout/Container';
import { LinkButton } from '../form/LinkButton';
import { Table } from 'react-bootstrap';

export const Permission = () => {
    const auth = useContext(PermissionContext);

    const location = useLocation();
    let msg = '';
    if (location.state){
        msg = location.state.message
    }

    return (
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1>Modulo de Pemissoes</h1>
          <LinkButton to="/" text="Nova Permissao" />
        </div>
        <Container customClass="start">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Permission</th>
              </tr>
            </thead>
            <tbody>
              {auth.permissionList.length > 0 &&
                auth.permissionList.map((project) => (
                  <tr>
                    <td>{project.id}</td>
                    <td>{project.description}</td>
                    <td>{project.permission}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>

      //    {msg && <Message type={'error'} msg={msg}/>}
    );
}