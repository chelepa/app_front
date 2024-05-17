import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { ModalView } from "../../layout/ModalView";
import { Panel } from "../../layout/Panel";
import { ConfigFormSearch } from "../../pages_form/permission_form/ConfigFormSearch";

export const Permission = () => {
  let msg = "";
  let type = "success";
  let statePermission = {data: [], itemPerPage: 10, totalPages: 0, currentPage: 0, totalItens: 0, initIten: 0, lastIten: 0};
  const auth = useContext(PermissionContext);
  const location = useLocation();
  const [removeLoading, setRemoveLoading] = useState(false);
  const [permissionState, setStatePermission] = useState(statePermission);
  const [searchValue, setSearchValue] = useState("");
  const [showModalConfigSearch, setShowModalConfigSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("description");

  const handleConfigClose = () => setShowModalConfigSearch(false);
  const handleConfigShow = () => setShowModalConfigSearch(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchParam(e.target.value);

  if (location.state) {
    msg = location.state.message;
    type = location.state.type;
  }

  useEffect(() => {
    location.state = "";
    functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, "", "");
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    let description = searchParam === "description" ? event.target.value : "";
    let permission = searchParam === "permission" ? event.target.value : "";
    functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, permission, description); 
  };

  const handleSetItemPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    let itemPerPage = Number(event.target.value);
    setRemoveLoading(false);
    functionGetPermission(0, itemPerPage, "", "");
  };

  const handlePagination = (event: any) => {
    setRemoveLoading(false);
    functionGetPermission(event.id, permissionState.itemPerPage, "", "");
  };

  const handleRefresh = () => {
    setStatePermission((prev) => ({...prev, data: []}));    
    setRemoveLoading(false);
    functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, "", "");
  }

  return (
    <Container customClass="" msg={msg} type={type} showLoading={!removeLoading}>
      <div className="Container Permission">
        <Panel
          state={permissionState}
          search_value={searchValue}
          handleOnChange_config={handleConfigShow}
          handleOnChange_pagination={handlePagination}
          handleOnChange_search={handleSearch}
          handleOnChange_refresh={handleRefresh}
          handleOnChange_itemPerPage={handleSetItemPerPage}
          navigate_edit={"/permission/"}
          navigate_create={"/permission/create"}
          module_title="Permissões"
          header_table={["#", "Permissão", "Descricão"]}
          table_index={["id", "permission", "description"]}
        />

        <ModalView show={showModalConfigSearch} handleClose={handleConfigClose} title={"Configuração de Pesquisa"} handleOnChangeButton={handleConfigClose}>
          <ConfigFormSearch handleChange={handleChange} searchParam={searchParam}/>
        </ModalView>

      </div>
    </Container>
  );

  function functionGetPermission(page: number, size: number, permission: string, description: string) {
    setTimeout(() => {
      auth.getAllPermission(page, size, permission, description)
      .then((res) => {
        setStatePermission((prev) => ({
          ...prev,
          data: res.permission,
          itemPerPage: size,
          currentPage: res.page,
          totalPages: res.totalPages,
          totalItens: res.totalItem,
          initIten: res.permission.length > 0 ? res.permission[0].id : 0,
          lastIten: res.permission.length > 0 ? res.permission.length === size ? res.permission[size - 1].id : res.permission[res.permission.length - 1].id : 0
        }));
        setRemoveLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
    }, 2000);
  }
}