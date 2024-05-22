import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Container } from "../../layout/Container"
import { Panel } from "../../layout/Panel"
import { ModalView } from "../../layout/ModalView";
import { ConfigFormSearch } from "../../pages_form/Customer_Form/ConfigFormSearch";
import { useLocation } from "react-router-dom";
import { CustomerContext } from "../../../contexts/Customer/CustomerContext";

export const HomeCustomer = () => {
    let state = {data: [], itemPerPage: 10, totalPages: 0, currentPage: 0, totalItens: 0, initIten: 0, lastIten: 0};
    let searchPayload = {param: "name", value: ""};
    let titleModalConfig = "Configuração de Pesquisa";
    let actionMsg = {msg: "", type: ""}; 
    
    const auth = useContext(CustomerContext);
    const location = useLocation()
    const [customer, setCustomer] = useState(state);
    const [search, setSearch] = useState(searchPayload);
    const [modalConfigSearch, setModalConfigSearch] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    const ModalConfigClose = () => setModalConfigSearch(false);
    const modalConfigShow = () => setModalConfigSearch(true);
    const setParamSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch((prev) => ({...prev, param: event.target.value}));

    if (location.state) {
        actionMsg.msg = location.state.message;
        actionMsg.type = location.state.type;
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch((prev) => ({...prev, value: event.target.value}));
        functionGetAllCustomer(customer.currentPage, customer.itemPerPage, getSearchValue("name", search), getSearchValue("lastName", search), getSearchValue("email", search)); 
    }

    const handleRefresh = () => {
        setCustomer((prev) => ({...prev, data: []}));
        setRemoveLoading(false);
        functionGetAllCustomer(customer.currentPage, customer.itemPerPage, "", "", "");
    }

    const handlePagination = (event: any) => {
        setRemoveLoading(false);
        functionGetAllCustomer(event.id, customer.itemPerPage, "", "", "");
    };

    const handleSetItemPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        let itemPerPage = Number(event.target.value);
        setRemoveLoading(false);
        functionGetAllCustomer(0, itemPerPage, "", "", "");
    };

    useEffect(() => {
        functionGetAllCustomer(customer.currentPage, customer.itemPerPage, "", "", "");
    }, []);

    return(
        <Container customClass="" msg={actionMsg.msg} type={actionMsg.type} showLoading={!removeLoading}>
            <>
                <Panel
                    state={customer}
                    search_value= {search.value}
                    handleOnChange_config={modalConfigShow}
                    handleOnChange_pagination={handlePagination}
                    handleOnChange_search={handleSearch}
                    handleOnChange_refresh={handleRefresh}
                    handleOnChange_itemPerPage={handleSetItemPerPage}
                    navigate_edit={"/customer/"}
                    navigate_create={"/customer/create"}
                    module_title="Usuarios"
                    header_table={["#", "Nome", "Sobrenome", "E-Mail", "Telefone"]}
                    table_index={["id", "name", "last_name", "email", "cell"]}
                />

                <ModalView show={modalConfigSearch} handleClose={ModalConfigClose} title={titleModalConfig} handleOnChangeButton={ModalConfigClose}>
                    <ConfigFormSearch handleChange={setParamSearch} searchParam={search.param}/>
                </ModalView>
            </>
        </Container>
    )

    function functionGetAllCustomer(page: number, size: number, name: string, lastName: string, email: string) {
        auth.getAllCustomer(page, size, name, lastName, email)
        .then((res) => {
            setCustomer((prev) => ({
                ...prev,
                data: res.data.customer,
                itemPerPage: size,
                currentPage: res.data.page,
                totalPages: res.data.totalPages,
                totalItens: res.data.totalItem,
                initIten: res.data.customer.length > 0 ? res.data.customer[0].id : 0,
                lastIten: res.data.customer.length > 0 ? res.data.customer.length === size ? res.data.customer[size - 1].id : res.data.customer[res.data.customer.length - 1].id : 0
              }));
              setRemoveLoading(true);
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

function getSearchValue(request: String, search: { param: string; value: string; }): string {
    return search.param === request ? search.value : "";
};