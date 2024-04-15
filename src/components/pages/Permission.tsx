import {useContext, useState } from "react";
import styles from "./Permission.module.css";
import { PermissionContext } from "../../contexts/Permission/PermissionContext";
// import { Message } from '../layout/Message';
// import { useLocation } from "react-router-dom";
import { Container } from "../layout/Container";
import { Panel } from "../layout/Panel";
import { PermissionResponse, TPermissionList } from "../../types/PermissionResponse";
import { ModalUpdatePermission } from "../layout/Modal/ModalUpdatePermission";

export const Permission = () => {
  const initPermission = {id: 0, permission: "", description: ""}
  const auth = useContext(PermissionContext);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [modalShowCreate, setModalShowCreate] = useState(false);
  const [permission, setPermission] = useState<PermissionResponse>(initPermission);

  // const location = useLocation();
  // let msg = "";
  // if (location.state) {
  //   msg = location.state.message;
  // }

  const handleOpenModalEdit = (event: PermissionResponse) => {
    setPermission(event);
    setModalShowUpdate(true);
  };

  const handleOpenModalCreate = () => {
    setPermission(initPermission);
    setModalShowCreate(true);
  };

  const handleCloseModal = () => {
    setModalShowUpdate(false);
    setModalShowCreate(false);
  };

  const handleSearch = (teste: any) => {
    console.log(teste)
  };

  return (
    <div className={styles.container}>
      <Container customClass="start">
        <div>
          <Panel
            moduleTitle="Permissões"
            handleOnChange_search={handleSearch}
            tr_table={["#", "Descricão", "Permissão"]}
            objectIndx={["id", "permission", "description"]}
            objectList={auth.permissionList}
            handleOnChange_edit={handleOpenModalEdit}
            handleOnChange_create={handleOpenModalCreate}
          />
          {/* <Message type={'error'} msg="asjhdlkajshdlkasjhdlkajshdlkajshd"/> */}
          <ModalUpdatePermission show={modalShowUpdate} enable={handleCloseModal} permission={permission} title="Edição de Permissão"/>
          <ModalUpdatePermission show={modalShowCreate} enable={handleCloseModal} permission={permission} title="Criacão da Permissão"/>
        </div>
      </Container>
    </div>
  );
};