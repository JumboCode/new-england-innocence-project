import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
        name: "Homepage", 
        icon: <img src="/icons/home.svg" alt="Homepage Icon"/>,
        route: "/"
    },
    {
        name: "Add Entry", 
        icon: <img src="/icons/addEntry.svg" alt="Add Entry Icon"/>,
        route: "/addEntry"
    },
    {
        name: "Dashboard", 
        icon: <img src="/icons/home.svg" alt="Dashboard Icon"/>,
        route: "/"
    },
    {
        name: "Account", 
        icon: <img src="/icons/user.svg" alt="Account Icon"/>,
        route: "/account"
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

//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
/* Pseudo Code (TODO, none of them have been done yet)
1. Add placeholders for icons next to each item in the NavBar.

2. Modify the CSS styles so that the NavBar expands on hover.
   a. Set the initial width of the NavBar to show only icons.
   b. When hovering, increase the width and display both icons and text.

3. Implement hover logic:
   a. Use CSS to manage hover styles for expanding and collapsing.
   b. Make sure that when not hovered, only icons are shown.
   
4. Import the NavBar into index.tsx and update index.tsx to include the NavBar
   and display a page component (like LoginPage or Signup).
*/


/* What was done (so far):
1. Render NavBar in index.tsx (done tgt last time)
2. moved the importing NavBar component line to _app.tsx to stop the error
   when rendering (was there before us)
3. Created a "public" folder, and added an "icons" folder in it. 
   Apparently, adding things like icons, images, and fonts to a "public" 
   folder makes the program treat them as static assets, and leads to better 
   performance (it's a commmon practice so I did it).
4. Downloaded the icons from Figma, and added them to "public/icons"
*/