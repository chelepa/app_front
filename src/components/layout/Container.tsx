import styles from "./Container.module.css";

export const Container = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.container}>{children}</div>;
};
