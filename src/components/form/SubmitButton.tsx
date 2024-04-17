import styles from './SubmitButton.module.css'

export const SubmitButton = ({text, handleOnChange, customClass}: { text: string, handleOnChange: any, customClass: string}) => {
    return (
      <div className={`${styles.form_control} ${styles[customClass]}`}>
        <button className={styles.btn} onClick={handleOnChange}>{text}</button>
      </div>
    );
}