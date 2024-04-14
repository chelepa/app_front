import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode } from "react";
import { ModalProps, Modal, Button } from "react-bootstrap";
import { BsPrefixProps } from "react-bootstrap/esm/helpers";
import styles from "./ModalUpdate.module.css";
import { Omit } from "react-bootstrap/esm/helpers";
import { JSX } from "react/jsx-runtime";
import React from "react";

export const ModalUpdate = ({ show, enable }: { show: boolean, enable: any }) => {

  return <div>
    <MyVerticallyCenteredModal show={show} onHide={enable}/>
    </div>;
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
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}