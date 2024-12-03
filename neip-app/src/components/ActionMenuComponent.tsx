import React, { useState } from 'react';

const ActionMenuComponent = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClicked, setIsClicked] = useState(null);

    const close = () => {
        setIsVisible(false);
        onClose?.(); // Call the parent's onClose handler
    };

    const click = (item) => {
        setIsClicked(item);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div style={{
            width: '140px',
            height: '142px',
            border: '1.5px solid',
            borderColor: 'rgba(102,112,133,255)',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Added shadow for better visibility
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '10px',
                marginBottom: '-5px',
                paddingTop: '3px',
                color: 'black',
            }}>
                <button onClick={close}>
                    X
                </button>
            </div>
            <div onClick={() => click("Open")} style={{
                textAlign: 'left',
                color: isClicked === "Open" ? 'white' : 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Open" ? 'rgb(4,116,252)' : 'white',
            }}>
                Open
            </div>
            <div onClick={() => click("Edit")} style={{
                color: isClicked === "Edit" ? 'white' : 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Edit" ? 'rgb(4,116,252)' : 'white',
            }}>
                Edit
            </div>
            <div onClick={() => click("Share")} style={{
                color: isClicked === "Share" ? 'white' : 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Share" ? 'rgb(4,116,252)' : 'white',
            }}>
                Share
            </div>
            <div onClick={() => click("Delete")} style={{
                color: isClicked === "Delete" ? 'white' : 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                backgroundColor: isClicked === "Delete" ? 'rgb(4,116,252)' : 'white',
            }}>
                Delete
            </div>
        </div>
    );
}

export default ActionMenuComponent;
