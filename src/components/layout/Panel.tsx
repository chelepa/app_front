import { IoIosAddCircleOutline } from 'react-icons/io';
import { LinkButton } from '../form/LinkButton';
import { SearchInput } from '../form/SearchInput';
import styles from './Panel.module.css'
import { HiRefresh } from 'react-icons/hi';
import { GrEdit } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { SubmitButton } from '../form/SubmitButton';

export const Panel = ({ objectList, moduleTitle, txt_linkButton, to_linkButton, handleOnChange_search, tr_table, objectIndx, handleOnChange_edit}: {handleOnChange_edit: any, objectIndx: string[], tr_table: string[], objectList: any[], moduleTitle: string, txt_linkButton: string, to_linkButton: string, handleOnChange_search: any }) => {
    return (
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className={styles.title_container}>
            <h2>{moduleTitle}</h2>
            <LinkButton to={to_linkButton} text={txt_linkButton} />
          </div>
        </div>
        <div className="card bg-light text-dark">
          <div className={styles.search_container}>
            <div>
              <SearchInput
                type="text"
                text="Search"
                name="myInput"
                placeholder="Search"
                handleOnChange={handleOnChange_search}
                value="Search"
              />
            </div>
            <div className={styles.refreshAndAdd}>
              <div className={styles.itens}>
                <IoIosAddCircleOutline />
              </div>
              <div className={styles.itens}>
                <HiRefresh />
              </div>
            </div>
          </div>
           <table className="table">
            <thead>
              <tr>
                {tr_table.map((item) => (
                  <th>{item}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {objectList.length > 0 &&
                objectList.map((project) => (
                  <tr>
                    {objectIndx.map((indx) => (
                      <td> {project[indx]}</td>
                    ))}
                    <td>
                      <div className={styles.editAndDelete}>
                        <div>
                          <GrEdit onClick={() => {
                            handleOnChange_edit(project)
                          }}/>
                        </div>
                        <div>
                          <MdDelete />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}