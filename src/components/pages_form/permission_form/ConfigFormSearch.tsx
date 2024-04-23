import { Form } from "react-bootstrap";
import styles from "./ConfigFormSearch.module.css";

export const ConfigFormSearch = ({handleChange, searchParam}: {handleChange: any; searchParam: string;}) => {
  return (
    <div className="modcal-body">
      <div className="container text-center">
        <div className="row">
          <div className="col-6">
            <Form.Check
              value="permission"
              type="radio"
              aria-label="radio 1"
              label="Permissao"
              onChange={handleChange}
              checked={searchParam === "permission"}
            />
          </div>
          <div className="col-6">
            <Form.Check
              value="description"
              type="radio"
              aria-label="radio 2"
              label="Descricao"
              onChange={handleChange}
              checked={searchParam === "description"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
