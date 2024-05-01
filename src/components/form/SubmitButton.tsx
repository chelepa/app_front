import styles from './SubmitButton.module.css'

export const SubmitButton = ({text, handleOnChange, customClass, customClassButton}: { text: string, handleOnChange: any, customClass: string, customClassButton:string}) => {
    return (
      <div className={`${styles.form_control} ${styles[customClass]}`}>
        <button className={`${styles.btn} ${styles[customClassButton]}`} onClick={handleOnChange}>{text}</button>
      </div>
    );
}