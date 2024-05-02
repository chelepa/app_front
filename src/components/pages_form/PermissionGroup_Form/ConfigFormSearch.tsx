import { Form } from "react-bootstrap";

export const ConfigFormSearch = ({handleChange, searchParam}: {handleChange: any; searchParam: string;}) => {
  return (
    <div className="modcal-body">
      <div className="container text-center">
        <div className="row">
          <div className="col-6">
            <Form.Check
              value="name"
              type="radio"
              aria-label="radio 1"
              label="Nome"
              onChange={handleChange}
              checked={searchParam === "name"}
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
