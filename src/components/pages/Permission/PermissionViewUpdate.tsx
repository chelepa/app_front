import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { PermissionRequest } from "../../../types/PermissionRequest";
import { PermissionDTO } from "../../../types/PermissionResponse";
import { Container } from "../../layout/Container";
import { PanelBobyView } from "../../layout/PanelBobyView";
import { PanelView } from "../../layout/PanelView";
import { PermissionFormUpdate } from "../../pages_form/permission_form/PermissionFormUpdate";

export const PermissionViewUpdate = () => {
  let msg = "";
  let messageType = "";
  const navigate = useNavigate();
  const auth = useContext(PermissionContext);
  const { id } = useParams();
  const [permissionDTO, setPermissionDTO] = useState<PermissionDTO>({id: 0, permission: "", description: ""});
  const [permissionRequest, setPermissionRequest] = useState<PermissionRequest>({permission: "", description: ""});
  const [showPermissionFrom, setShowPermissionFrom] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [erros, setErros] = useState<Partial<PermissionRequest>>({"permission": "","description": ""});
  const novosErros: Partial<PermissionRequest> = {};

  useEffect(() => { 
    setTimeout(() => {
      auth.getPermissionById(String (id))
      .then((res) => {
        setPermissionDTO(res.data);
        setPermissionRequest((prev) => ({...prev, description : res.data.description, permission : res.data.permission}));
        setShowLoading(!showLoading);
      })
      .catch((error) => {
        console.error(error);
        navigate("/permission", {state: { message: "Permissão Não Encontrada", type: "error" }});
      });
    }, 100)
  }, [id]);

  const togglePermissionForm = () => {
    setShowPermissionFrom(!showPermissionFrom);
  };

  const deleteById = () => {
    deletePermissionById(String (permissionDTO.id));
  }

  const updateById = () => {
    if (!permissionRequest.description || !permissionRequest.description) {
      if (!permissionRequest.description) {
        novosErros.description = "Por favor, digite a descrição";
      }
      if (!permissionRequest.description) {
        novosErros.permission = "Por favor, digite a Permissao";
      }
      setErros(novosErros);
    } else {
      updatePermission(permissionRequest);
    }
  };

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionDTO((prev) => ({...prev, description : event.target.value}));
    setPermissionRequest((prev) => ({...prev, description : event.target.value}));
    setErros(novosErros);
  };

  const handlePermissionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionDTO((prev) => ({...prev, permission : event.target.value}));
    setPermissionRequest((prev) => ({...prev, permission : event.target.value}));
    setErros(novosErros);
  };

  return (
    <Container customClass="start" msg={msg} type={messageType} showLoading={showLoading}>
      <PanelBobyView title="Modulo de Edicão" redirect="/permission" handleOnChangeDelete={deleteById} handleOnChangeUpdateOrCreate={updateById} saveOrDelete={showPermissionFrom}>
          <PanelView title="Identificacão" txtButton={showPermissionFrom ? "Editar" : "Fechar"} handleOnChange={togglePermissionForm}>
            <PermissionFormUpdate 
              permissionDTO={permissionDTO}
              handlePermissionInput={handlePermissionInput} 
              showPermissionFrom={showPermissionFrom} 
              handleDescriptionInput={handleDescriptionInput} 
              erros={erros}/>
          </PanelView>
      </PanelBobyView>
    </Container>
  );

  function updatePermission(permissionRequest: PermissionRequest) {
    auth.updatePermissionById(String (permissionDTO.id), permissionRequest)
    .then((res) => {
      navigate("/permission", {state: { message: "Permissão Atualizada com Sucesso", type: "success" }});
    })
    .catch((error) => {
      console.error(error);
      navigate("/permission", {state: { message: "Erro ao Atualizar a permissão", type: "error" }});
    });
  }

  function deletePermissionById(id: string) {
    auth.deletePermissionById(id)
    .then((res) => {
      navigate("/permission", {state: { message: "Permissão Removida com Sucesso", type: "success" }});
    })
    .catch((error) => {
      console.error(error);
      navigate("/permission", {state: { message: "Erro ao remover a permissão", type: "error" }});
    });
  }
};