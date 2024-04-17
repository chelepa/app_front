import styles from "./Container.module.css";
import { Message } from "./Message";

export const Container = ({children, customClass, type, msg}: {children: JSX.Element, customClass: string, type: string, msg: string;}) => {
  return (
    <div className={`${styles.container} ${styles[customClass]}`}>
      {msg && <Message type={type} msg={msg}/>}
      <div className={styles.container_Panel}>
        {children}
      </div>
    </div>
  );
};

