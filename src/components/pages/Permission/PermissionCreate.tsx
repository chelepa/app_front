import { PermissionRequest } from "../../../types/PermissionRequest";
import { Container } from "../../layout/Container";
import { PermissionForm } from "../../pages_form/permission_form/PermissionForm";
import styles from "./PermissionCreate.module.css";

export const PermissionCreate = () => {
  const handleOncreate = (request: PermissionRequest) => {
    console.log(request);
  };

  return (
    <div className={styles.container}>
      <Container customClass="start">
        <div className={styles.new_Project}>
          <h1>Modulo de Criação de Permissão</h1>
          <p>
            Modulo responsavel pela criacao de novas permissoes para o sistema
          </p>
          <PermissionForm textbutton="Criar Permissão" handleSubmit={handleOncreate}/>
        </div>
      </Container>
    </div>
  );
};
