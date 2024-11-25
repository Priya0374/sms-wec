import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Add necessary styles

const Settings = ({ onLogout }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
  
    // Toggle Dropdown
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    // Handle Menu Clicks
    const handleMenuClick = (option) => {
      switch (option) {
        case "profile":
          navigate("/admin-profile");
          break;
        case "logout":
          if (onLogout) {
            onLogout(""); // Call the onLogout function
          } else {
            console.error("onLogout function not provided");
          }
          navigate("/"); // Redirect to login page
          break;
        default:
          break;
      }
      setDropdownOpen(false); // Close dropdown
    };
  
    return (
      <div className="settings-container">
        {/* Settings Icon */}
        <div className="settings-icon" onClick={toggleDropdown}>
          ⚙️
        </div>
  
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="settings-dropdown">
            <button onClick={() => handleMenuClick("account")}>Account</button>
            <button onClick={() => handleMenuClick("profile")}>Profile</button>
            <button onClick={() => handleMenuClick("logout")}>Logout</button>
          </div>
        )}
      </div>
    );
  };
  

export default Settings;
