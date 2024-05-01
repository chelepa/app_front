import styles from "./ContainerApp.module.css";

export const ContainerApp = ({children}: {children: JSX.Element}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_Panel}>{children}</div>
    </div>
  );
};

