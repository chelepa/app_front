import { IoIosAddCircleOutline } from 'react-icons/io';
import { SearchInput } from '../form/SearchInput';
import styles from './Panel.module.css'
import { HiRefresh } from 'react-icons/hi';
import { GrEdit } from 'react-icons/gr';
import { LinkIcon } from '../form/LinkIcon';
import { Loading } from './Loading';

export const Panel = ({
    objectList,
    moduleTitle,
    handleOnChange_search,
    tr_table,
    objectIndx,
    handleOnChangeEdit,
    handleOnChangeCreate,
    loading
  }: {
    loading: boolean;
    handleOnChangeEdit: any;
    handleOnChangeCreate: any;
    objectIndx: string[];
    tr_table: string[];
    objectList: any[];
    moduleTitle: string;
    handleOnChange_search: any;
  }) => {
  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <div className={styles.title_container}>
          <h2>{moduleTitle}</h2>
          <div className={styles.itens}>
            <LinkIcon to={handleOnChangeCreate} icon={<IoIosAddCircleOutline size={40} />} customClass={'btn_color_white'}/>
          </div>
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
            <LinkIcon to={handleOnChangeCreate} icon={<IoIosAddCircleOutline size={30} />} customClass={''}/>
            </div>
            <div className={styles.itens}>
              <HiRefresh size={30}/>
            </div>
          </div>
        </div>
        {!loading && <Loading/>}
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
                        <LinkIcon to={`${handleOnChangeEdit}${project.id}`} icon={<GrEdit size={20}/>} customClass={''}/>
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
};