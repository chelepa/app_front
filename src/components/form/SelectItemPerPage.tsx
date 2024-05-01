import styles from './SelectItemPerPage.module.css'

export const SelectItemPerPage = ({text, name, options, handleOnChange, value}: {text: string, name: string, options: any[], handleOnChange: any, value: string}) => {
    return (
      <div className={styles.form_control}>
        <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
          {options.map((options) => (
            <option value={options} key={options}>{options}</option>
          ))}
        </select>
        <label htmlFor={name}>{text}</label>
      </div>
    );
}