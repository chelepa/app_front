import { useContext } from 'react';
import styles from './Permission.module.css'
import { PermissionContext } from '../../contexts/Permission/PermissionContext';
import { Message } from '../layout/Message';
import { useLocation } from 'react-router-dom';
import { Container } from '../layout/Container';
import { LinkButton } from '../form/LinkButton';

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
          <LinkButton to='/' text='Nova Permissao'/>
        </div>
        <Container customClass='start'>
            <p>teste chelepa ...</p>
        </Container>
          
      </div>

      //    {msg && <Message type={'error'} msg={msg}/>}
      /* {auth.permissionList.length > 0 && auth.permissionList.map((project) => (
            <div>
                <span>{project.id}</span>
                <span>{project.description}</span>
                <span>{project.permission}</span>
            </div>
           ))} */
    );
}