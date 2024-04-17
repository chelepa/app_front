import { useContext } from 'react';
import styles from './Home.module.css'
import { AuthContext } from '../../../contexts/Auth/AuthContext';

export const Home = () => {
    const auth = useContext(AuthContext);

    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao Sistema <span>{auth.user?.fullName}</span></h1>
            <p>Comece a gerenciar suas Contas</p>
        </section>
    );
}