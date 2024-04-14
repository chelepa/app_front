import {useContext, useState } from "react";
import styles from "./Permission.module.css";
import { PermissionContext } from "../../contexts/Permission/PermissionContext";
// import { Message } from '../layout/Message';
// import { useLocation } from "react-router-dom";
import { Container } from "../layout/Container";
import { Panel } from "../layout/Panel";
import { TPermissionList } from "../../types/PermissionResponse";
import { ModalUpdate } from "../layout/ModalUpdate";

export const Permission = () => {
  const auth = useContext(PermissionContext);
  const [modalShow, setModalShow] = useState(false);

  // const location = useLocation();
  // let msg = "";
  // if (location.state) {
  //   msg = location.state.message;
  // }

  const handleOpenModalEdit = (event: TPermissionList) => {
    console.log(event);
    setModalShow(true);
  };

  const handleCloseModalEdit = () => {
    setModalShow(false);
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
            txt_linkButton="Nova Permissão"
            to_linkButton="/"
            handleOnChange_search={handleSearch}
            tr_table={["#", "Descricão", "Permissão"]}
            objectIndx={["id", "permission", "description"]}
            objectList={auth.permissionList}
            handleOnChange_edit={handleOpenModalEdit}
          />
          {/* <Message type={'error'} msg="asjhdlkajshdlkasjhdlkajshdlkajshd"/> */}
          <ModalUpdate show={modalShow} enable={handleCloseModalEdit}/>
        </div>
      </Container>
    </div>
  );
};