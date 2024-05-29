import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Container } from "../../layout/Container"
import { PanelBobyView } from "../../layout/PanelBobyView"
import { PanelViewPagination } from "../../layout/PanelViewPagination"
import { ModalView } from "../../layout/ModalView";
import { SelectItemGroupPermission } from "../../form/SelectItemGroupPermission";
import { GroupPermission, TGroupPermissionList } from "../../../types/Group";
import { CustomerContext } from "../../../contexts/Customer/CustomerContext";
import { CardGroupPermission } from "../../pages_form/PermissionGroup_Form/CardGroupPermission";
import { CustomerFormCreate } from "../../pages_form/Customer_Form/CustomerFormCreate";
import { CustomerRequest, PasswordRequest } from "../../../types/Customer";
import { PasswordForm } from '../../pages_form/Customer_Form/PasswordForm';

export const CreateCustomer = () => {
    let nav_user = "Usuario";
    let nav_permissionGroup = "Grupo de Permissão";
    let nav_password = "Credenciais";
    let listPagination = [nav_user, nav_password, nav_permissionGroup]

    const auth = useContext(CustomerContext);

    const [enableSaveButton, setEnableSaveButton] = useState(false);
    const [actionSelected, setActionSelected] = useState(nav_user);
    const [showModalAddGroupPermission, setShowModalAddGroupPermission] = useState(false);
    const [groupPermissionListSelected, setGroupPermissionListSelected] = useState<TGroupPermissionList>([]);
    const [groupPermissionListView , setGroupPermissionListView] = useState<TGroupPermissionList>([]);
    const [addGroupPermissionSelectedTemporaryList, setAddGroupPermissionSelectedTemporaryList] = useState<GroupPermission>({id: 0, name: "", description: "", permission: []});
    const [customer, setCustomer] = useState<CustomerRequest>({name: "", email: "", last_name: "", cell: "", password: "", group: []});
    const [password, setPassword] = useState<PasswordRequest>({password: "", checkPassword: ""});
    const [erros, setErros] = useState<Partial<any>>({name: "", email: "", last_name: "", cell: "", password: "", checkPassword: ""});
    
    const openModalAddGroupPermission = () => setShowModalAddGroupPermission(true);
    const closeModalAddGroupPermission = () => setShowModalAddGroupPermission(false);
    const addItemListBeforeSaving = () => functionAddItemListBeforeSaving(groupPermissionListView, addGroupPermissionSelectedTemporaryList, setGroupPermissionListView, setShowModalAddGroupPermission);
    const deleteGroupPermissionListView = (id: number) => deleteGroupPermissionList(setGroupPermissionListView, groupPermissionListView, id);
    const handleActionSelected = (event: ChangeEvent<HTMLInputElement>) => setActionSelected(String (event));
    const addItemTemporaryList = (event: ChangeEvent<HTMLInputElement>) => functionAddItemTemporaryList(setAddGroupPermissionSelectedTemporaryList, groupPermissionListSelected, event.target.value);
    const actionSetName = (event: ChangeEvent<HTMLInputElement>) => functionSetName(event.target.value, setCustomer, setErros, setEnableSaveButton, customer, password);
    const actionLastName = (event: ChangeEvent<HTMLInputElement>) => functionSetLastName(event.target.value, setCustomer, setErros, setEnableSaveButton, customer, password);
    const actionEmail = (event: ChangeEvent<HTMLInputElement>) => functionSetEmail(event.target.value, setCustomer, setErros, setEnableSaveButton, customer, password);
    const actionCell = (event: ChangeEvent<HTMLInputElement>) => functionSetCell(event.target.value, setCustomer, setErros, setEnableSaveButton, customer, password);
    const actionPassword = (event: ChangeEvent<HTMLInputElement>) => functionSetPassword(event.target.value, setPassword, setErros, setEnableSaveButton, customer, password);
    const actionCheckPassword = (event: ChangeEvent<HTMLInputElement>) => functionSetCheckPassword(event.target.value, setPassword, setErros, setEnableSaveButton, customer, password);
    const createCustomer = () => functionCreateCustomer(groupPermissionListView, password, customer);

    useEffect(() => {
        getAllPermissionGroup(auth, setGroupPermissionListSelected, setAddGroupPermissionSelectedTemporaryList);
    }, []);

    return(
        <Container customClass="start" msg={""} type={""} showLoading={false}>
            <>
                <PanelBobyView title="Modulo de Criacao" redirect="/customer" handleOnChangeDelete={null} handleOnChangeUpdateOrCreate={createCustomer} saveOrDelete={false} enableSave={!enableSaveButton}>
                    <PanelViewPagination 
                            pagination={listPagination} 
                            txtButton={""}
                            handleOnChange={null}
                            handleOnChangeNav={handleActionSelected} 
                            navEnable={actionSelected}
                            enableAdd={getEnableAdd(actionSelected, nav_permissionGroup)}
                            handleOnChangeAdd={openModalAddGroupPermission}>
                        <>
                            {(() => {
                                if (actionSelected === nav_user) {
                                  return <CustomerFormCreate customer={customer} actionName={actionSetName} actionLastName={actionLastName} actionEmail={actionEmail} actionCell={actionCell} readOnly={false} erros={erros}/>
                                } else if (actionSelected === nav_permissionGroup) {
                                  return <CardGroupPermission list={groupPermissionListView} enabled={false} handleOnChange={deleteGroupPermissionListView}/>
                                } else if (actionSelected === nav_password) {
                                  return <PasswordForm updatePassword={password} actionPassword={actionPassword} actionCheckPassword={actionCheckPassword} readOnly={false} erros={erros}/>
                                }
                            })()}
                        </>
                    </PanelViewPagination>
                </PanelBobyView>

                <ModalView show={showModalAddGroupPermission} handleClose={closeModalAddGroupPermission} title={"Adicionar Grupo de Permissão"} handleOnChangeButton={addItemListBeforeSaving}>
                    <SelectItemGroupPermission options={groupPermissionListSelected} value={0} handleOnChange={addItemTemporaryList}/>
                </ModalView>
            </>
        </Container>
    )
}

