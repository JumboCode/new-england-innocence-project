import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from "next/router";

/*const NavItem = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/add-entry">Add Entry</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/account">Account</Link></li>
            </ul>
        </nav>
    );
}*/

interface NavItem {
    name: string;
    icon: JSX.Element; 
    route: string;
}

// Sample nav items array
const navItems: NavItem[] = [
    {
        name: "Database", 
        icon: <img src="/icons/dashboard.svg" alt="Dashboard Icon"/>,
        route: "/"
    },
    {
        name: "Manage Users", 
        icon: <img src="/icons/user.svg" alt="User Icon"/>,
        route: "/ManageUsers"
    },
    {
        name: "Settings", 
        icon: <img src="/icons/settings.svg" alt="Settings Icon"/>,
        route: "/Settings"
    }
];

const NavBar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
  
    // Toggle navbar expansion on hover
    const handleMouseEnter = () => setExpanded(true);
    const handleMouseLeave = () => setExpanded(false);
  
    return (
        <div
          className={`nav-container ${expanded ? "expanded" : "collapsed"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
            {navItems.map((item) => (
                <div
                    key={item.name}
                    className={`nav-item ${router.pathname === item.route ? "active" : ""}`}
                >
                    <Link href={item.route} className="nav-link">
                    <div className="icon-wrapper">{item.icon}</div>
                    {expanded && <span className="nav-item-text">{item.name}</span>}
                    </Link>
                </div>
            ))}
        </div>
      );
};

export default NavBar;
