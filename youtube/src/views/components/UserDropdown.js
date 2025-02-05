import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const UserDropdown = ({ onLogout, currentUser }) => {
    if (!currentUser) {
        return null;
    }

    const handleLogout = () => {
        onLogout();
    };

    return (
        <div className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={currentUser.image}
                    alt={currentUser.username}
                    width="32"
                    height="32"
                    className="rounded-circle"
                />
            </a>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" href="#">
                        Profile
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Settings
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;
