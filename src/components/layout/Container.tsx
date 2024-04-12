import styles from "./Container.module.css";

export const Container = ({ children, customClass }: { children: JSX.Element, customClass: string }) => {
  return <div className={`${styles.container} ${styles[customClass]}`}>{children}</div>;
};

