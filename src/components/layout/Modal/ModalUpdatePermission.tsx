import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode, useState, ChangeEvent } from "react";
import { ModalProps, Modal, Button } from "react-bootstrap";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import styles from "./ModalUpdate.module.css";
import { Omit } from "react-bootstrap/esm/helpers";
import { JSX } from "react/jsx-runtime";
import { Input } from "../../form/Input";
import { Container } from "../Container";
import { PermissionResponse } from "../../../types/PermissionResponse";

export const ModalUpdatePermission = ({ show, enable, permission, title}: { show: boolean, enable:any, permission: PermissionResponse, title:string}) => {
  const [id, setId] = useState("");
  const [rolle, setRolle] = useState("");
  const [description, setDescription] = useState("");

  const handleIdInput = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleRolleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setRolle(event.target.value);
  };

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  function MyVerticallyCenteredModal(
    props: JSX.IntrinsicAttributes &
      Omit<
        Omit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          "ref"
        > & {
          ref?:
            | ((instance: HTMLDivElement | null) => void)
            | RefObject<HTMLDivElement>
            | null
            | undefined;
        },
        BsPrefixProps<"div"> & ModalProps
      > &
      BsPrefixProps<"div"> &
      ModalProps & { children?: ReactNode }
  ) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container customClass="start">
            <div>
  
              <Input
                type="text"
                text="Id"
                name="Id"
                placeholder=""
                handleOnChange={handleIdInput}
                value={props.permission.id}
                customClass="form_control_input_two"
                readOnly={true}
              />
              <Input
                type="text"
                text="Rolle"
                name="Rolle"
                placeholder="Rolle"
                handleOnChange={handleRolleInput}
                value={props.permission.permission}
                customClass="form_control_input_two"
                readOnly={false}
              />
              <Input
                type="text"
                text="Descricão da Permissão"
                name="description"
                placeholder="Descricão da Permissão"
                handleOnChange={handleDescriptionInput}
                value={props.permission.description}
                customClass="form_control_input_two"
                readOnly={false}
              />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <MyVerticallyCenteredModal show={show} onHide={enable} permission={permission} title={title}/>
    </div>
  );
};