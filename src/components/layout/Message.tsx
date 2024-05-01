import { useEffect, useState } from 'react';
import styles from './Message.module.css'

export const Message = ({ type, msg }: { type: string, msg: string }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      if (!msg) {
        setVisible(false);
        return;
      }

      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, [msg]);

    return (
        <>
            {visible && (<div className={`${styles.message} ${styles[type]}`}>{msg}</div>)}
        </>
    );
}