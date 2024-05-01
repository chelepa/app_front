import { PermissionRequest } from "../../../types/PermissionRequest";
import { PermissionDTO } from "../../../types/PermissionResponse";
import { Input } from "../../form/Input";

export const PermissionFormUpdate = ({
  permissionDTO,
  handlePermissionInput,
  showPermissionFrom,
  handleDescriptionInput,
  erros
}: {
  permissionDTO: PermissionDTO;
  handlePermissionInput: any;
  showPermissionFrom: boolean;
  handleDescriptionInput: any;
  erros: Partial<PermissionRequest>
}) => {
  return (
    <>
      <div className="col-3">
        <Input
          type="text"
          text="Id"
          name="Id"
          placeholder="Id"
          handleOnChange={""}
          value={String (permissionDTO.id)}
          customClass=""
          readOnly={true}
          erros={""}
        />
      </div>
      <div className="col-9">
        <Input
          type="text"
          text="Permissão"
          name="Permissão"
          placeholder="Digite a Permissão"
          handleOnChange={handlePermissionInput}
          value={permissionDTO.permission}
          customClass=""
          readOnly={showPermissionFrom}
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
          value={permissionDTO.description}
          customClass=""
          readOnly={showPermissionFrom}
          erros={erros.description}
        />
      </div>
    </>
  );
};
