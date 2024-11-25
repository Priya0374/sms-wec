import React from "react";
import { FaDownload } from "react-icons/fa";

const DashboardSummary = () => {
  const totalMessages = 905610;
  const connected = 695756;
  const notDelivered = totalMessages - connected;

  // Customer responses (breakdown of connected/delivered cases)
  const interested = 493463;
  const notInterested = 254230;
  const noResponse = connected - (interested + notInterested); // Remaining delivered but no customer response

  return (
    <section className="analytics-summary">
      <div className="card">
        <h3>Total Count</h3>
        <p>{totalMessages.toLocaleString()}</p>
        <small>+15,000 today</small>
      </div>
      <div className="card">
        <h3>Delivered</h3>
        <p>{connected.toLocaleString()}</p>
        <small>+10,000 today</small>
      </div>
      <div className="card">
        <h3>Not Delivered</h3>
        <p>{notDelivered.toLocaleString()}</p>
        <small>Follow-up action required</small>
      </div>
      <div className="card">
        <h3>Interested</h3>
        <p>{interested.toLocaleString()}</p>
        <small>+2,000 today</small>
        <small className="" style={{marginLeft:"12px"}}><FaDownload className="action-icon_download" style={{color:"#0056b !important"}} /></small>
      </div>
      <div className="card">
        <h3>Not Interested</h3>
        <p>{notInterested.toLocaleString()}</p>
        <small>-500 today</small>
      </div>
      <div className="card">
        <h3>No Response</h3>
        <p>{noResponse.toLocaleString()}</p>
        <small>+7,500 today</small>
      </div>
      <div className="card">
        <h3>Collected Amount</h3>
        <p>4,44,116.7</p>
        <small>+100 today</small>
      </div>
    </section>
  );
};

export default DashboardSummary;
