import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PermissionGroupContext } from "../../../contexts/PermissionGroup/PermissionGroupContext";
import { Container } from "../../layout/Container";
import { ModalView } from "../../layout/ModalView";
import { Panel } from "../../layout/Panel";
import { ConfigFormSearch } from "../../pages_form/PermissionGroup_Form/ConfigFormSearch";
import { useLocation } from "react-router-dom";

export const HomePermissionGroup = () => {
    let msg = "";
    let type = "success";
    let state = {data: [], itemPerPage: 10, totalPages: 0, currentPage: 0, totalItens: 0, initIten: 0, lastIten: 0};
    const auth = useContext(PermissionGroupContext);
    const location = useLocation();
    const [removeLoading, setRemoveLoading] = useState(false);
    const [groupPermission, setGroupPermission] = useState(state);
    const [searchValue, setSearchValue] = useState("");
    const [searchParam, setSearchParam] = useState("description");
    const [showModalConfigSearch, setShowModalConfigSearch] = useState(false);

    const handleConfigClose = () => setShowModalConfigSearch(false);
    const handleConfigShow = () => setShowModalConfigSearch(true);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchParam(e.target.value);

    if (location.state) {
        msg = location.state.message;
        type = location.state.type;
      }

    useEffect(() => {
        functionGetAllGroupPermission(groupPermission.currentPage, groupPermission.itemPerPage, "", "");
    }, []);

    const handleSetItemPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        let itemPerPage = Number(event.target.value);
        setRemoveLoading(false);
        functionGetAllGroupPermission(0, itemPerPage, "", "");
    };

    const handlePagination = (event: any) => {
        setRemoveLoading(false);
        functionGetAllGroupPermission(event.id, groupPermission.itemPerPage, "", "");
    };

    const handleRefresh = () => {
        setGroupPermission((prev) => ({...prev, data: []}));    
        setRemoveLoading(false);
        functionGetAllGroupPermission(groupPermission.currentPage, groupPermission.itemPerPage, "", "");
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        let description = searchParam === "description" ? event.target.value : "";
        let name = searchParam === "name" ? event.target.value : "";
        functionGetAllGroupPermission(groupPermission.currentPage, groupPermission.itemPerPage, name, description); 
    };

    return(
        <Container customClass="" msg={msg} type={type} showLoading={!removeLoading}>
        <>
            <Panel
                state={groupPermission}
                search_value= {searchValue}
                handleOnChange_config={handleConfigShow}
                handleOnChange_pagination={handlePagination}
                handleOnChange_search={handleSearch}
                handleOnChange_refresh={handleRefresh}
                handleOnChange_itemPerPage={handleSetItemPerPage}
                navigate_edit={"/group/"}
                navigate_create={"/group/create"}
                module_title="Grupo de Permissão"
                header_table={["#", "Nome", "Descricão"]}
                table_index={["id", "name", "description"]}
            />

            <ModalView show={showModalConfigSearch} handleClose={handleConfigClose} title={"Configuração de Pesquisa"} handleOnChangeButton={handleConfigClose}>
                <ConfigFormSearch handleChange={handleChange} searchParam={searchParam}/>
            </ModalView>
        </>
        </Container>
    )

    function functionGetAllGroupPermission(page: number, size: number, name: string, description: string) {
        auth.getAllGroupPermission(page, size, name, description)
          .then((res) => {
            setGroupPermission((prev) => ({
                ...prev,
                data: res.data.group,
                itemPerPage: size,
                currentPage: res.data.page,
                totalPages: res.data.totalPages,
                totalItens: res.data.totalItem,
                initIten: res.data.group.length > 0 ? res.data.group[0].id : 0,
                lastIten: res.data.group.length > 0 ? res.data.group.length === size ? res.data.group[size - 1].id : res.data.group[res.data.group.length - 1].id : 0
              }));
              setRemoveLoading(true);
          })
          .catch((error) => {
            console.error(error);
        });
    }
}