import { GroupPermission } from '../../types/Group';
import styles from './SelectItemPermission.module.css';

export const SelectItemGroupPermission = ({options, handleOnChange, value}: {options: GroupPermission[], handleOnChange:any, value: number}) => {
    return (
        <div className={styles.form_control}>
          <select onChange={handleOnChange}>
            {options.map((options) => (
              <option value={options.id} key={options.id}>{options.name}</option>
            ))}
          </select>
        </div>
    );
}