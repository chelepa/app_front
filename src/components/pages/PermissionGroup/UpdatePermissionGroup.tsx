import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Container } from "../../layout/Container";
import { PanelBobyView } from "../../layout/PanelBobyView";
import { GroupPermission, GroupPermissionRequest } from "../../../types/Group";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionGroupContext } from "../../../contexts/PermissionGroup/PermissionGroupContext";
import { PanelViewPagination } from "../../layout/PanelViewPagination";
import { PermissionGroupFormUpdate } from "../../pages_form/PermissionGroup_Form/PermissionGroupFormUpdate";
import { Permission } from "../../pages_form/PermissionGroup_Form/Permission";
import { ModalView } from "../../layout/ModalView";
import { SelectItem } from "../../form/SelectItem";
import { PermissionDTO, TPermissionList } from "../../../types/PermissionResponse";

export const UpdatePermissionGroup = () => {
    let msg = "";
    let messageType = "";
    const navigate = useNavigate();
    const auth = useContext(PermissionGroupContext);
    const { id } = useParams();
    const [showLoading, setShowLoading] = useState(true);
    const [showPermissionFrom, setShowPermissionFrom] = useState(true);
    const [groupPermission, setGroupPermission] = useState<GroupPermission>({id: 0, name: "", description: "", permission: [{id: 0, permission: "", description: ""}]});
    const [groupPermissionRequest, setGroupPermissionRequest] = useState<GroupPermissionRequest>({name: "", description: "", permissionId: []});
    const [navAction, setNavAction] = useState("Grupo de Permissao");
    const [erros, setErros] = useState<Partial<GroupPermissionRequest>>({"name": "","description": ""});
    const novosErros: Partial<GroupPermissionRequest> = {};

    const [permission, setPermission] = useState<TPermissionList>([]);
    const [permissionActive, setPermissionActive] = useState<TPermissionList>([]);

    const [showModal, setShowModal] = useState(false);
    const handleConfigClose = () => setShowModal(false);

    const [selectItem, setSelectItem] = useState<PermissionDTO>({id: 0, permission: "", description: ""});

    const handleConfigShow = () => {        
        setShowModal(true);
    }

    const togglePermissionForm = () => {
        setShowPermissionFrom(!showPermissionFrom);
    };

    const handleOnChangeNav = (event: ChangeEvent<HTMLInputElement>) => {
        let navEnable = String (event);
        setNavAction(navEnable);
    };

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupPermission((prev) => ({...prev, name: event.target.value}));
        setGroupPermissionRequest((prev) => ({...prev, name: event.target.value}));
    };

    const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupPermission((prev) => ({...prev, description: event.target.value}));
        setGroupPermissionRequest((prev) => ({...prev, description: event.target.value}));
    };

    const updateGroupPermission = () => {
        if (!groupPermission.name || !groupPermission.description) {
            if (!groupPermission.name) {
              novosErros.name = "Por favor, digite o nome";
            }
            if (!groupPermission.description) {
              novosErros.description = "Por favor, digite a Descricao";
            }
            setErros(novosErros);
          } else {
            setErros(novosErros);
            updateGroupPermissionAPI(groupPermission.id, groupPermissionRequest);
          }
    };

    const deleteGroupPermission = () => {
        console.log("deletando o grupo de permissao id: " + groupPermission.id)
        deleteGroupPermissionAPI(groupPermission.id)
    };

    const handleOnChangeSelectItem = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectItem(permission.filter(item => item.id === Number(event.target.value))[0])
    }

    const AddItem = () => {
        const filtered = permissionActive.filter(user => user.permission.includes(selectItem.permission));
        if (filtered.length === 0) {
            setPermissionActive(([...permissionActive, selectItem]));
            setGroupPermissionRequest((prev) => ({...prev, permissionId: getPermission1(permissionActive, selectItem)}))
        }
        handleConfigClose();
    }

    const deletePermission = (id: Number) => {
        setPermissionActive(permissionActive.filter(item => item.id !== id));
        setGroupPermissionRequest((prev) => ({...prev, permissionId: getPermission2(groupPermissionRequest.permissionId, id)}))
    };

    useEffect(() => {
        let id2 = Number (id);
        functionGetGroupPermissionById(id2);
        getAllPermission();
    }, []);

    return (
        <Container customClass="start" msg={msg} type={messageType} showLoading={showLoading}>
            <>
                <PanelBobyView title="Modulo de Edicão" redirect="/group" handleOnChangeDelete={deleteGroupPermission} handleOnChangeUpdateOrCreate={updateGroupPermission} saveOrDelete={showPermissionFrom}>
                    <PanelViewPagination 
                        pagination={["Grupo de Permissao", "Permissoes"]} 
                        txtButton={showPermissionFrom ? "Editar" : "Fechar"}  
                        handleOnChange={togglePermissionForm} 
                        handleOnChangeNav={handleOnChangeNav} 
                        navEnable={navAction} 
                        enableAdd={!showPermissionFrom} 
                        handleOnChangeAdd={handleConfigShow}>
                        <>
                            {(() => {
                                if (navAction === "Grupo de Permissao") {
                                    return <PermissionGroupFormUpdate 
                                        groupDTO={groupPermission} 
                                        handleNameInput={handleNameInput} 
                                        readOnly={showPermissionFrom} 
                                        handleDescriptionInput={handleDescriptionInput} 
                                        erros={erros}/>
                                } else {
                                    return <Permission
                                        permissionList={permissionActive} 
                                        enabled={showPermissionFrom} 
                                        handleOnChange={deletePermission}/>
                                }
                            })()}
                        </>
                    </PanelViewPagination>
                </PanelBobyView>

                <ModalView show={showModal} handleClose={handleConfigClose} title={"Adicionar Permissão"} handleOnChangeButton={AddItem}>
                    <SelectItem options={permission} value={1} handleOnChange={handleOnChangeSelectItem}/>
                </ModalView>
            </>
        </Container>
    )

    function functionGetGroupPermissionById(id: number) {
        auth.getGroupPermissionById(id)
        .then((res) => {
            setGroupPermission(res.data);
            setPermissionActive(res.data.permission)
            setGroupPermissionRequest((prev) => ({...prev, name: res.data.name, description: res.data.description, permissionId: getPermission(res.data.permission)}));
            setShowLoading(false);
        })
        .catch((error) => {
            console.error(error);
            navigate("/group", {state: { message: "Grupo de Permissão Não Encontrada", type: "error" }});
        });
    }

    function getAllPermission() {       
        auth.getAllPermission(0, 200, "", "")
        .then((res) => {
            setPermission(res.permission);
            setSelectItem({id: res.permission[0].id, permission: res.permission[0].permission, description: res.permission[0].description});
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function updateGroupPermissionAPI(id: number, groupPermissionRequest: GroupPermissionRequest) {   
        auth.updateGroupPermission(id, groupPermissionRequest)
        .then((res) => {
            navigate("/group", {state: { message: "Grupo de Permissão Atualizada com Sucesso", type: "success" }});
        })
        .catch((error) => {
          console.error(error);
          navigate("/group", {state: { message: "Erro ao Atualizar o Grupo de Permissão", type: "error" }});
        });
    }

    function deleteGroupPermissionAPI(id: number) {   
        auth.deleteGroupPermissionById(id)
        .then((res) => {
            navigate("/group", {state: { message: "Grupo de Permissão Removida com Sucesso", type: "success" }});
        })
        .catch((error) => {
          console.error(error);
          navigate("/group", {state: { message: "Erro ao Remover o Grupo de Permissão", type: "error" }});
        });
    }
}

function getPermission(permissionActive: TPermissionList): Number[] {
    const newData = permissionActive.map((item) => {
        return item.id;
    });
    return newData;
};

function getPermission1(permissionActive: TPermissionList, selectItem: PermissionDTO): Number[] {
    const newData = permissionActive.map((item) => {
        return item.id;
    });
    newData.push(selectItem.id)
    return newData;
};

function getPermission2(permissionActive: Number[], id: Number): Number[] {
    var index = permissionActive.indexOf(id);
    if (index > -1) {
        permissionActive.splice(index, 1);
      }
    return permissionActive;
};
