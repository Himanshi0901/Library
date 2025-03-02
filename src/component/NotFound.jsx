import React from "react";
import { Link } from "react-router-dom";

function NotFound () {
    return (
        <>
            <div className="not-found">
                <h1>404</h1>
                <h1>Page Not Found</h1>
                <Link to="/">Go to Home</Link>
            </div>
        </>
    );
};

export default NotFound;