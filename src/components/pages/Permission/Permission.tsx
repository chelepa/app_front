import {useContext, useEffect, useState } from "react";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { Panel } from "../../layout/Panel";
import { TPermissionList } from "../../../types/PermissionResponse";
import { Message } from "../../layout/Message";
import { useLocation } from "react-router-dom";
import styles from "./Permission.module.css";


export const Permission = () => {
  const auth = useContext(PermissionContext);
  const [permissionList, setPermissionList] = useState<TPermissionList>([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const location = useLocation();
  let msg = "";
  if (location.state) {
    msg = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      auth.getAllPermission()
      .then((res) => {
        console.log(res);
        setPermissionList(res);
        setRemoveLoading(true);
      })
      .catch((error) => {
        console.error(error)
      });
    }, 3000)
  }, []);

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
            tr_table={["#", "Permissão", "Descricão"]}
            objectIndx={["id", "permission", "description"]}
            objectList={permissionList}
            handleOnChangeEdit={"/permission/"}
            handleOnChangeCreate={"/permission/create"}
            loading={removeLoading}
          />
          {msg && <Message type={'error'} msg={msg}/>}
        </div>
      </Container>
    </div>
  );
};