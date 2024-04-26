import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { PermissionRequest } from "../../../types/PermissionRequest";
import { Container } from "../../layout/Container";
import { PermissionForm } from "../../pages_form/permission_form/PermissionForm";
import styles from "./PermissionCreate.module.css";

export const PermissionCreate = () => {
  let msg = "";
  let messageType = "";
  const navigate = useNavigate();
  const auth = useContext(PermissionContext);

  const handleOncreate = (request: PermissionRequest) => {
    auth.createPermission(request)
    .then((res) => {
      navigate("/permission", { state: { message: "Permissão Criado com Sucesso", type: "success"} });
      console.log(res);
    })
    .catch((error) => {
      msg = error;
      messageType = "error";
    });
  };

  return (
    <Container customClass="" msg={msg} type={messageType} showLoading={false}>
      <div className={styles.new_Project}>
        <h1>Modulo de Criação de Permissão</h1>
        <p>
          Modulo responsavel pela criacao de novas permissoes para o sistema
        </p>
        <PermissionForm
          textbutton="Criar Permissão"
          handleSubmit={handleOncreate}
        />
      </div>
    </Container>
  );
};
