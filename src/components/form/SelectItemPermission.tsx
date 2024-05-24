import { PermissionDTO } from '../../types/PermissionResponse';
import styles from './SelectItemPermission.module.css'

export const SelectItemPermission = ({options, handleOnChange, value}: {options: PermissionDTO[], handleOnChange:any, value: number}) => {
    return (
        <div className={styles.form_control}>
          <select onChange={handleOnChange}>
            {options.map((options) => (
              <option value={options.id} key={options.id}>{options.permission} - {options.description}</option>
            ))}
          </select>
        </div>
    );
}