import { Form } from "react-bootstrap";
import { PermissionDTO } from "../../../types/PermissionResponse";

export const Permission = ({permissionList, enabled, handleOnChange}: {permissionList: PermissionDTO[], enabled: boolean, handleOnChange:any}) => {
  return (
    <>
      <div className="row">
        {permissionList.map((permission) => (
          <div className="col-sm-2">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{permission.permission}</h5>
                <p className="card-text">{permission.description}</p>
                {!enabled && <button type="button" className="btn btn-danger" onClick={() => handleOnChange(permission.id)}>Excluir</button>} 
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
