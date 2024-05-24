import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Container } from "../../layout/Container"
import { PanelBobyView } from "../../layout/PanelBobyView"
import { PanelViewPagination } from "../../layout/PanelViewPagination"
import { ModalView } from "../../layout/ModalView";
import { CustomerContext } from "../../../contexts/Customer/CustomerContext";
import { GroupPermission, TGroupPermissionList } from "../../../types/Group";
import { SelectItemGroupPermission } from "../../form/SelectItemGroupPermission";
import { CardGroupPermission } from "../../pages_form/PermissionGroup_Form/CardGroupPermission";
import { useParams } from "react-router-dom";
import { CustomerFormUpdate } from "../../pages_form/Customer_Form/CustomerFormUpdate";
import { CustomerDTO, CustomerRequest, PasswordRequest } from '../../../types/Customer';
import { PasswordForm } from "../../pages_form/Customer_Form/PasswordForm";

export const UpdateCustomer = () => {
    let user = "Usuario";
    let permissionGroup = "Grupo de Permissão";
    let password = "Credenciais";
    
    const { id } = useParams();
    const auth = useContext(CustomerContext);
    const [flagSave, setFlagSave] = useState(true);
    const [actionSelected, setActionSelected] = useState(user);
    const [showModalAddGroupPermission, setShowModalAddGroupPermission] = useState(false);
    const [groupPermissionListSelected, setGroupPermissionListSelected] = useState<TGroupPermissionList>([]);
    const [groupPermissionListView , setGroupPermissionListView] = useState<TGroupPermissionList>([]);
    const [addGroupPermissionSelectedTemporaryList, setAddGroupPermissionSelectedTemporaryList] = useState<GroupPermission>({id: 0, name: "", description: "", permission: []});
    const [customer, setCustomer] = useState<CustomerDTO>({id: 0, name: "", email: "", last_name: "", cell: "", password: "", group: []});
    const [customerUpdate, setCustomerUpdate] = useState<CustomerRequest>({id: 0, name: "", email: "", last_name: "", cell: "", password: null, group: []});
    const [updatePassword, setUpdatePassword] = useState<PasswordRequest>({password: "", checkPassword: ""});

    const handleActionSelected = (event: ChangeEvent<HTMLInputElement>) => setActionSelected(String (event));
    const handleActionDelete = () => setFlagSave(!flagSave);
    const closeModalAddGroupPermission = () => setShowModalAddGroupPermission(false);
    const openModalAddGroupPermission = () => setShowModalAddGroupPermission(true);
    const actionSetName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value, setCustomerUpdate, setCustomer);
    const actionSetLastName = (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value, setCustomerUpdate, setCustomer);
    const actionSetEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value, setCustomerUpdate, setCustomer);
    const actionSetCell = (event: ChangeEvent<HTMLInputElement>) => setCell(event.target.value, setCustomerUpdate, setCustomer);
    const actionPassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value, setUpdatePassword);
    const actionCheckPassword = (event: ChangeEvent<HTMLInputElement>) => setCheckPassword(event.target.value, setUpdatePassword);

    const updateCustomer = () => {
        console.log("UpdateCustomer - Start - ");
        console.log(customerUpdate);
        console.log("UpdateCustomer - End - ");
    };

    const addItemListBeforeSaving = () => {
        console.log("addItemListBeforeSaving - Start - ");
        const filtered = groupPermissionListView.filter(item => item.name.includes(addGroupPermissionSelectedTemporaryList.name));
        if (filtered.length === 0) {
            setGroupPermissionListView(([...groupPermissionListView, addGroupPermissionSelectedTemporaryList]));
            setCustomerUpdate((prev) => ({...prev, group: getGroupUpdate(groupPermissionListView, addGroupPermissionSelectedTemporaryList)}))
        }
        closeModalAddGroupPermission();
        console.log("addItemListBeforeSaving - End - ");
    };

    const addItemTemporaryList = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("addItemTemporaryList - Start - id: " + event.target.value);
        setAddGroupPermissionSelectedTemporaryList(groupPermissionListSelected.filter(item => item.id === Number(event.target.value))[0]);
        console.log("addItemTemporaryList - End - ");
    };

    const deleteGroupPermissionListView = (id: number) => {
        console.log("deleteGroupPermissionListView - Start - id: " + id);
        setGroupPermissionListView(groupPermissionListView.filter(item => item.id !== id));
        setCustomerUpdate((prev) => ({...prev, group: deleteGroupById(customerUpdate.group, id)}))
        console.log("deleteGroupPermissionListView - End - ");
    };

    useEffect(() => {
        getCustomerById(String (id), auth, setCustomer, setGroupPermissionListView, setCustomerUpdate)
        getAllPermissionGroup(auth, setGroupPermissionListSelected, setAddGroupPermissionSelectedTemporaryList);
    }, []);

    return(
        <Container customClass="start" msg={""} type={""} showLoading={false}>
            <>
                <PanelBobyView title="Modulo de Edição" redirect="/customer" handleOnChangeDelete={null} handleOnChangeUpdateOrCreate={updateCustomer} saveOrDelete={flagSave}>
                    <PanelViewPagination 
                        pagination={getListPagination(user, password, permissionGroup)} 
                        txtButton={getTxtButton(flagSave)}
                        handleOnChange={handleActionDelete} 
                        handleOnChangeNav={handleActionSelected} 
                        navEnable={actionSelected} 
                        enableAdd={getEnableAdd(!flagSave, actionSelected, permissionGroup)}
                        handleOnChangeAdd={openModalAddGroupPermission}>
                        <>
                            {(() => {
                                if (actionSelected === user) {
                                  return (
                                    <CustomerFormUpdate
                                      customer={customer}
                                      actionName={actionSetName}
                                      actionLastName={actionSetLastName}
                                      actionEmail={actionSetEmail}
                                      actionCell={actionSetCell}
                                      readOnly={flagSave}
                                    />
                                  );
                                } else if (actionSelected === permissionGroup) {
                                  return (
                                    <CardGroupPermission
                                      list={groupPermissionListView}
                                      enabled={flagSave}
                                      handleOnChange={
                                        deleteGroupPermissionListView
                                      }
                                    />
                                  );
                                } else if (actionSelected === password) {
                                  return (
                                    <PasswordForm
                                      updatePassword={updatePassword}
                                      actionPassword={actionPassword}
                                      actionCheckPassword={actionCheckPassword}
                                      readOnly={flagSave}
                                    />
                                  );
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

function getCustomerById(id: string, auth: CustomerContext, setCustomer: any, setGroupPermissionListView: any, setCustomerUpdate: any) {
    auth.getCustomerById(id)
    .then((res) => {
        let response = res.data;
        setCustomer(res.data)
        setGroupPermissionListView(response.group)
        setCustomerUpdate((prev: any) => (
            {
                ...prev,
                id: response.id,
                name: response.name, 
                email: response.email, 
                last_name: response.last_name, 
                cell: response.cell,
                group: getGroupInit(response.group)
            }));
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllPermissionGroup(auth: CustomerContext, setGroupPermissionListSelected: any, setAddGroupPermissionSelectedTemporaryList: any) {
    auth.getAllGroupPermission(0, 200, "", "")
    .then((res) => {
        setGroupPermissionListSelected(res.data.group)
        setAddGroupPermissionSelectedTemporaryList({
            id: res.data.group[0].id, 
            name: res.data.group[0].permission, 
            description: res.data.group[0].description,
            permission : res.data.group[0].permission
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

function getListPagination(var1: string, var2: string, var3: string): any[] {
    return [var1, var2, var3];
};

function getTxtButton(var1: boolean): string {
    return var1 ? "Editar" : "Fechar";
}

function getEnableAdd(var1: boolean, actionSelected: string, permissionGroup: string): boolean {
    return var1 && actionSelected === permissionGroup ? true : false;
}

function getGroupInit(group: GroupPermission[]): number[] {
    const newData = group.map((item) => {
        return item.id;
    });
    return newData;
};

function getGroupUpdate(groupPermissionListView: TGroupPermissionList, addGroupPermissionSelectedTemporaryList: GroupPermission): number[] {
    const newData = groupPermissionListView.map((item) => {
        return item.id;
    });
    newData.push(addGroupPermissionSelectedTemporaryList.id)
    return newData;
}

function deleteGroupById(group: number[], id: number): number[] {
    var index = group.indexOf(id);
    if (index > -1) {
        group.splice(index, 1);
    }
    return group;
}

function setName(name: string, setCustomerUpdate: any, setCustomer: any) {
    setCustomer((prev: any) => ({...prev, name: name }))
    setCustomerUpdate((prev: any) => ({...prev, name: name }))
}

function setLastName(lastName: string, setCustomerUpdate: any, setCustomer: any) {
    setCustomer((prev: any) => ({...prev, last_name: lastName }))
    setCustomerUpdate((prev: any) => ({...prev, last_name: lastName }))
}

function setEmail(value: string, setCustomerUpdate: any, setCustomer: any) {
    setCustomer((prev: any) => ({...prev, email: value }))
    setCustomerUpdate((prev: any) => ({...prev, email: value }))
}

function setCell(value: string, setCustomerUpdate: any, setCustomer: any) {
    setCustomer((prev: any) => ({...prev, cell: value }))
    setCustomerUpdate((prev: any) => ({...prev, cell: value }))
}

function setPassword(value: string, setUpdatePassword: any) {
    setUpdatePassword((prev: any) => ({...prev, password: value }))
}

function setCheckPassword(value: string, setUpdatePassword: any) {
    setUpdatePassword((prev: any) => ({...prev, checkPassword: value }))
}