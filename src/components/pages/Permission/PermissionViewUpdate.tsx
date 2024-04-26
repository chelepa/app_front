import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { PermissionDTO } from "../../../types/PermissionResponse";
import styles from "./PermissionViewUpdate.module.css";
import { Loading } from '../../layout/Loading';
import { LinkButton } from "../../form/LinkButton";
import { Input } from "../../form/Input";
import { SubmitButton } from "../../form/SubmitButton";
import { PermissionRequest } from "../../../types/PermissionRequest";

export const PermissionViewUpdate = () => {
  let msg = "";
  let messageType = "";
  const navigate = useNavigate();
  const auth = useContext(PermissionContext);
  const { id } = useParams();
  const [permissionDTO, setPermissionDTO] = useState<PermissionDTO>({id: 0, permission: "", description: ""});
  const [showPermissionFrom, setShowPermissionFrom] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [erros, setErros] = useState<Partial<PermissionRequest>>({"permission": "","description": ""});
  const novosErros: Partial<PermissionRequest> = {};

  useEffect(() => { 
    search(String (id)) 
  }, [id]);

  const togglePermissionForm = () => {
    setShowPermissionFrom(!showPermissionFrom);
  };

  const deleteById = () => {
    deletePermissionById(String (permissionDTO.id));
  }

  const updateById = () => {
    if (!permissionDTO.description || !permissionDTO.description) {
      if (!permissionDTO.description) {
        novosErros.description = "Por favor, digite a descrição";
      }
      if (!permissionDTO.description) {
        novosErros.permission = "Por favor, digite a Permissao";
      }
      setErros(novosErros);
    } else {
      // updatePermission(permissionDTO);
    }
  };

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionDTO((prev) => ({...prev, description : event.target.value}));
    setErros(novosErros);
  };

  const handlePermissionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPermissionDTO((prev) => ({...prev, permission : event.target.value}));
    setErros(novosErros);
  };

  return (
    <Container customClass="start" msg={msg} type={messageType} showLoading={showLoading}>
      <div className={`${styles.Panel} card bg-primary text-white`}>
        <div className="card-body">
          <div className={styles.header_panel}>
            <h2>Configuracões</h2>
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
                <SubmitButton text={showPermissionFrom ? "Editar Permissão" : "Fechar"} handleOnChange={togglePermissionForm} customClass="" customClassButton="color_black"/>
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
                      handleOnChange={handlePermissionInput}
                      value={permissionDTO.permission}
                      customClass=""
                      readOnly={showPermissionFrom}
                      erros={erros.permission}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type="text"
                      text="Descrição"
                      name="Descrição"
                      placeholder="Digite a Descrição"
                      handleOnChange={handleDescriptionInput}
                      value={permissionDTO.description}
                      customClass=""
                      readOnly={showPermissionFrom}
                      erros={erros.description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showPermissionFrom ? (
            <div className={`${styles.panel_header_delete}`}>
              <div className={`card bg-danger bg-gradient text-white`}>
                <div className={`${styles.panel_boby_delete}`}>
                  <h4>Excluir</h4>
                </div>
                <div className="card bg-light text-dark">
                  <div className={`${styles.padding} row`}>
                    <div className="col-12">
                        <SubmitButton text="Delete" handleOnChange={deleteById} customClass="" customClassButton="color_delete"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${styles.panel_header_delete}`}>
              <div className={`card bg-info bg-gradient text-white`}>
                <div className={`${styles.panel_boby_delete}`}>
                  <h4>Salvar</h4>
                </div>
                <div className="card bg-light text-dark">
                  <div className={`${styles.padding} row`}>
                    <div className="col-12">
                        <SubmitButton text="Salvar" handleOnChange={updateById} customClass="" customClassButton="color_black"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );

  function deletePermissionById(id: string) {
    auth.deletePermissionById(id)
    .then((res) => {
      navigate("/permission", {state: { message: "Permissão Removida com Sucesso", type: "success" }});
    })
    .catch((error) => {
      console.error(error);
      navigate("/permission", {state: { message: "Erro ao remover a permissão", type: "error" }});
    });
  }

  function search(id: string) {
    setTimeout(() => {
      auth.getPermissionById(id)
      .then((res) => {
        setPermissionDTO(res.data);
        setShowLoading(!showLoading);
      })
      .catch((error) => {
        console.error(error);
        navigate("/permission", {state: { message: "Permissão Não Encontrada", type: "error" }});
      });
    }, 100)
  }
};