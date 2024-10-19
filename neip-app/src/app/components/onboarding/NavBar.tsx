"use client";
import { Link, Route, Router } from "wouter";
import Account from "@/app/pages/Account";
import AddEntry from "@/app/pages/AddEntry";
import Dashboard from "@/app/pages/Dashboard";
import Homepage from "@/app/pages/Homepage";

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Add-Entry">Add Entry</Link></li>
                    <li><Link to="/Dashboard">Dashboard</Link></li>
                    <li><Link to="/Account">Account</Link></li>
                </ul>
            </nav >

            <Router>
                <Route path="/" component={Homepage} />
                <Route path="/Add-Entry" component={AddEntry} />
                <Route path="/Account" component={Account} />
                <Route path="/Dashboard" component={Dashboard} />

                {/* Shows a 404 error if the path doesn't match anything */}

                <Route>
                    <p className="p-4">404: Page Not Found</p>
                </Route>
            </Router>

        </>

    )
}

export default NavBar;
