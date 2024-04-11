import styles from './Imput.module.css'

export const Input = ({type, text, name, placeholder, handleOnChange, value}: { type: string, text: string, name: string, placeholder: string, handleOnChange: any, value: string}) => {
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
        />
      </div>
    );
}