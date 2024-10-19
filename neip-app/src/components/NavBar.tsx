import Link from 'next/link';

const NavBar = () => {
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
}

export default NavBar;
