import { ChangeEvent, useState } from "react";
import { Input } from "../../form/Input";
import { SubmitButton } from "../../form/SubmitButton";
import { PermissionRequest } from "../../../types/PermissionRequest";

export const PermissionForm = ({ textbutton, handleSubmit}: { textbutton: string, handleSubmit: any }) => {
  const [description, setDescription] = useState("");
  const [permission, setPermission] = useState("");
  const [erros, setErros] = useState<Partial<PermissionRequest>>({"permission": "","description": ""});
  const novosErros: Partial<PermissionRequest> = {};


  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setErros(novosErros);
    setDescription(event.target.value);
  };

  const handlePermission = (event: ChangeEvent<HTMLInputElement>) => {
    setErros(novosErros);
    setPermission(event.target.value);
  };

  const handleCreate = () => {
    if (!description || !permission) {
      if (!description) {
        novosErros.description = 'Por favor, digite a descrição';
      } 
      if (!permission) {
        novosErros.permission = 'Por favor, digite a Permissao';
      }
      setErros(novosErros);
    } else {
      handleSubmit({ permission: permission, description: description });
    }
  };

  return (
    <div>
      <Input
        type="text"
        text="Descricão"
        name="description"
        placeholder="Digite a Descricão"
        handleOnChange={handleDescriptionInput}
        value={description}
        customClass=""
        readOnly={false}
        erros={erros.description}
      />      
      <Input
        type="text"
        text="Permissão"
        name="permission"
        placeholder="Digite a Rolle da Permissão"
        handleOnChange={handlePermission}
        value={permission}
        customClass=""
        readOnly={false}
        erros={erros.permission}
      />

      <SubmitButton text={textbutton} handleOnChange={handleCreate} customClass="btn_save_update" customClassButton=""/>
    </div>
  );
};
