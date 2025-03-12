// import React, { useState } from "react";
// import Collapsible from 'react-collapsible';
// import { MdWidthFull } from "react-icons/md";

// const styles = {
//     officerContainer: {
//         width: '1070px',
//         height: '207px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         padding: '20px',
//         backgroundColor: ' #F5FAFE',
//         borderRadius: '2px',
//         borderColor: '#65A3E1',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     },
//     officerInfo: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column' as 'column',
//     },
//     officerTitle: {
//         fontSize: '24px',
//         fontWeight: 'bold',
//         color: '#005d88',
//         marginBottom: '16px',
//     },
//     officerData: {
//         display: 'flex',
//         justifyContent: 'space-between',
//     },
//     notes: {
//         flex: 1,
//         marginRight: '20px',
//     },
//     mediaLinks: {
//         flex: 1,
//     },
//     sectionTitle: {
//         fontSize: '18px',
//         fontWeight: 'bold',
//         color:  '#FFFFFF',
//         backgroundColor: '#65A3E1',
//         marginTo: '10px',
//     },
//     notesContent: {
//         width: '100%',
//         height: '120px',
//         fontSize: '14px',
//         lineHeight: '1.5',
//         padding: '10px',
//         border: '5px solid #65A3E1',
//         borderRadius: '4px',
//         resize: 'none' as 'none', 
//         whiteSpace: 'pre-wrap' as 'pre-wrap', // Cast to a valid WhiteSpace value
//         wordWrap: 'break-word' as 'break-word', // Cast to a valid WordWrap value
//         backgroundColor: '#fff',
//     },
//     mediaLinksContent: {
//         width: '100%',
//         height: '120px',
//         fontSize: '14px',
//         lineHeight: '1.5',
//         padding: '10px',
//         border: '5px solid #65A3E1',
//         borderRadius: '4px',
//         resize: 'none' as 'none', // This ensures it is treated correctly
//         whiteSpace: 'pre-wrap' as 'pre-wrap', // Cast to a valid WhiteSpace value
//         wordWrap: 'break-word' as 'break-word', // Cast to a valid WordWrap value
//         backgroundColor: '#fff',
//     },
// };

// const OfficerInfo = () => {
//     return (
//         <div style={styles.officerContainer}>
//             <div style={styles.officerInfo}>
//                 <Collapsible trigger="Officer Information">
//                     <div style={styles.officerData}>
//                         <div style={styles.notes}>
//                             <h3 style={styles.sectionTitle}>Notes</h3>
//                             <textarea style={styles.notesContent}></textarea>
//                         </div>
//                         <div style={styles.mediaLinks}>
//                             <h3 style={styles.sectionTitle}>Media Links</h3>
//                             <textarea style={styles.mediaLinksContent}></textarea>
//                         </div>
//                     </div>
//                 </Collapsible>
//             </div>
//         </div>
//     );
// };

// export default OfficerInfo;

import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";

const styles = {
  container: {
    width: "1070px",
    margin: "20px auto",
    border: "2px solid #65A3E1",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F5FAFE"

  },
  /* The main header (Officer Info on left, Officer Name on right) */
  headerBar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8fcfc",
    color: "#65A3E1",
    padding: "10px 16px",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  officerInfoText: {
    // Left side text ("Officer Information")
    fontWeight: "bold",
    marginLeft: "5px",
    marginRight: "20px",
  },
  officerNameText: {
    // Right side text ("Officer Name")
    color: "#000000"
  },

  iconContainer: {
    marginLeft: "auto", 
    display: "flex",
    gap: "10px", 
  },

  /* Collapsible content area */
  collapsibleContent: {
    padding: "20px"
  },

  /* Two columns: Notes and Media Links */
  twoColumnRow: {
    display: "flex",
    gap: "20px"
  },

  columnBox: {
    flex: 1,
    border: "1px solid #65A3E1",
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    overflow: "hidden"
  },

  columnHeader: {
    backgroundColor: "#65A3E1",
    color: "#fff",
    padding: "8px 10px",
    fontWeight: "bold"
  },
  columnTextArea: {
    width: "480px",
    height: "92px",
    resize: "none" as "none",
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#000",
    overflow: "auto" // scroll if content is large
  }
};

const OfficerInfo = () => {
  // If you want manual control over open/close, track with useState:
  const [isOpen, setIsOpen] = useState(false);

  const collapsibleTrigger = (
    <div style={styles.headerBar}>
      <span style={styles.officerInfoText}>Officer Information</span>
      <span style={styles.officerNameText}>Officer Name</span>
      {/* Dropdown icon: rotates based on isOpen */}
      <div style={styles.iconContainer}>
        {isOpen ? (
              <>
              <MdOutlineRemoveRedEye style={{ fontSize: "24px", color: "#65A3E1" }} />
              <LuPenLine style={{ fontSize: "24px", color: "#65A3E1" }} />
              <FaChevronUp style={{ fontSize: "24px", color: "#65A3E1" }} />
            </>
          ) : (
            <>
              <FaChevronDown style={{ fontSize: "24px", color: "#65A3E1" }} />
              
            </>
          
        //     <FaEye style={{ ...styles.iconStyle, color: "purple" }} />
        //     <FaPencilAlt style={{ fontSize: "18px", color: "grey" }} />
        //     <FaChevronUp style={{ fontSize: "18px", color: "#65A3E1" }} />

        // ) : (
        //     <FaChevronDown style={{ fontSize: "18px", color: "#65A3E1" }} />
        //     <MdOutlineRemoveRedEye />
      )}
        
      </div>
      
    </div>
  );


  return (
    <div style={styles.container}>
      <Collapsible
        trigger={collapsibleTrigger}
        open={isOpen}
        handleTriggerClick={() => setIsOpen(!isOpen)}
        transitionTime={200}
      >
        <div style={styles.collapsibleContent}>
          <div style={styles.twoColumnRow}>
            {/* NOTES column */}
            <div style={styles.columnBox}>
              <div style={styles.columnHeader}>Notes</div>
              <textarea
                style={styles.columnTextArea}
                defaultValue={
                  ""
                }
              />
            </div>
            {/* MEDIA LINKS column */}
            <div style={styles.columnBox}>
              <div style={styles.columnHeader}>Media Links</div>
              <textarea
                style={styles.columnTextArea}
                defaultValue={
                  ""
                }
              />
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default OfficerInfo;
