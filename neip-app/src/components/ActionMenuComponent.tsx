// import React, { useState } from 'react';
// import EditExonereeModal from './EditExonereeModal';

// const ActionMenuComponent = ({ onClose, selectedExoneree, onDeleteSuccess } : {onClose : any, selectedExoneree : any}) => {
//     const [isVisible, setIsVisible] = useState(true);
//     const [isClicked, setIsClicked] = useState<null | string>(null);

//     const [modalOpen, setModalOpen] = useState(false);


//     const handleOpenModal = () => setModalOpen(true);
//     const handleCloseModal = () => setModalOpen(false);


//     const close = () => {
//         setIsVisible(false);
//         onClose?.(); // Call the parent's onClose handler
//     };

//     const click = ( item: string, selectedExoneree: any) => {
//         setIsClicked(item);
//         if (item === "Edit" && selectedExoneree) {
//             handleOpenModal();
//         }
//         if (item === "Delete") {
//           handleDelete();
//         }
//     };
//     const handleDelete = async () => {
//       const confirmDelete = window.confirm("Are you sure you want to delete this item?");
//       if (!confirmDelete) {
//         return;
//       }
          
//       try {
//         console.log("Before the delete", exonereeId);
//         const response = await fetch(`/api/exonerees/deleteExoneree?id=${exonereeId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
  
//         if (!response.ok) {
//           throw new Error(`Failed to delete. Server responded with ${response.status}`);
//         }
  
//         // Call the parent's callback to refresh data after deletion.
//         onDeleteSuccess(exonereeId);
//         close();
//       } catch (error) {
//         console.error("Delete failed:", error);
//         alert("Unable to delete exoneree: " + error);
//       }
//     };
  
//     if (!isVisible) {
//       return null;
//     }

//     return (
//         <div style={{
//             width: '140px',
//             height: '142px',
//             border: '1.5px solid',
//             borderColor: 'rgba(102,112,133,255)',
//             backgroundColor: 'white',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-start',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         }}>
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'flex-end',
//                 paddingRight: '10px',
//                 marginBottom: '-5px',
//                 paddingTop: '3px',
//                 color: 'black',
//             }}>
//                 <button onClick={close}>
//                     X
//                 </button>
//             </div>
//             <div onClick={() => click("Open", selectedExoneree)} style={{
//                 textAlign: 'left',
//                 color: isClicked === "Open" ? 'white' : 'black',
//                 paddingBottom: '5px',
//                 paddingLeft: '13px',
//                 paddingRight: '13px',
//                 cursor: 'pointer',
//                 backgroundColor: isClicked === "Open" ? 'rgb(4,116,252)' : 'white',
//             }}>
//                 Open
//             </div>
//             <div onClick={() => click("Edit", selectedExoneree)} style={{
//                 color: isClicked === "Edit" ? 'white' : 'black',
//                 paddingBottom: '5px',
//                 paddingLeft: '13px',
//                 paddingRight: '13px',
//                 cursor: 'pointer',
//                 backgroundColor: isClicked === "Edit" ? 'rgb(4,116,252)' : 'white',
//             }}>
//                 Edit
//             </div>
//             <div onClick={() => click("Share", selectedExoneree)} style={{
//                 color: isClicked === "Share" ? 'white' : 'black',
//                 paddingBottom: '5px',
//                 paddingLeft: '13px',
//                 paddingRight: '13px',
//                 cursor: 'pointer',
//                 backgroundColor: isClicked === "Share" ? 'rgb(4,116,252)' : 'white',
//             }}>
//                 Share
//             </div>
//             <div onClick={() => click("Delete", selectedExoneree)} style={{
//                 color: isClicked === "Delete" ? 'white' : 'black',
//                 paddingBottom: '5px',
//                 paddingLeft: '13px',
//                 paddingRight: '13px',
//                 boxSizing: 'border-box',
//                 cursor: 'pointer',
//                 backgroundColor: isClicked === "Delete" ? 'rgb(4,116,252)' : 'white',
//             }}>
//                 Delete
//             </div>
//             <EditExonereeModal open={modalOpen} handleClose={handleCloseModal} selectedExoneree={selectedExoneree}/>
//         </div>
//     );

