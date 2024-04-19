import { Pagination } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { HiRefresh } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LinkIcon } from "../form/LinkIcon";
import { SearchInput } from "../form/SearchInput";
import { Loading } from "./Loading";
import styles from "./Panel.module.css";
import { SelectItemPerPage } from "../form/SelectItemPerPage";
import { GrConfigure } from "react-icons/gr";

export const Panel = ({
  state,
  loading,
  handleOnChange_pagination,
  handleOnChange_search,
  handleOnChange_refresh,
  handleOnChange_itemPerPage,
  navigate_edit,
  navigate_create,
  module_title,
  header_table,
  table_index,
}: {
  state: any;
  loading: boolean;
  handleOnChange_pagination: any;
  handleOnChange_search: any;
  handleOnChange_refresh: any;
  handleOnChange_itemPerPage: any;
  navigate_edit: any;
  navigate_create: any;
  module_title: string;
  header_table: string[];
  table_index: string[];
}) => {
  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <div className={styles.title_container}>
          <h2>{module_title}</h2>
          <div className={styles.itens}>
            <LinkIcon
              to={navigate_create}
              icon={<IoIosAddCircleOutline size={40} />}
              customClass={"btn_color_white"}
            />
          </div>
        </div>
      </div>
      <div className="card bg-light text-dark">
        <div className={styles.search_container}>
          <div>
            <SelectItemPerPage
              text="Itens Por Pagina"
              name=""
              options={[10, 25, 50, 100]}
              handleOnChange={handleOnChange_itemPerPage}
              value={state.itemPerPage}
            />
          </div>
          <div className={styles.refreshAndAdd}>
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
            <div className={styles.itens}>
              <LinkIcon
                to={navigate_create}
                icon={<IoIosAddCircleOutline size={30} />}
                customClass={""}
              />
            </div>
            <div className={styles.itens}>
              <HiRefresh size={30} onClick={handleOnChange_refresh} />
            </div>
            <div className={styles.itens}>
              <GrConfigure size={30} />
            </div>
          </div>
        </div>
        {!loading && <Loading />}
        <div className={styles.table_overflow}>
          <table className={`${styles.table} table`}>
            <thead>
              <tr className={styles.table_thead_tr}>
                {header_table.map((item) => (
                  <th>{item}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.data.length > 0 &&
                state.data.map((project: any) => (
                  <tr>
                    {table_index.map((indx) => (
                      <td> {project[indx]}</td>
                    ))}
                    <td>
                      <div className={styles.editAndDelete}>
                        <div>
                          <LinkIcon
                            to={`${navigate_edit}${project.id}`}
                            icon={<GrEdit size={20} />}
                            customClass={""}
                          />
                        </div>
                        <div>
                          <MdOutlineDeleteOutline size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination_content}>
          <div>
            <p className={styles.pagination_p}>
              Mostrando de {state.initIten} ate {state.lastIten} de{" "}
              {state.totalItens} registros
            </p>
          </div>
          <div>
            <Pagination>
              <Pagination.Prev />
              {Array.from(Array(state.totalPages), (_, index) => {
                return (
                  <Pagination.Item
                    id={`${index}`}
                    active={index === state.currentPage}
                    onClick={(e) => handleOnChange_pagination(e.target)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