function getAllPermissionGroup(auth: CustomerContext, listSelected: any, temporaryList: any) {
    auth.getAllGroupPermission(0, 200, "", "")
    .then((res) => {
        listSelected(res.data.group)
        temporaryList(res.data.group[0])
    })
    .catch((error) => {
      console.error(error);
    });
}

function getEnableAdd(actionSelected: string, permissionGroup: string): boolean {
    return actionSelected === permissionGroup ? true : false;
}

function deleteGroupPermissionList(setGroupPermissionListView: any, groupPermissionListView: TGroupPermissionList, id: number) {
    setGroupPermissionListView(groupPermissionListView.filter(item => item.id !== id));
}

function functionAddItemListBeforeSaving(groupPermissionListView: TGroupPermissionList, addGroupPermissionSelectedTemporaryList: GroupPermission, setGroupPermissionListView: any, setShowModalAddGroupPermission: any) {
    const filtered = groupPermissionListView.filter(item => item.name.includes(addGroupPermissionSelectedTemporaryList.name));
    if (filtered.length === 0) {
        setGroupPermissionListView(([...groupPermissionListView, addGroupPermissionSelectedTemporaryList]));
    }
    setShowModalAddGroupPermission(false)
}

function functionAddItemTemporaryList(setAddGroupPermissionSelectedTemporaryList: any, groupPermissionListSelected: TGroupPermissionList, value: string) {
    setAddGroupPermissionSelectedTemporaryList(groupPermissionListSelected.filter(item => item.id === Number(value))[0]);
}

function functionSetName(value: string, setCustomer: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setCustomer((prev: any) => ({...prev, name: value }))
    let response = value === "" ? "Por favor, o campo Nome nao pode ser Vazio" : "";
    setEnableSaveButton(enableSaveButton(value, customer.last_name, customer.email, customer.cell, password.password, password.checkPassword))
    setErros((prev: any) => ({...prev, name: response}))
}

function functionSetLastName(value: string, setCustomer: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setCustomer((prev: any) => ({...prev, last_name: value }))
    let response = value === "" ? "Por favor, o campo Sobrenome nao pode ser Vazio" : "";
    setEnableSaveButton(enableSaveButton(customer.name, value, customer.email, customer.cell, password.password, password.checkPassword))
    setErros((prev: any) => ({...prev, last_name: response}))
}

function functionSetEmail(value: string, setCustomer: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setCustomer((prev: any) => ({...prev, email: value }))
    let response = value === "" ? "Por favor, o campo Email nao pode ser Vazio" : "";
    setEnableSaveButton(enableSaveButton(customer.name, customer.last_name, value, customer.cell, password.password, password.checkPassword))
    setErros((prev: any) => ({...prev, email: response}))
}

function functionSetCell(value: string, setCustomer: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setCustomer((prev: CustomerRequest) => ({...prev, cell: value }))
    setEnableSaveButton(enableSaveButton(customer.name, customer.last_name, customer.email, value, password.password, password.checkPassword))
    let response = value === "" ? "Por favor, o campo Email nao pode ser Vazio" : "";
    setErros((prev: any) => ({...prev, cell: response}))
}

function functionSetPassword(value: string, setPassword: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setPassword((prev: any) => ({...prev, password: value }))
    setEnableSaveButton(enableSaveButton(customer.name, customer.last_name, customer.email, customer.cell, value, password.checkPassword))
    let response = value === "" ? "Por favor, o campo Password nao pode ser Vazio" : "";
    setErros((prev: any) => ({...prev, password: response}))
}

function functionSetCheckPassword(value: string, setPassword: any, setErros: any, setEnableSaveButton: any, customer: CustomerRequest, password: PasswordRequest) {
    setPassword((prev: any) => ({...prev, checkPassword: value }))
    setEnableSaveButton(enableSaveButton(customer.name, customer.last_name, customer.email, customer.cell, password.password, value))
    let response = value === "" ? "Por favor, o campo Confirme Password nao pode ser Vazio" : password.password !== value ? "Credenciais Nao Correspondem" : "";
    setErros((prev: any) => ({...prev, checkPassword: response}))
}

function enableSaveButton(name: String, last_name: String, email: String, cell: String, password: String, checkPassword: String): boolean {
    return (name !== "" && last_name !== "" && email !== "" && cell !== "" && password !== "" && checkPassword !== "" && password === checkPassword) ? true : false;
}

function getGroupId(groupPermissionListView: TGroupPermissionList): number[] {
    console.log(groupPermissionListView)

    const newData = groupPermissionListView.map((item) => {
        return item.id;
    });
    return newData;
}

function functionCreateCustomer(groupPermissionListView: TGroupPermissionList, password: PasswordRequest, customer: CustomerRequest) {
    customer.group = getGroupId(groupPermissionListView);
    customer.password = password.password;
    console.log(customer);
}