import { SubmitButton } from "../form/SubmitButton";
import styles from "./PanelAction.module.css";

export const PanelAction = ({saveOrDelete, handleOnChangeDelete, handleOnChangeUpdate}: {saveOrDelete: boolean, handleOnChangeDelete:any, handleOnChangeUpdate:any}) => {
  return (
    <div className={`${styles.panel_header}`}>
      <div className={`card ${saveOrDelete ? "bg-danger bg-gradient" : "bg-info bg-gradient"} text-white`}>
        <div className={`${styles.panel_boby}`}>
          <h4>{saveOrDelete ? "Excluir" : "Salvar"}</h4>
        </div>
        <div className="card bg-light text-dark">
          <div className={`${styles.padding} row`}>
            <div className="col-12">
              <SubmitButton
                text={saveOrDelete ? "Excluir" : "Salvar"}
                handleOnChange={saveOrDelete ? handleOnChangeDelete : handleOnChangeUpdate}
                customClass=""
                customClassButton={saveOrDelete ? "color_delete" : "color_black"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};