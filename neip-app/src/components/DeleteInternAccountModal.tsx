import type { NextPage } from 'next'

interface DeleteInternAccountModalProps {
    usersId: string
    isOpen: boolean,
    onClose: () => void
    reload: () => void

}

const modalOverlay: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const modalContent: React.CSSProperties = {
    width: '307px',
    height: '268px',
    top: '195px',
    left: '105px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    border: '1px solid #B6B5B5'
}

const DeleteInternAccountModal: NextPage<DeleteInternAccountModalProps> = ({ usersId, isOpen, onClose, reload }) => {
    console.log(isOpen);
    if (!isOpen) return null;
    const deleteInternAccount = async () => {
        try {
            const deleteInternAccountResponse = await fetch("/api/auth/deleteInternAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: usersId
                })

            });

            console.log(`Response status: ${deleteInternAccountResponse.status}`);

            if (!deleteInternAccountResponse.ok) {
                const errorData = await deleteInternAccountResponse.text();
                console.error(`Error response: ${errorData}`);
                throw new Error(`Error ${deleteInternAccountResponse.status}: ${errorData}`);
            }
            reload();
            onClose();
        } catch (error) {
            console.error('Unable to delete intern account:', error);
        }
    }

    return (
        <div style={modalOverlay}>
            <div style={modalContent}>
                <div>Are you sure you want to delete this account?</div>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button onClick={deleteInternAccount}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>

            </div>
        </div>

    )
}

export default DeleteInternAccountModal;