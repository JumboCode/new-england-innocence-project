import React, { useState } from 'react';

const ActionMenuComponent = ({}) => {
    const [isVisible, setIsVisible] = useState(true);

    const close = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    const [isClicked, setIsClicked] = useState(null);

    const click = (item) => {
        setIsClicked(item);
    };

    return (
        <div style={{
            // Create the rectangular shape
            width: '140px',
            height: '142px',
            border: '1.5px solid', // Gray edge on the border
            borderColor: 'rgba(102,112,133,255)', // Border color
            backgroundColor: 'white', // Color of rectangle
            display: 'flex',
            flexDirection: 'column', // Change the direction to column
            justifyContent: 'flex-start', // Align items to the top
        }}>
            <div style={{display: 'flex',
                justifyContent: 'flex-end', 
                paddingRight: '10px',
                marginBottom: '-5px',
                paddingTop:'3px',
                color: 'black',
            }}>
                <button onClick = {close}>
                    X
                </button>
            </div>
            <div onClick={() => click("Open")} style={{
                textAlign: 'left',
                color: 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Open" ? 'rgb(4,116,252)' : 'white',
            }}>
                Open
            </div>
            <div onClick={() => click("Edit")} style={{
                color: 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Edit" ? 'rgb(4,116,252)' : 'white',
            }}>
                Edit
            </div>
            <div onClick={() => click("Share")} style={{
                color: 'black',
                paddingBottom: '5px',
                paddingLeft: '13px',
                paddingRight: '13px',
                cursor: 'pointer',
                backgroundColor: isClicked === "Share" ? 'rgb(4,116,252)' : 'white',
            }}>
                Share
            </div>
            <div onClick={() => click("Delete")} style={{
                color: 'black',
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