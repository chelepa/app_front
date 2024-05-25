import { CustomerDTO, CustomerRequest } from "../../../types/Customer";
import { Input } from "../../form/Input";

export const CustomerFormUpdate = ({customer, actionName, actionLastName, actionEmail, actionCell, readOnly, erros}: {
    customer: CustomerDTO; actionName: any; actionLastName: any; actionEmail:any; actionCell: any; readOnly: boolean; erros: Partial<CustomerRequest>}) => {
  return (
    <>
      <div className="col-2">
        <Input
          type="text"
          text="Id"
          name="Id"
          placeholder="Id"
          handleOnChange={""}
          value={String (customer.id)}
          customClass=""
          readOnly={true}
          erros={""}
        />
      </div>
      <div className="col-5">
        <Input
          type="text"
          text="Name"
          name="Name"
          placeholder="Digite o Nome do Usuario"
          handleOnChange={actionName}
          value={customer.name}
          customClass=""
          readOnly={readOnly}
          erros={erros.name}
        />
      </div>
      <div className="col-5">
        <Input
          type="text"
          text="Sobrenome"
          name="last_name"
          placeholder="Digite o Sobrenome"
          handleOnChange={actionLastName}
          value={customer.last_name}
          customClass=""
          readOnly={readOnly}
          erros={erros.last_name}
        />
      </div>

      <div className="col-9">
        <Input
          type="text"
          text="E Mail"
          name="email"
          placeholder="Digite o Email"
          handleOnChange={actionEmail}
          value={customer.email}
          customClass=""
          readOnly={readOnly}
          erros={erros.email}
        />
      </div>

      <div className="col-3">
        <Input
          type="text"
          text="Telefone"
          name="cell"
          placeholder="Digite o Telefone"
          handleOnChange={actionCell}
          value={customer.cell}
          customClass=""
          readOnly={readOnly}
          erros={erros.cell}
        />
      </div>
    </>
  );
};
