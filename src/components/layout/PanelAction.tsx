import { SubmitButton } from "../form/SubmitButton";
import styles from "./PanelAction.module.css";

export const PanelAction = ({showPermissionFrom, handleOnChangeDelete, handleOnChangeUpdate}: {showPermissionFrom: boolean, handleOnChangeDelete:any, handleOnChangeUpdate:any}) => {
  return (
    <div className={`${styles.panel_header}`}>
      <div className={`card ${showPermissionFrom ? "bg-danger bg-gradient" : "bg-info bg-gradient"} text-white`}>
        <div className={`${styles.panel_boby}`}>
          <h4>{showPermissionFrom ? "Excluir" : "Salvar"}</h4>
        </div>
        <div className="card bg-light text-dark">
          <div className={`${styles.padding} row`}>
            <div className="col-12">
              <SubmitButton
                text={showPermissionFrom ? "Excluir" : "Salvar"}
                handleOnChange={showPermissionFrom ? handleOnChangeDelete : handleOnChangeUpdate}
                customClass=""
                customClassButton={showPermissionFrom ? "color_delete" : "color_black"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};