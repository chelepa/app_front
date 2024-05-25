import styles from './SubmitButton.module.css'

export const SubmitButton = ({text, handleOnChange, customClass, customClassButton, enable}: { text: string, handleOnChange: any, customClass: string, customClassButton:string, enable:boolean}) => {
    return (
      <div className={`${styles.form_control} ${styles[customClass]}`}>
        <button className={`${styles.btn} ${styles[customClassButton]}`} onClick={handleOnChange} disabled={enable}>{text}</button>
      </div>
    );
}