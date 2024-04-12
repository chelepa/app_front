import { Link } from "react-router-dom";
import styles from './LinkButton.module.css'

export const LinkButton = ({ to, text }: { to: string, text: string }) => {
    return (
      <Link className={styles.btn} to={to}>
        {text}
      </Link>
    );
}