import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PermissionDTO, TPermissionList } from "../../../types/PermissionResponse";
import { SelectItemPermission } from "../../form/SelectItemPermission";
import { Container } from "../../layout/Container";
import { ModalView } from "../../layout/ModalView";
import { PanelBobyView } from "../../layout/PanelBobyView";
import { PanelViewPagination } from "../../layout/PanelViewPagination";
import { PermissionGroupContext } from "../../../contexts/PermissionGroup/PermissionGroupContext";
import { GroupPermissionRequest } from "../../../types/Group";
import { CardPermission } from "../../pages_form/permission_form/CardPermission";
import { PermissionGroupFormCreate } from "../../pages_form/PermissionGroup_Form/PermissionGroupFormCreate";
import { useNavigate } from "react-router-dom";

export const CreatePermissionGroup = () => {
    let pagination = ["Grupo de Permissao", "Permissoes"];
    let titleModal = "Adicionar Permissão";
    const navigate = useNavigate();
    const auth = useContext(PermissionGroupContext);
    const novosErros: Partial<GroupPermissionRequest> = {};
    const [navAction, setNavAction] = useState("Grupo de Permissao");
    const [showModalAddPermission, setShowModalAddPermission] = useState(false);
    const [permissionList, setPermissionList] = useState<TPermissionList>([]);
    const [permissionListAdd, setPermissionListAdd] = useState<TPermissionList>([]);
    const [addPermissionSelectedTemporaryList, setAddPermissionSelectedTemporaryList] = useState<PermissionDTO>({id: 0, permission: "", description: ""});
    const [groupPermissionRequest, setGroupPermissionRequest] = useState<GroupPermissionRequest>({name: "", description: "", permissionId: []});
    const [erros, setErros] = useState<Partial<GroupPermissionRequest>>({"name": "","description": ""});
    
    const closeModalAddPermission = () => setShowModalAddPermission(false);
    const openModalAddPermission = () => setShowModalAddPermission(true);

    const addPermissionGroup = () => {
        console.log("addPermissionGroup - Start - ");
        if (!groupPermissionRequest.name || !groupPermissionRequest.description || groupPermissionRequest.permissionId.length === 0) {
            if (!groupPermissionRequest.name) {
                novosErros.name = "Por favor, digite o Nome Do Grupo de Permissão";
            }
            if (!groupPermissionRequest.description) {
                novosErros.description = "Por favor, digite a Descricao Do Grupo de Permissão";
            }
            if (groupPermissionRequest.permissionId.length <= 0) {
                console.log("addPermissionGroup - Start - permissionId: " + groupPermissionRequest.permissionId.length);
            }
            setErros(novosErros);
          } else {
            setErros(novosErros);
            createGroupPermissionAPI(groupPermissionRequest);
          }
        console.log("addPermissionGroup - End - ");
    }
    
    const handleOnChangeNav = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("handleOnChangeNav - Start - " + event);
        let navEnable = String (event);
        setNavAction(navEnable);
        console.log("handleOnChangeNav - End - " + navEnable);
    };
    
    const addItemTemporaryList = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("addItemTemporaryList - Start - id: " + event.target.value);
        setAddPermissionSelectedTemporaryList(permissionList.filter(item => item.id === Number(event.target.value))[0]);
        console.log("addItemTemporaryList - End - ");
    };
    
    const addItemListBeforeSaving = () => {
        console.log("addItemListBeforeSaving - Start - ");
        const filtered = permissionListAdd.filter(item => item.permission.includes(addPermissionSelectedTemporaryList.permission));
        if (filtered.length === 0) {
            setPermissionListAdd(([...permissionListAdd, addPermissionSelectedTemporaryList]));
            setGroupPermissionRequest((prev) => ({...prev, permissionId: setPermissionId(permissionListAdd, addPermissionSelectedTemporaryList)}))
        }
        closeModalAddPermission();
        console.log("addItemListBeforeSaving - End - ");
    };

    const deletePermissionTemporaryList = (id: Number) => {
        console.log("deletePermissionTemporaryList - Start - id: " + id);
        setPermissionListAdd(permissionListAdd.filter(item => item.id !== id));
        setGroupPermissionRequest((prev) => ({...prev, permissionId: removePermissionId(groupPermissionRequest.permissionId, id)}))
        console.log("deletePermissionTemporaryList - End - ");
    };

    const addNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("addNameInput - Start - name: " + event.target.value);
        setGroupPermissionRequest((prev) => ({...prev, name: event.target.value}));
        console.log("addNameInput - End - name: " + event.target.value);
    };

    const AddDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("AddDescriptionInput - Start - description: " + event.target.value);
        setGroupPermissionRequest((prev) => ({...prev, description: event.target.value}));
        console.log("AddDescriptionInput - End - description: " + event.target.value);
    };

    useEffect(() => {
        getAllPermission();
    }, []);

    return(
        <Container customClass="start" msg="" type="" showLoading={false}>
            <>
                <PanelBobyView title="Modulo de Criação" redirect="/group" handleOnChangeDelete={null} handleOnChangeUpdateOrCreate={addPermissionGroup} saveOrDelete={false}>
                    <PanelViewPagination 
                            pagination={pagination} 
                            txtButton=""
                            handleOnChange={null}
                            handleOnChangeNav={handleOnChangeNav}
                            navEnable={navAction}
                            enableAdd={navAction === "Permissoes"} 
                            handleOnChangeAdd={openModalAddPermission}>
                            <>
                                {(() => {
                                    if (navAction === "Grupo de Permissao") {
                                        return <PermissionGroupFormCreate 
                                            groupDTO={groupPermissionRequest} 
                                            handleNameInput={addNameInput} 
                                            handleDescriptionInput={AddDescriptionInput} 
                                            erros={erros}/>
                                    } else {
                                        return <CardPermission permissionList={permissionListAdd} enabled={false} handleOnChange={deletePermissionTemporaryList}/>
                                    }
                                })()}
                            </>
                        </PanelViewPagination>
                </PanelBobyView>

                <ModalView show={showModalAddPermission} handleClose={closeModalAddPermission} title={titleModal} handleOnChangeButton={addItemListBeforeSaving}>
                    <SelectItemPermission options={permissionList} value={0} handleOnChange={addItemTemporaryList}/>
                </ModalView>
            </>
        </Container>
    )

    function getAllPermission() {
        auth.getAllPermission(0, 200, "", "")
        .then((res) => {
            setPermissionList(res.permission);
            setAddPermissionSelectedTemporaryList({id: res.permission[0].id, permission: res.permission[0].permission, description: res.permission[0].description});
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function createGroupPermissionAPI(groupPermissionRequest: GroupPermissionRequest) {
        auth.createGroupPermission(groupPermissionRequest)
        .then((res) => {
            console.log(res);
            navigate("/group", {state: { message: "Grupo de Permissão Adicionado com Sucesso", type: "success" }});
        })
        .catch((error) => {
            console.error(error);
            navigate("/group", {state: { message: "Erro ao Adicionar o novo Grupo de Permissão", type: "error" }});
        });
    }
}

function setPermissionId(permissionActive: TPermissionList, selectItem: PermissionDTO): Number[] {
    const newData = permissionActive.map((item) => {
        return item.id;
    });
    newData.push(selectItem.id)
    return newData;
};

function removePermissionId(permissionActive: Number[], id: Number): Number[] {
    var index = permissionActive.indexOf(id);
    if (index > -1) {
        permissionActive.splice(index, 1);
      }
    return permissionActive;
};