// //   return (
// //     <div style={{
// //       width: '140px',
// //       height: '142px',
// //       border: '1.5px solid',
// //       borderColor: 'rgba(102,112,133,255)',
// //       backgroundColor: 'white',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       justifyContent: 'flex-start',
// //       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //     }}>
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'flex-end',
// //         paddingRight: '10px',
// //         marginBottom: '-5px',
// //         paddingTop: '3px',
// //         color: 'black',
// //       }}>
// //         <button onClick={close}>X</button>
// //       </div>
// //       <div onClick={() => click("Open")} style={{
// //         textAlign: 'left',
// //         color: isClicked === "Open" ? 'white' : 'black',
// //         paddingBottom: '5px',
// //         paddingLeft: '13px',
// //         paddingRight: '13px',
// //         cursor: 'pointer',
// //         backgroundColor: isClicked === "Open" ? 'rgb(4,116,252)' : 'white',
// //       }}>
// //         Open
// //       </div>
// //       <div onClick={() => click("Edit")} style={{
// //         color: isClicked === "Edit" ? 'white' : 'black',
// //         paddingBottom: '5px',
// //         paddingLeft: '13px',
// //         paddingRight: '13px',
// //         cursor: 'pointer',
// //         backgroundColor: isClicked === "Edit" ? 'rgb(4,116,252)' : 'white',
// //       }}>
// //         Edit
// //       </div>
// //       <div onClick={() => click("Share")} style={{
// //         color: isClicked === "Share" ? 'white' : 'black',
// //         paddingBottom: '5px',
// //         paddingLeft: '13px',
// //         paddingRight: '13px',
// //         cursor: 'pointer',
// //         backgroundColor: isClicked === "Share" ? 'rgb(4,116,252)' : 'white',
// //       }}>
// //         Share
// //       </div>
// //       <div onClick={() => click("Delete")} style={{
// //         color: isClicked === "Delete" ? 'white' : 'black',
// //         paddingBottom: '5px',
// //         paddingLeft: '13px',
// //         paddingRight: '13px',
// //         boxSizing: 'border-box',
// //         cursor: 'pointer',
// //         backgroundColor: isClicked === "Delete" ? 'rgb(4,116,252)' : 'white',
// //       }}>
// //         Delete
// //       </div>
// //     </div>
// //   );
// // }

// export default ActionMenuComponent;


import React, { useState } from 'react';
import EditExonereeModal from './EditExonereeModal';

interface ActionMenuProps {
  onClose: () => void;
  exonereeId: number;
  selectedExoneree: any,
  onDeleteSuccess: (id: number) => void;
}

const ActionMenuComponent: React.FC<ActionMenuProps> = ({ onClose, exonereeId, selectedExoneree, onDeleteSuccess }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState<null | string>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const close = () => {
    setIsVisible(false);
    onClose?.(); // Call parent's onClose handler
  };

  const click = (item: string) => {
    setIsClicked(item);
    if (item === "Delete") {
      handleDelete();
    }
    if (item === "Edit" && exonereeId) {
      handleOpenModal();
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) {
      return;
    }
        
    try {
      console.log("Before the delete", exonereeId);
      const response = await fetch(`/api/exonerees/deleteExoneree?id=${exonereeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete. Server responded with ${response.status}`);
      }

      // Call the parent's callback to refresh data after deletion.
      onDeleteSuccess(exonereeId);
      close();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Unable to delete exoneree: " + error);
    }
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '10px',
        marginBottom: '-5px',
        paddingTop: '3px',
        color: 'black',
      }}>
        <button onClick={close}>X</button>
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
      <EditExonereeModal open={modalOpen} handleClose={handleCloseModal} selectedExoneree={selectedExoneree}/>
    </div>
  );
}

export default ActionMenuComponent;