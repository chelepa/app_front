import styles from "./FormViewDelete.module.css";
import { Input } from "../../form/Input";

export const FormViewDelete = ({pText, id, description, permission}: {pText: String; id: string; description: string, permission: string}) => {
  return (
    <div className="modcal-body">
    <p>{pText}</p>
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Input
            type="text"
            text="Id"
            name="Id"
            placeholder=""
            handleOnChange={null}
            value={id}
            customClass="form_control_input_delete"
            readOnly={true}
            erros={null}
          />
        </div>
        <div className="col-9">
          <Input
            type="text"
            text="Description"
            name="Description"
            placeholder=""
            handleOnChange={null}
            value={description}
            customClass="form_control_input_delete"
            readOnly={true}
            erros={null}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Input
            type="text"
            text="Permission"
            name="Permission"
            placeholder=""
            handleOnChange={null}
            value={permission}
            customClass="form_control_input_delete"
            readOnly={true}
            erros={null}
          />
        </div>
      </div>
    </div>
  </div>
  );
};
