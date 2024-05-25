import { PiKeyReturn } from "react-icons/pi";
import { LinkIcon } from "../form/LinkIcon";
import { PanelAction } from "./PanelAction";
import styles from "./PanelBobyView.module.css";

export const PanelBobyView = ({title, redirect, children, handleOnChangeDelete, handleOnChangeUpdateOrCreate, saveOrDelete, enableSave}: {title: string; redirect: string; children: JSX.Element, handleOnChangeDelete:any, handleOnChangeUpdateOrCreate:any, saveOrDelete: boolean, enableSave: boolean}) => {
  return (
    <div className={`${styles.Panel} card bg-dark text-white`}>
      <div className="card-body">
        <div className={styles.header_panel}>
          <h2>{title}</h2>
          <div className={styles.header_panel_button}>
            <LinkIcon
              to={redirect}
              icon={<PiKeyReturn size={60} />}
              customClass={"btn_color_white"}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.panel_boby} bg-light text-dark`}>
        {children}

        <PanelAction saveOrDelete={saveOrDelete} handleOnChangeDelete={handleOnChangeDelete} handleOnChangeUpdate={handleOnChangeUpdateOrCreate} enableSave={enableSave}/>
      </div>
    </div>
  );
};
