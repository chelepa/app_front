import { MdCancelPresentation, MdEditSquare } from "react-icons/md";
import styles from "./PanelView.module.css";

export const PanelView = ({title, txtButton, handleOnChange, children}: {title: string; txtButton: any; handleOnChange: any; children: JSX.Element;}) => {
  return (
    <div className={`${styles.panel_header}`}>
      <div className={`card bg-info text-white`}>
        <div className={styles.panel_boby}>
          <h4>{title}</h4>
          <>
          {(() => {
              if (!txtButton) {
                return null;
              } else {
                if (txtButton === "Editar") {
                  return <MdEditSquare onClick={handleOnChange} size={40}/>;
                } else {
                  return <MdCancelPresentation onClick={handleOnChange} size={40}/>;
                }
              }
            })()}
          </>
        </div>
        <div className="card bg-light text-dark">
          <div className={`${styles.padding} row`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
