import { PermissionDTO } from '../../types/PermissionResponse';
import styles from './SelectItem.module.css'

export const SelectItem = ({options, handleOnChange, value}: {options: PermissionDTO[], handleOnChange:any, value: number}) => {
    return (
        <div className={styles.form_control}>
          <select onChange={handleOnChange} value={value || ""}>
            {options.map((options) => (
              <option value={options.id} key={options.id}>{options.permission} - {options.description}</option>
            ))}
          </select>
        </div>
    );
}