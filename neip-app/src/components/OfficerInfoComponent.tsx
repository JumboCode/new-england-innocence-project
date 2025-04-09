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
  }
};

const OfficerInfo: React.FC<{ officerName: string }> = ({ officerName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [officer, setOfficer] = useState<{
    id: number;
    name: string;
    notes: string | null;
    MediaLinks: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (!officerName) return;
  
      setLoading(true);
      try {
        const response = await fetch(`/api/officers/getOfficerByName?name=${encodeURIComponent(officerName)}`);
        if (response.ok) {
          const data = await response.json();
          setOfficer(data);
        }
      } catch (error) {
        console.error("Error fetching officer data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOfficerData();
  }, [officerName]);

  const displayName = officer?.name || officerName || "Unknown Officer";
  const displayDepartment = officer

  const collapsibleTrigger = (
    <div style={styles.headerBar}>
      <span style={styles.officerInfoText}>Officer Information</span>
      <span style={styles.officerNameText}>{displayName}</span>
      <span style={styles.officerNameText}>{displayName}</span>
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
          {loading ? (
            <div>Loading officer information...</div>
          ) : (
            <div style={styles.twoColumnRow}>
              <div style={styles.columnBox}>
                <div style={styles.columnHeader}>Notes</div>
                <textarea
                  style={styles.columnTextArea}
                  defaultValue={officer?.notes || ""}
                  readOnly
                />
              </div>
              <div style={styles.columnBox}>
                <div style={styles.columnHeader}>Media Links</div>
                <textarea
                  style={styles.columnTextArea}
                  defaultValue={officer?.MediaLinks || ""}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
};

export default OfficerInfo;
