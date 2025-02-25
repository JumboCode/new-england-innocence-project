import React from "react";
import Image from "next/image";
import XlCoseIcon from "../img/close.png";
import AndOr from "./AndOr";
import FilterSelection from "./FilterSelection";

interface OpenFilterSidebar {
    onClose: () => void;
}

const OpenFilterSidebar: React.FC<OpenFilterSidebar> = ({ onClose }) => {
    return (
        <div 
            style={{ 

                backgroundColor: '#0F6A9A',
                color: 'white',
                border: 'none',
                right: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'right',
                fontSize: '11px',
                zIndex: 1000,
                position: 'fixed',
                height: '100vh',
                flexDirection: 'column',
                width: '14%',
                justifyContent: 'flex-start',
            }}
        >
            <button 
              onClick={onClose}
              style={{
                backgroundColor: '#0F6A9A',
                color: 'white',
                padding: '16px 24px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: '11px',
                justifyContent: 'flex-end',
            }}
            >
              Hide filter sidebar
                <Image src={XlCoseIcon} alt="x-close icon" style={{ marginLeft: '12px' }} height="5.21" width="10.42"></Image>
            </button>
        </div>
    );
};

export default OpenFilterSidebar;