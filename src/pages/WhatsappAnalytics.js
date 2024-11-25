import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa";
import {FaEdit} from  "react-icons/fa"

const WhatsappAnalytics = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    messageContent: "",
    recipientNumber: "",
    campaignName: "",
    content: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [messageData, setMessageData] = useState([]);
  const [analytics, setAnalytics] = useState({
    sent: 0,
    delivered: 0,
    interested: 0,
    notInterested: 0,
  });
  const totalMessages = 267000;

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      ...formData,
      status: "Sent",
      timestamp: new Date(),
    };

    setMessageData((prevData) => [...prevData, newMessage]);

    setAnalytics((prevAnalytics) => ({
      ...prevAnalytics,
      sent: prevAnalytics.sent + 1,
    }));

    setFormData({
      messageContent: "",
      recipientNumber: "",
      campaignName: "",
      content: "",
    });
  };

  const updateMessageStatus = (index, status) => {
    const updatedMessages = [...messageData];
    const previousStatus = updatedMessages[index].status;
    updatedMessages[index].status = status;

    const updatedAnalytics = { ...analytics };

    if (previousStatus && updatedAnalytics[previousStatus.toLowerCase()] > 0) {
      updatedAnalytics[previousStatus.toLowerCase()] -= 1;
    }

    updatedAnalytics[status.toLowerCase()] =
      (updatedAnalytics[status.toLowerCase()] || 0) + 1;

    setMessageData(updatedMessages);
    setAnalytics(updatedAnalytics);
  };

  const filterMessagesByDate = () => {
    return messageData.filter((message) => {
      const messageDate = new Date(message.timestamp);
      return messageDate >= startDate && messageDate <= endDate;
    });
  };

  const calculatePercentage = (count) =>
    ((count / totalMessages) * 100).toFixed(2);

  return (
    <main className="main-dashboard">
      <header className="dashboard-header">
        <h1>WhatsApp Analytics</h1>
        <div className="header-actions">
          <div className="date-filter">
            <label>Start Date: </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
            />
            <label>End Date: </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <button id="export-btn" onClick={handleModalToggle}>
            Send WhatsApp Message
          </button>
        </div>
      </header>

   {/* Modal Structure for Sending WhatsApp Messages */}
   {isModalOpen && (
        <div id="import-modal" className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleModalToggle}>
              &times;
            </span>
            <h2>Send WhatsApp Message</h2>
            <form id="filter-form" onSubmit={handleFormSubmit}>
              {/* Campaign Filter */}
              <div className="form-group">
                <label htmlFor="campaign-name">Campaign Name:</label>
                <select
                  id="campaign-name"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Campaign</option>
                  <option value="ACRE BL">ACRE BL</option>
                  <option value="ACRE SME">ACRE SME</option>
                  <option value="CLIX">CLIX</option>
                  <option value="Stashfin BKT">Stashfin BKT</option>
                  <option value="Stashfin 180+">Stashfin 180+</option>
                  <option value="Stashfin 90+">Stashfin 90+</option>
                  <option value="South Stashfin">South Stashfin</option>
                  <option value="Stashfin East">Stashfin East</option>
                  <option value="Onecard FSB">Onecard FSB</option>
                  <option value="Incred Mum">Incred Mum</option>
                  <option value="Loantap">Loantap</option>
                  <option value="Triumph">Triumph</option>
                  <option value="Unicard Writeoff">Unicard Writeoff</option>
                  <option value="Creditfair">Creditfair</option>
                  <option value="Fatakpay">Fatakpay</option>
                  <option value="ICICI">ICICI</option>
                </select>
              </div>

              {/* Content Filter */}
              <div className="form-group">
                <label htmlFor="content">Content:</label>
                <select
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Content</option>
                  <option value="a">Gentle Reminder</option>
                  <option value="b">Loan Overdue Warning</option>
                  <option value="c">Credit Score Impact</option>
                  <option value="d">Loan Settlement Help</option>
                </select>
              </div>

              {/* Recipient Number */}
              <div className="form-group">
                <label htmlFor="recipientNumber">
                  Recipient Number (10-digit):
                </label>
                <input
                  type="text"
                  id="recipientNumber"
                  name="recipientNumber"
                  value={formData.recipientNumber}
                  onChange={(e) => {
                    // Allow only numbers
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={10}
                  placeholder="Enter recipient number"
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" id="apply-filter-btn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
        <section class="analytics-summary">
          <div className="card">
            <h3>Total Messages</h3>
            <p>
              2,67,000
              {/* {totalMessages} */}
              </p>
          </div>
          <div className="card">
            <h3>Sent</h3>
            <p>
              1,96,000
              {/* {analytics.sent} ({calculatePercentage(analytics.sent)}%) */}
            </p>
          </div>
          <div className="card">
            <h3>Delivered</h3>
            <p>
              1,76,456
              {/* {analytics.delivered} ({calculatePercentage(analytics.delivered)}%) */}
            </p>
          </div>
          <div className="card">
            <h3>Interested</h3>
            <p>
              1,23,693
              {/* {analytics.interested} (
              {calculatePercentage(analytics.interested)}%) */}
            </p>
          </div>
          <div className="card">
            <h3>Not Interested</h3>
            <p>
              52,700
              {/* {analytics.notInterested} (
              {calculatePercentage(analytics.notInterested)}%) */}
            </p>
          </div>
          
        </section>
    
      <section>
        <div className="table-container">
          <table id="message-table" className="data-table">
            <thead>
              <tr>
                <th>Message Content</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Actions</th>
              
              </tr>
            </thead>
            <tbody>
            <tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>


        <tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>

        <tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>

        <tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr><tr>
          <td>Loan Overdue Warning</td>
          <td>9876543210</td>
          <td>Sent</td>
          <td>2024/11/25, 10:30 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Gentle Reminder</td>
          <td>9123456789</td>
          <td>Delivered</td>
          <td>2024/11/24, 3:45 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
          {/* <td>
            <button onClick={() => alert("Marked as Delivered")}>
              Delivered
            </button>
            <button onClick={() => alert("Marked as Interested")}>
              Interested
            </button>
            <button onClick={() => alert("Marked as Not Interested")}>
              Not Interested
            </button>
          </td> */}
        </tr>
        <tr>
          <td>Credit Score Impact</td>
          <td>9876543211</td>
          <td>Interested</td>
          <td>2024/11/23, 1:15 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Settlement Help</td>
          <td>9998887776</td>
          <td>Not Interested</td>
          <td>2024/11/22, 4:10 PM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td>Loan Overdue Warning</td>
          <td>9988776655</td>
          <td>Sent</td>
          <td>2024/11/21, 9:20 AM</td>
          <td>
           <button title="Download" style={{display:"inline", margin:"11px"}}>
              <FaDownload className="action-icon" />
            </button>
            <button title="Edit">
              <FaEdit className="action-icon" />
            </button>
          </td>
        </tr>




            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default WhatsappAnalytics;
