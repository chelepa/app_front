import styles from './SubmitButton.module.css'

export const SubmitButton = ({text, handleOnChange}: { text: string, handleOnChange: any}) => {
    return (
      <div className={styles.form_control}>
        <button className={styles.btn} onClick={handleOnChange}>{text}</button>
      </div>
    );
}