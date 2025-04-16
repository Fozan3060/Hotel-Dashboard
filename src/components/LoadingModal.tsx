import React from 'react'
import Loading from './Loading';
import Modal from 'react-modal';

type Props = {
    LoadingOpen: boolean
    type: string
    msg: string
}

const LoadingModal: React.FC<Props> = ({ LoadingOpen, type, msg }) => {

    const customStyles = {
        overlay: {
            zIndex: 10000,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "fit-content",
            width: "20rem"
        },
    };
    return (
        <Modal
            isOpen={LoadingOpen}
            style={customStyles}
            contentLabel="Loading Modal"
        >
            <Loading msg={msg} type={type} />
        </Modal>
    )
}

export default LoadingModal