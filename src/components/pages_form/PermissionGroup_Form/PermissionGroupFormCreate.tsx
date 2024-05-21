import { GroupPermission, GroupPermissionRequest } from "../../../types/Group";
import { Input } from "../../form/Input";

export const PermissionGroupFormCreate = ({groupDTO, handleNameInput, handleDescriptionInput, erros}: {
    groupDTO: GroupPermissionRequest; handleNameInput: any; handleDescriptionInput: any; erros: Partial<GroupPermissionRequest>}) => {
  return (
    <>
      <div className="col-12">
        <Input
          type="text"
          text="Name"
          name="Name"
          placeholder="Digite o Nome do grupo de Permissao"
          handleOnChange={handleNameInput}
          value={groupDTO.name}
          customClass=""
          readOnly={false}
          erros={erros.name}
        />
      </div>
      <div className="col-12">
        <Input
          type="text"
          text="Descrição"
          name="Descrição"
          placeholder="Digite a Descrição do grupo de Permissao"
          handleOnChange={handleDescriptionInput}
          value={groupDTO.description}
          customClass=""
          readOnly={false}
          erros={erros.description}
        />
      </div>
    </>
  );
};
