import { createPortal } from "react-dom";
import BackDrop from "./BackDrop";

type ModalProps = {
    onClose: () => void,
    showModal: boolean,
    children: React.ReactNode
}
const Modal = ({ showModal, onClose, children  }: ModalProps) => {
    return (
        <>
            {showModal && <BackDrop onClose={onClose} />}
            {showModal && createPortal(<div className="modal show" style={{display: "block"}} onClick={onClose} >
                <div className="modal-dialog">
                    {children}
                </div>
            </div>, document.body)
            }
        </>

    )
}

export default Modal
