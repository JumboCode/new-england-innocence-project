import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";

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

const OfficerInfo: React.FC<{ officerName: string }> = ({ officerName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [officer, setOfficer] = useState<{
    id: number;
    name: string;
    notes: string | null;
    MediaLinks: string | null;
    department: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [editableNotes, setEditableNotes] = useState("");
  const [editableMediaLinks, setEditableMediaLinks] = useState("");
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" | "" }>({ text: "", type: "" });

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (!officerName) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/officers/getOfficerByName?name=${encodeURIComponent(officerName)}`);
        if (response.ok) {
          const data = await response.json();
          setOfficer(data);
          setEditableNotes(data.notes || "");
          setEditableMediaLinks(data.MediaLinks ? data.MediaLinks.join("\n") : ""); // Convert array to string
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
      const response = await fetch("/api/officers/editOfficer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            id: officer.id, 
            notes: editableNotes, 
            MediaLinks: editableMediaLinks.split("\n").filter(link => link.trim() !== ""),
        })
      });
      const responseData = await response.json();
      if (response.ok) {
        setIsEditing(false);
        const updatedOfficer = { ...officer, notes: editableNotes, MediaLinks: editableMediaLinks };
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

  const collapsibleTrigger = (
    <div style={styles.headerBar} onClick={() => setIsOpen(!isOpen)}>
      <span style={styles.officerInfoText}>Officer Information</span>
      <span style={styles.officerNameText}>{officer?.name || officerName || "Unknown Officer"}</span>
      <span style={styles.officerDepartmentText}>{officer?.department || "Unknown Department"}</span>
      <div style={styles.iconContainer}>
        <MdOutlineRemoveRedEye style={{ fontSize: "24px", color: !isEditing ? "gray" : "#65A3E1", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setIsEditing(false); }} />
        <LuPenLine style={{ fontSize: "24px", color: isEditing ? "gray" : "#65A3E1", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setIsOpen(true); setIsEditing(true); }} />
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
                {isEditing ? (
                  <textarea
                    style={styles.columnTextArea}
                    value={editableMediaLinks}
                    onChange={(e) => setEditableMediaLinks(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <div style={styles.mediaLinks}>
                    {editableMediaLinks
                    .split("\n")
                    .filter(link => link.trim() !== "")
                    .map((link, index, array) => (
                      <span key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#65A3E1"}}
                        >
                          {link}
                        </a>
                        {index < array.length - 1 && <span> , </span>}
                      </span>
                    ))}
                  </div>

                  // <ul style={styles.mediaLinks}>
                  //   {editableMediaLinks.split("\n").map((link, index) => (
                  //     <li key={index}>
                  //       <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "#65A3E1" }}>{link}</a>
                  //     </li>
                  //   ))}
                  // </ul>
                )}
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
