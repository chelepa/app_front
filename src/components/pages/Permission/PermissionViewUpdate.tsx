import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { PermissionDTO } from "../../../types/PermissionResponse";
import styles from "./PermissionViewUpdate.module.css";
import { Loading } from '../../layout/Loading';
import { LinkButton } from "../../form/LinkButton";
import { Input } from "../../form/Input";

export const PermissionViewUpdate = () => {
  let msg = "";
  let messageType = "";
  const navigate = useNavigate();
  const auth = useContext(PermissionContext);
  const { id } = useParams();
  const [permissionDTO, setPermissionDTO] = useState<PermissionDTO>({id: 0, permission: "", description: ""});
  const [showPermissionFrom, setShowPermissionFrom] = useState(true);

  useEffect(() => { search(String (id)) }, [id] );

  const togglePermissionForm = () => {
    setShowPermissionFrom(!showPermissionFrom);
  };

  return (
    <Container customClass="start" msg={msg} type={messageType}>
      <div className={`${styles.Panel} card bg-primary text-white`}>
        <div className="card-body">
          <div className={styles.header_panel}>
            <h2>Configuracões Gerais</h2>
            <div className={styles.header_panel_button}>
              <LinkButton to={"/permission"} text={"Voltar a listagem"} />
            </div>
          </div>
        </div>
        <div className={`${styles.panel_boby} bg-light text-dark`}>
          <div className={`${styles.panel_header_Identification}`}>
            <div className={`card bg-info text-white`}>
              <div className={`${styles.panel_boby_Identification}`}>
                <h4>Identificacão</h4>
                <button className={styles.btn} onClick={togglePermissionForm}>
                  {showPermissionFrom ? "Editar Permissão" : "Fechar"}
                </button>
              </div>
              <div className="card bg-light text-dark">
                <div className={`${styles.padding} row`}>
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
                      handleOnChange={""}
                      value={permissionDTO.permission}
                      customClass=""
                      readOnly={showPermissionFrom}
                      erros={""}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type="text"
                      text="Descrição"
                      name="Descrição"
                      placeholder="Digite a Descrição"
                      handleOnChange={""}
                      value={permissionDTO.description}
                      customClass=""
                      readOnly={showPermissionFrom}
                      erros={""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.panel_header_delete}`}>
            <div className={`card bg-danger bg-gradient text-white`}>
              <div className={`${styles.panel_boby_delete}`}>
                <h4>Excluir</h4>
              </div>
              <div className="card bg-light text-dark">
                <div className={`${styles.padding} row`}>
                  <div className="col-9">
                    Botao delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

  function search(id: string) {
    setTimeout(() => {
      auth.getPermissionById(id)
      .then((res) => {
        setPermissionDTO(res.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/permission", {state: { message: "Permissão Não Encontrada", type: "error" }});
      });
    }, 5000)
  }
};
