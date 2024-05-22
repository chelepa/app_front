import { Form } from "react-bootstrap";

export const ConfigFormSearch = ({handleChange, searchParam}: {handleChange: any; searchParam: string;}) => {
  return (
    <div className="modcal-body">
      <div className="container text-center">
        <div className="row">
          <div className="col-4">
            <Form.Check
              value="name"
              type="radio"
              aria-label="radio 1"
              label="Nome"
              onChange={handleChange}
              checked={searchParam === "name"}
            />
          </div>
          <div className="col-4">
            <Form.Check
              value="lastName"
              type="radio"
              aria-label="radio 2"
              label="Sobrenome"
              onChange={handleChange}
              checked={searchParam === "lastName"}
            />
          </div>
          <div className="col-4">
            <Form.Check
              value="email"
              type="radio"
              aria-label="radio 2"
              label="E-Mail"
              onChange={handleChange}
              checked={searchParam === "email"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
