import React from "react";
import Image from "next/image";
import mag from "../img/Search.png"


const SearchBox: React.FC = () => {
    const searchbox_style = {
        width: '252px',
        height: '30px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '1px solid #D3D3D3',
        marginTop: '5px',
        marginLeft: '93px',
    };

    const span_style = {
        color: '#B6B5B5',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
    }

    return (
        <section style={searchbox_style}>
            <span style={span_style}>Search</span>
            <Image src={mag} alt="Magnifying Glass" width="20" height="20" />
        </section>
    )
};

export default SearchBox;