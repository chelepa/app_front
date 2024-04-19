import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { Panel } from "../../layout/Panel";


export const Permission = () => {
  let msg = "";
  let statePermission = {data: [], itemPerPage: 10, totalPages: 0, currentPage: 0, permission: "", description: "", totalItens: 0, initIten: 0, lastIten: 0};
  const auth = useContext(PermissionContext);
  const location = useLocation();
  const [removeLoading, setRemoveLoading] = useState(false);
  const [permissionState, setStatePermission] = useState(statePermission);
  const [searchPermissionValue, setSearchPermissionValue] = useState("");
  const [searchDescriptionValue, setSearchDescriptionValue] = useState("");

  if (location.state) {
    msg = location.state.message;
  }

  useEffect(() => {
    location.state = "";
    setTimeout(() => {
      functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, permissionState.permission, permissionState.description);
    }, 3000);
  }, []);

  const handleSearch = (teste: any) => {
    setSearchPermissionValue(teste.target.value);
    functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, searchPermissionValue, searchDescriptionValue);
    console.log(teste.target.value)
  };

  const handleSetItemPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    let itemPerPage = Number(event.target.value);
    setRemoveLoading(false);
    functionGetPermission(0, itemPerPage, permissionState.permission, permissionState.description);
  };

  const handlePagination = (event: any) => {
    setRemoveLoading(false);
    functionGetPermission(event.id, permissionState.itemPerPage, permissionState.permission, permissionState.description);
  };

  const handleRefresh = () => {
    setStatePermission((prev) => ({
      ...prev,
      data: [],
      itemPerPage: permissionState.itemPerPage,
      currentPage: permissionState.currentPage,
      totalPages: permissionState.totalPages,
      totalItens: permissionState.totalItens,
      initIten: 0,
      lastIten: 0
    }));    
    setRemoveLoading(false);
    setTimeout(() => {
      functionGetPermission(permissionState.currentPage, permissionState.itemPerPage, permissionState.permission, permissionState.description);
    }, 3000);
  }

  return (
    <Container customClass="start" msg="chelepa" type="success">
      <Panel
        state = {permissionState}
        loading = {removeLoading}
        search_value = {searchPermissionValue}
        handleOnChange_pagination = {handlePagination}
        handleOnChange_search = {handleSearch}
        handleOnChange_refresh = {handleRefresh}
        handleOnChange_itemPerPage = {handleSetItemPerPage}
        navigate_edit = {"/permission/"}
        navigate_create = {"/permission/create"}
        module_title = "Permissões"
        header_table = {["#", "Permissão", "Descricão"]}
        table_index = {["id", "permission", "description"]}
      />
    </Container>
  );

  function functionGetPermission(page: number, size: number, permission: string, description: string) {
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
  }
}