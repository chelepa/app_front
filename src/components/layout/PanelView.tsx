import { SubmitButton } from "../form/SubmitButton";
import styles from "./PanelView.module.css";

export const PanelView = ({title, txtButton, handleOnChange, customClassButton, children, enableButton}: {title: string; txtButton: string; handleOnChange: any; customClassButton: string; children: JSX.Element; enableButton: boolean }) => {
  return (
    <div className={`${styles.panel_header}`}>
      <div className={`card bg-info text-white`}>
        <div className={styles.panel_boby}>
          <h4>{title}</h4>
          <>
            {enableButton ? (
              <SubmitButton
              text={txtButton}
              handleOnChange={handleOnChange}
              customClass=""
              customClassButton={customClassButton}
            />
            ) : (null)}
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
