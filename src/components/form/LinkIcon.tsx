import { Link } from "react-router-dom";
import styles from './LinkIcon.module.css'

export const LinkIcon = ({ to, icon, customClass }: { to: string, icon:any, customClass:string }) => {
    return (
      <Link className={`${styles.btn} ${styles[customClass]}`} to={to}>
        {icon}
      </Link>
    );
}