import styles from './Imput.module.css'

export const Input = ({type, text, name, placeholder, handleOnChange, value, customClass, readOnly, erros}: {erros: any, type: string, text: string, name: string, placeholder: string, handleOnChange: any, value: string, customClass:string, readOnly:boolean}) => {
    return (
      <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input 
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          readOnly={readOnly}
          className={`${styles.form_control_input_one} ${styles[customClass]}`}/>
          {erros && <span>{erros}</span>}
      </div>
    );
}