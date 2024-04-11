import styles from './Footer.module.css'
import { Container } from 'react-bootstrap';

export const Footer = () => {
    return (
        <div className="footer mt-auto py-3 bg-light" id={styles.footer}>
        <Container>
          {/* <span className="text-muted">{auth.user?.fullName}</span> */}
          <span className="text-muted">CHELEPA</span>
        </Container>
      </div>
    );
}