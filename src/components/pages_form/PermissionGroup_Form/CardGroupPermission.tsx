import { GroupPermission } from "../../../types/Group";

export const CardGroupPermission = ({list, enabled, handleOnChange}: {list: GroupPermission[], enabled: boolean, handleOnChange:any}) => {
    return (
      <>
        <div className="row">
          {list.length === 0 && <div className="alert alert-danger" role="alert">É Nessesario Adicionar pelo Menos um Grupo de Permissão</div>}
          {list.map((item) => (
            <div className="col-sm-2">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  {!enabled && <button type="button" className="btn btn-danger" onClick={() => handleOnChange(item.id)}>Excluir</button>} 
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };