import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { PermissionRequest } from "../../../types/PermissionRequest";
import { Container } from "../../layout/Container";
import { PanelBobyView } from "../../layout/PanelBobyView";
import { PanelView } from "../../layout/PanelView";
import { PermissionFormCreate } from "../../pages_form/permission_form/PermissionFormCreate";

export const PermissionCreate = () => {
  let msg = "";
  let messageType = "";
  const navigate = useNavigate();
  const auth = useContext(PermissionContext);
  const [permissionRequest, setPermissionRequest] = useState<PermissionRequest>({permission: "", description: ""});
  const [erros, setErros] = useState<Partial<PermissionRequest>>({"permission": "","description": ""});
  const novosErros: Partial<PermissionRequest> = {};

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionRequest((prev) => ({...prev, description : event.target.value}));
    setErros(novosErros);
  };

  const handlePermissionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionRequest((prev) => ({...prev, permission : event.target.value}));
    setErros(novosErros);
  };

  const handleOncreate = () => {
    if (!permissionRequest.description || !permissionRequest.description) {
      if (!permissionRequest.description) {
        novosErros.description = "Por favor, digite a descrição";
      }
      if (!permissionRequest.description) {
        novosErros.permission = "Por favor, digite a Permissao";
      }
      setErros(novosErros);
    } else {
      createPermission(permissionRequest);
    }
  };

  return (
    <Container customClass="" msg={msg} type={messageType} showLoading={false}>
      <PanelBobyView title="Modulo de Cadastro" redirect="/permission" handleOnChangeDelete={""} handleOnChangeUpdateOrCreate={handleOncreate} saveOrDelete={false}>
        <PanelView title="Permissão" txtButton={""} handleOnChange={""}>
          <PermissionFormCreate handlePermissionInput={handlePermissionInput} handleDescriptionInput={handleDescriptionInput} erros={erros} permissionRequest={permissionRequest}/>
        </PanelView>
      </PanelBobyView>
    </Container>
  );

  function createPermission(request: PermissionRequest) {
    auth.createPermission(request)
    .then((res) => {
      navigate("/permission", { state: { message: "Permissão Criado com Sucesso", type: "success"} });
    })
    .catch((error) => {
      console.error(error);
      navigate("/permission", {state: { message: "Erro ao Criar a permissão", type: "error" }});
    });
  }
};
