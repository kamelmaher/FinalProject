import { createPortal } from "react-dom"

type BackDropProps = {
    onClose: ()=> void;
}
const BackDrop = ({onClose}: BackDropProps) => {
    return (
        createPortal(<div className= "modal-backdrop fade show" onClick={onClose}></div> , document.body)
    )
}

export default BackDrop
