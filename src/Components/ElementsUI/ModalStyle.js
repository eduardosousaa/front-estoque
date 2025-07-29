import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalStyle({open,toggle,title,onClick,children}){

    return(
      <Modal isOpen={open} toggle={toggle}>
         <ModalHeader toggle={toggle} style={{color:"#fff",backgroundColor:"#009e8b"}}>{title}</ModalHeader>
         <ModalBody style={{backgroundColor:"#f8ffff"}}>{children}</ModalBody>
         <ModalFooter style={{backgroundColor:"#f8ffff"}}>
             <Button style={{backgroundColor:"#009e8b"}} onClick={onClick}>Confirmar</Button>
             <Button style={{backgroundColor:"#e5484d"}} onClick={toggle}>Cancelar</Button>
         </ModalFooter>
      </Modal>);
}