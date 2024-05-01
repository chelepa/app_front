import { PermissionRequest } from "../../../types/PermissionRequest";
import { Input } from "../../form/Input";

export const PermissionFormCreate = ({handlePermissionInput, handleDescriptionInput, erros, permissionRequest}: { handlePermissionInput: any, handleDescriptionInput: any, erros: Partial<PermissionRequest>, permissionRequest: PermissionRequest;}) => {

  return (
    <>
      <div className="col-12">
        <Input
          type="text"
          text="Permissão"
          name="Permissão"
          placeholder="Digite a Permissão"
          handleOnChange={handlePermissionInput}
          value={permissionRequest.permission}
          customClass=""
          readOnly={false}
          erros={erros.permission}
        />
      </div>
      <div className="col-12">
        <Input
          type="text"
          text="Descrição"
          name="Descrição"
          placeholder="Digite a Descrição"
          handleOnChange={handleDescriptionInput}
          value={permissionRequest.description}
          customClass=""
          readOnly={false}
          erros={erros.description}
        />
      </div>
    </>
  );
};
