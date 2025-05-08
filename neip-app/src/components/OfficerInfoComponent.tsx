import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const styles = {
  container: {
    width: "90%",
    margin: "20px auto",
    border: "2px solid #65A3E1",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F5FAFE"
  },
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
    fontWeight: "bold",
    marginLeft: "5px",
    marginRight: "20px",
  },
  officerNameText: {
    color: "#000000"
  },
  officerDepartmentText: {
    marginLeft: "5px",
    marginRight: "20px"
  },
  iconContainer: {
    marginLeft: "auto", 
    display: "flex",
    gap: "10px", 
  },
  collapsibleContent: {
    padding: "20px"
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px"
  },
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
    overflow: "auto"
  },

  columnTextAreaSmall: {
    width: "480px",
    height: "30px",
    resize: "none" as "none",
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#000",
    overflow: "auto",
  },

  mediaLinks: {
    width: "480px",
    height: "92px",
    resize: "none" as "none",
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#000",
    overflow: "auto"
  }
};

const OfficerInfo: React.FC<{ officerName: string, onDelete: () => void }> = ({ officerName, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [officer, setOfficer] = useState<{
    id: number;
    name: string;
    notes: string | null;
    MediaLinks: string | null;
    department: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [editableNotes, setEditableNotes] = useState("");
  const [editableMediaLinks, setEditableMediaLinks] = useState("");
  const [editableDepartment, setEditableDepartment] = useState("");
  const [editableBadgeNumber, setEditableBadgeNumber] = useState("");
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" | "" }>({ text: "", type: "" });

  const parseOfficer = async (input : string) => {
    const [name, badgeNumber] = input.split(':');
    return { name, badgeNumber }; 
  }

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (!officerName) return;
      setLoading(true);
      try {
        const editedName = officerName.includes(':') ? officerName : officerName + ':';
        const response = await fetch(`/api/officers/getOfficerByName?name=${encodeURIComponent(editedName)}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const { name, badgeNumber } = await parseOfficer(officerName);
          setOfficer(data);
          setName(name); 
          setEditableNotes(data.notes || "");
          setEditableMediaLinks(data.MediaLinks || "");
          setEditableDepartment(data.department || "");
          setEditableBadgeNumber(badgeNumber || ""); // todo need to pull badge number from name
        }
      } catch (error) {
        console.error("Error fetching officer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficerData();
  }, [officerName]);  

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000); // message disappears after 3 seconds
  
      return () => clearTimeout(timer); // Clear on unmount or before next run
    }
  }, [message]);
  

  const handleSave = async () => {
    if (!officer) return;
    try {
      let appendedName = name + ":"; // reconstruct name + badge #
      if (editableBadgeNumber) {
        appendedName += editableBadgeNumber;
      }
      const response = await fetch("/api/officers/editOfficer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            id: officer.id, 
            name: appendedName,
            notes: editableNotes, 
            MediaLinks: editableMediaLinks, 
            department: editableDepartment, 
            badgeNumber: editableBadgeNumber,
        })
      });
      const responseData = await response.json();
      if (response.ok) {
        setIsEditing(false);
        const updatedOfficer = { ...officer, notes: editableNotes, MediaLinks: editableMediaLinks, department: editableDepartment, badgeNumber: editableBadgeNumber };
        setOfficer(updatedOfficer);
        setMessage({ text: "Changes saved successfully!", type: "success" });
      } else {
        console.error("Error updating officer", responseData);
        setMessage({ text: "Error saving changes, please try again.", type: "error" });
      }
    } catch (error) {
      console.error("Error saving officer data:", error);
      setMessage({ text: "Error saving changes, please try again.", type: "error" });
    }
  };

  const deleteOfficer = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this officer?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/officers/deleteOfficer?id=${officer.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete. Server responded with ${response.status}`);
      }

      alert("Officer successfully deleted! Removing filter...")
      onDelete()

    } catch (error) {
      console.error("Error deleting officer:", error);
      setMessage({ text: "Error deleting officer, please try again.", type: "error" });
    }
  }

  const collapsibleTrigger = (
    <div style={styles.headerBar} onClick={() => setIsOpen(!isOpen)}>
      <span style={styles.officerInfoText}>Officer Information</span>
      <span style={styles.officerNameText}>{name}</span>
      <div style={styles.iconContainer}>
        <MdClose color="red" size={24} onClick={deleteOfficer} />
        <MdOutlineRemoveRedEye style={{ fontSize: "24px", color: isEditing ? "gray" : "#65A3E1", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setIsEditing(false); }} />
        <LuPenLine style={{ fontSize: "24px", color: !isEditing ? "gray" : "#65A3E1", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setIsOpen(true); setIsEditing(true); }} />
        {isOpen ? <FaChevronUp style={{ fontSize: "24px", color: "#65A3E1" }} /> : <FaChevronDown style={{ fontSize: "24px", color: "#65A3E1" }} />}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <Collapsible trigger={collapsibleTrigger} open={isOpen} transitionTime={200}>
        <div style={styles.collapsibleContent}>
          {loading ? (
            <div style={{ color: "#000" }}>Loading officer information...</div>
          ) : (
            <div style={styles.fieldsContainer}> 
              <div style={styles.twoColumnRow}>
                <div style={styles.columnBox}>
                  <div style={styles.columnHeader}>Badge Number</div>
                  <textarea
                    style={styles.columnTextAreaSmall}
                    value={editableBadgeNumber}
                    onChange={(e) => setEditableBadgeNumber(e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div style={styles.columnBox}>
                  <div style={styles.columnHeader}>Department</div>
                  <textarea
                    style={styles.columnTextAreaSmall}
                    value={editableDepartment}
                    onChange={(e) => setEditableDepartment(e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>  
              <div style={styles.twoColumnRow}>
                <div style={styles.columnBox}>
                  <div style={styles.columnHeader}>Notes</div>
                  <textarea
                    style={styles.columnTextArea}
                    value={editableNotes}
                    onChange={(e) => setEditableNotes(e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
                <div style={styles.columnBox}>
                  <div style={styles.columnHeader}>Media Links</div>
                  <textarea
                    style={styles.columnTextArea}
                    value={editableMediaLinks}
                    onChange={(e) => setEditableMediaLinks(e.target.value)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}
          {isEditing && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
              <button onClick={handleSave} style={{ padding: "8px 16px", backgroundColor: "#65A3E1", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Save</button>
            </div>
          )}
          <div>              
            {message.text && (<span style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</span>)}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default OfficerInfo;
