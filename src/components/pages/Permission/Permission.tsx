import {useContext, useEffect, useState } from "react";
import { PermissionContext } from "../../../contexts/Permission/PermissionContext";
import { Container } from "../../layout/Container";
import { Panel } from "../../layout/Panel";
import { TPermissionList } from "../../../types/PermissionResponse";
import { useLocation } from "react-router-dom";
import styles from "./Permission.module.css";


export const Permission = () => {
  let msg = "";
  const auth = useContext(PermissionContext);
  const location = useLocation();
  const [permissionList, setPermissionList] = useState<TPermissionList>([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  if (location.state) {
    msg = location.state.message;
  }

  useEffect(() => {
    location.state = "";

    setTimeout(() => {
      auth.getAllPermission()
        .then((res) => {
          console.log(res);
          setPermissionList(res.permission);
          setRemoveLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 3000);
  }, []);

  const handleSearch = (teste: any) => {

  };

  const handleRefresh = () => {
    setPermissionList([]);
    setRemoveLoading(false);
    setTimeout(() => {
      auth.getAllPermission()
        .then((res) => {
          setPermissionList(res.permission);
          setRemoveLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 3000);
  }

  return (
    <Container customClass="start" msg={msg} type="success">
      <Panel
        moduleTitle="Permissões"
        handleOnChange_search={handleSearch}
        handleRefresh={handleRefresh}
        tr_table={["#", "Permissão", "Descricão"]}
        objectIndx={["id", "permission", "description"]}
        objectList={permissionList}
        handleOnChangeEdit={"/permission/"}
        handleOnChangeCreate={"/permission/create"}
        loading={removeLoading}
      />
    </Container>
  );
};