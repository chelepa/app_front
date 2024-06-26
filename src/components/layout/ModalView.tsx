import { Modal } from "react-bootstrap";
import { SubmitButton } from "../form/SubmitButton";

export const ModalView = ({show, handleClose, handleOnChangeButton, title, children}: {handleOnChangeButton: any, show:any, handleClose:any, title:string, children: JSX.Element }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton text="Save" handleOnChange={handleOnChangeButton} customClass={""} customClassButton=""/>
        </Modal.Footer>
      </Modal>
    </>
  );
};
