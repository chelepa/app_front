import { LinkButton } from "../form/LinkButton";
import { PanelAction } from "./PanelAction";
import styles from "./PanelBobyView.module.css";

export const PanelBobyView = ({title, txtButton, redirect, children, handleOnChangeDelete, handleOnChangeUpdate, showPermissionFrom}: {title: string; txtButton: string; redirect: string; children: JSX.Element, handleOnChangeDelete:any, handleOnChangeUpdate:any, showPermissionFrom: boolean}) => {
  return (
    <div className={`${styles.Panel} card bg-primary text-white`}>
      <div className="card-body">
        <div className={styles.header_panel}>
          <h2>{title}</h2>
          <div className={styles.header_panel_button}>
            <LinkButton to={redirect} text={txtButton} />
          </div>
        </div>
      </div>
      <div className={`${styles.panel_boby} bg-light text-dark`}>
        {children}

        <PanelAction showPermissionFrom={showPermissionFrom} handleOnChangeDelete={handleOnChangeDelete} handleOnChangeUpdate={handleOnChangeUpdate}/>
      </div>
    </div>
  );
};
