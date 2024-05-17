import { GroupPermission, GroupPermissionRequest } from "../../../types/Group";
import { Input } from "../../form/Input";

export const PermissionGroupFormUpdate = ({groupDTO, handleNameInput, readOnly, handleDescriptionInput, erros}: {
    groupDTO: GroupPermission; handleNameInput: any; readOnly: boolean; handleDescriptionInput: any; erros: Partial<GroupPermissionRequest>}) => {
  return (
    <>
      <div className="col-3">
        <Input
          type="text"
          text="Id"
          name="Id"
          placeholder="Id"
          handleOnChange={""}
          value={String (groupDTO.id)}
          customClass=""
          readOnly={true}
          erros={""}
        />
      </div>
      <div className="col-9">
        <Input
          type="text"
          text="Name"
          name="Name"
          placeholder="Digite o Nome do grupo de Permissao"
          handleOnChange={handleNameInput}
          value={groupDTO.name}
          customClass=""
          readOnly={readOnly}
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
          readOnly={readOnly}
          erros={erros.description}
        />
      </div>
    </>
  );
};
