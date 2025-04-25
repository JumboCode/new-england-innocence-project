import type { NextPage } from 'next'

interface DeleteInternAccountModalProps {
    usersId: string
    isOpen: boolean
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
    alignItems: 'center',
    zIndex: 1000
}

const modalContent: React.CSSProperties = {
    width: '307px',
    height: '268px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    border: '1px solid #B6B5B5',
    color: '#000000', // <-- enforce dark text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '8px'
}

const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '10px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid #000000',
    backgroundColor: '#ffffff',
    color: '#000000', // <-- dark text on light button
}

const DeleteInternAccountModal: NextPage<DeleteInternAccountModalProps> = ({ usersId, isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    const deleteInternAccount = async () => {
        try {
            const deleteInternAccountResponse = await fetch("/api/auth/deleteInternAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: usersId })
            });

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
                <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
                    Are you sure you want to delete this account?
                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: '20px' }}>
                    <button style={buttonStyle} onClick={deleteInternAccount}>Yes</button>
                    <button style={buttonStyle} onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteInternAccountModal;
