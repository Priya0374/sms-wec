import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import "./CampaignDashboard.css";

const CampaignReports = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    campaignName: "",
    channels: [],
    customerData: [],
    messageContent: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  // Toggle Modal
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      fileUpload: e.target.files[0]
    }));
  };

  // Handle Channel Selection
  const handleChannelSelection = (channel) => {
    setFormData((prevData) => ({
      ...prevData,
      channels: prevData.channels.includes(channel)
        ? prevData.channels.filter((c) => c !== channel)
        : [...prevData.channels, channel],
    }));
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const customerData = reader.result.split("\n").map((line) => line.trim());
        setFormData((prevData) => ({
          ...prevData,
          customerData,
        }));
      };
      reader.readAsText(file);
    }
  };

  // Submit Campaign
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add the new campaign to the campaigns list
    const newCampaign = {
      ...formData,
      status: "In Progress",
      createdAt: new Date(),
    };

    setCampaigns((prevData) => [...prevData, newCampaign]);

    // Clear the form
    setFormData({
      campaignName: "",
      channels: [],
      customerData: [],
      messageContent: "",
    });

    // Close Modal
    setModalOpen(false);
  };

  // Filter Campaigns by Date
  const filterCampaignsByDate = () => {
    return campaigns.filter((campaign) => {
      const campaignDate = new Date(campaign.createdAt);
      return campaignDate >= startDate && campaignDate <= endDate;
    });
  };

  return (
    <main className="main-dashboard">
      <header className="dashboard-header">
        <h1>Campaign Reports</h1>
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
          <button id="new-campaign-btn" onClick={handleModalToggle}>
            Create Campaign
          </button>
        </div>
      </header>

      {/* Modal for Creating Campaigns */}
      {isModalOpen && (
       <div id="import-modal" className="modal">
       <div className="modal-content">
         <span className="close-button" onClick={handleModalToggle}>
           &times;
         </span>
         <h2>Import Data</h2>
         <form id="import-form" onSubmit={handleFormSubmit}>
           <div className="form-group">
             <label htmlFor="campaign-name">Campaign Name:</label>
             <select
               id="campaign-name" style={{width:"100%"}}
               name="campaignName"
               value={formData.campaignName}
               onChange={handleInputChange}
               required
             >
                <option value="selected">Please Select</option>
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
           <div className="form-group">
             <label htmlFor="content">Content:</label>
             <select
               id="content"
               name="content"
               value={formData.content}
               onChange={handleInputChange}
               required
               style={{ width: "100%" }}
             >
               <option value="">Select Content</option>
               <option
                 value="a"
                 title="This is a gentle reminder to pay the overdue loan amount."
               >
                 (A) Gentle Reminder
               </option>
               <option
                 value="b"
                 title="Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you."
               >
                 (B) Loan Overdue Warning
               </option>
               <option
                 value="c"
                 title="Defaulting on repayment will damage credit scores like CIBIL, impacting your access to loans or financial help."
               >
                 (C) Credit Score Impact
               </option>
               <option
                 value="d"
                 title="We can help you settle your loan. Keeping default on loan is bad for your credit score."
               >
                 (D) Loan Settlement Help
               </option>
             </select>
           </div>
           <div className="form-group">
             <label htmlFor="date-time">Date and Time:</label>
             <input
               type="datetime-local"
               id="date-time"
               name="dateTime"
               value={formData.dateTime}
               onChange={handleInputChange}
               required
             />
           </div>
           {/* <div className="form-group">
             <label htmlFor="file-upload">Upload File:</label>
               <input
                 type="file"
                 id="file-upload"
                 name="file-upload"
               accept=".csv, .xls, .xlsx"
               onChange={handleFileChange}
               required
             />
           </div> */}
            <div className="form-group">
                <label>Channels:</label>
                <div className="channel-options">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.channels.includes("SMS")}
                      onChange={() => handleChannelSelection("SMS")}
                    />
                    SMS
                  </label>
                  {/* <label>
                    <input
                      type="checkbox"
                      checked={formData.channels.includes("IVR")}
                      onChange={() => handleChannelSelection("IVR")}
                    />
                    IVR
                  </label> */}
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.channels.includes("WhatsApp")}
                      onChange={() => handleChannelSelection("WhatsApp")}
                    />
                    WhatsApp
                  </label>
                </div>
              </div>
             
              <div className="form-group">
                <label htmlFor="customerFile">Upload Customer Data:</label>
                <input
                  type="file"
                  id="customerFile"
                  name="customerFile"
                  accept=".txt, .csv"
                  onChange={handleFileUpload}
                />
              </div>
              <button type="submit">Create Campaign</button>
            </form>
          </div>
        </div>
      )}

      {/* Campaign Table */}
      <section className="campaign-table">
        <h2>Campaigns</h2>
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Channels</th>
              <th>Customers</th>
              <th>Message Content</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
  <tr>
    <td>ACRE BL</td>
    <td>SMS, WhatsApp</td>
    <td>500 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>ACRE SME</td>
    <td>SMS</td>
    <td>300 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>CLIX</td>
    <td>WhatsApp</td>
    <td>200 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin BKT</td>
    <td>SMS, WhatsApp</td>
    <td>400 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin 180+</td>
    <td>SMS</td>
    <td>250 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin 90+</td>
    <td>WhatsApp</td>
    <td>150 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>South Stashfin</td>
    <td>SMS, WhatsApp</td>
    <td>300 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin East</td>
    <td>SMS</td>
    <td>320 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Onecard FSB</td>
    <td>WhatsApp</td>
    <td>220 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Incred Mum</td>
    <td>SMS</td>
    <td>180 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Loantap</td>
    <td>SMS, WhatsApp</td>
    <td>200 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Triumph</td>
    <td>WhatsApp</td>
    <td>250 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Unicard Writeoff</td>
    <td>SMS</td>
    <td>170 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Creditfair</td>
    <td>SMS, WhatsApp</td>
    <td>300 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Fatakpay</td>
    <td>WhatsApp</td>
    <td>210 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>ICICI</td>
    <td>SMS</td>
    <td>400 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>ACRE SME</td>
    <td>SMS</td>
    <td>300 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>CLIX</td>
    <td>WhatsApp</td>
    <td>200 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin BKT</td>
    <td>SMS, WhatsApp</td>
    <td>400 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin 180+</td>
    <td>SMS</td>
    <td>250 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin 90+</td>
    <td>WhatsApp</td>
    <td>150 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>South Stashfin</td>
    <td>SMS, WhatsApp</td>
    <td>300 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Stashfin East</td>
    <td>SMS</td>
    <td>320 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Onecard FSB</td>
    <td>WhatsApp</td>
    <td>220 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Incred Mum</td>
    <td>SMS</td>
    <td>180 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Loantap</td>
    <td>SMS, WhatsApp</td>
    <td>200 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Triumph</td>
    <td>WhatsApp</td>
    <td>250 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Unicard Writeoff</td>
    <td>SMS</td>
    <td>170 Customers</td>
    <td>This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Creditfair</td>
    <td>SMS, WhatsApp</td>
    <td>300 Customers</td>
    <td>Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>Fatakpay</td>
    <td>WhatsApp</td>
    <td>210 Customers</td>
    <td>Defaulting on repayment will damage credit scores like CIBIL. Please pay immediately to improve your score.</td>
    <td>In Progress</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
  <tr>
    <td>ICICI</td>
    <td>SMS</td>
    <td>400 Customers</td>
    <td>We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.</td>
    <td>Completed</td>
    <td>{new Date().toLocaleString()}</td>
  </tr>
</tbody>

        </table>
      </section>
    </main>
  );
};

export default CampaignReports;
