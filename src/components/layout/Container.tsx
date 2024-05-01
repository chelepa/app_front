import styles from "./Container.module.css";
import { Loading } from "./Loading";
import { Message } from "./Message";

export const Container = ({children, customClass, type, msg, showLoading}: {children: JSX.Element, customClass: string, type: string, msg: string, showLoading: boolean}) => {
  return (
    <div className={`${styles[customClass]}`}>
      {msg && <Message type={type} msg={msg}/>}
      <div className={styles.container_Panel}>
        {showLoading && <Loading />}
        {children}
      </div>
    </div>
  );
};

