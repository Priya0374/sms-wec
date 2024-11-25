import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";


const SMSDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    campaignName: "",
    messageContent: "",
    recipients: [],
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      fileUpload: e.target.files[0]
    }));
  };


  // Simulate SMS Delivery
  const simulateSMSDelivery = (recipients) => {
    return recipients.map((recipient) => ({
      number: recipient,
      status: Math.random() > 0.2 ? "Delivered" : "Failed", // 80% delivery success
      interested: Math.random() > 0.5, // 50% interested if delivered
    }));
  };

  // Add initial campaigns on page load
  useEffect(() => {
    const initialCampaigns = [
      {
        campaignName: "Campaign 1",
        messageContent: "Welcome to our service! Enjoy 20% off.",
        recipients: ["1234567890", "9876543210", "1122334455"],
        createdAt: new Date("2024-11-01"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },

      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899","2233445566", "9988776655", "5566778899","2233445566", "9988776655", "5566778899","2233445566", "9988776655", "5566778899"],

        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },
      {
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },{
        campaignName: "Campaign 2",
        messageContent: "Hurry up! Limited time offer!",
        recipients: ["2233445566", "9988776655", "5566778899"],
        createdAt: new Date("2024-11-10"),
      },

    ];

    const campaignsWithData = initialCampaigns.map((campaign) => {
      const deliveryData = simulateSMSDelivery(campaign.recipients);
      const totalSent = deliveryData.length;
      const delivered = deliveryData.filter((sms) => sms.status === "Delivered").length;
      const interested = deliveryData.filter((sms) => sms.interested && sms.status === "Delivered").length;
      const notInterested = delivered - interested;

      return {
        ...campaign,
        totalSent,
        delivered,
        interested,
        notInterested,
        deliveryData,
      };
    });

    setCampaigns(campaignsWithData);
  }, []);

  // Handle Modal Toggle
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

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const recipients = reader.result.split("\n").map((line) => line.trim());
        setFormData((prevData) => ({
          ...prevData,
          recipients,
        }));
      };
      reader.readAsText(file);
    }
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const deliveryData = simulateSMSDelivery(formData.recipients);

    const totalSent = deliveryData.length;
    const delivered = deliveryData.filter((sms) => sms.status === "Delivered").length;
    const interested = deliveryData.filter((sms) => sms.interested && sms.status === "Delivered").length;
    const notInterested = delivered - interested;

    const newCampaign = {
      campaignName: formData.campaignName,
      messageContent: formData.messageContent,
      totalSent,
      delivered,
      interested,
      notInterested,
      createdAt: new Date(),
      deliveryData,
    };

    setCampaigns((prevData) => [...prevData, newCampaign]);

    setFormData({
      campaignName: "",
      messageContent: "",
      recipients: [],
    });

    setModalOpen(false);
  };

  // Filter Campaigns by Date
  const filterCampaignsByDate = () => {
    return campaigns.filter((campaign) => {
      const campaignDate = new Date(campaign.createdAt);
      return campaignDate >= startDate && campaignDate <= endDate;
    });
  };

  // Calculate Totals
  const calculateTotals = (key) => {
    return campaigns.reduce((sum, campaign) => sum + campaign[key], 0);
  };

  return (
    <main className="main-dashboard">
      <header className="dashboard-header">
        <h1>SMS Dashboard</h1>
        <div className="header-actions">
          <div className="date-filter">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
            />
            <label>End Date:</label>
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
          <button id="new-sms-campaign-btn" onClick={handleModalToggle}>
            Create SMS Campaign
          </button>
        </div>
      </header>

      {isModalOpen && (
  <div id="import-modal" className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={handleModalToggle}>
        &times;
      </span>
      <h2> Create SMS Campaign</h2>
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
        <div className="form-group">
          <label htmlFor="file-upload">Upload File:</label>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" id="process-btn">
            Process
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <section className="analytics-summary">
        <div className="card">
          <h3>Total Sent</h3>
          {/* <p>{calculateTotals("totalSent")}</p> */}
          <p>3,38,610</p>
        </div>
        <div className="card">
          <h3>Delivered</h3>
          {/* <p>{calculateTotals("delivered")}</p> */}
          <p>2,56,300</p>
        </div>
        <div className="card">
          <h3>Not Delivered</h3>
          {/* <p>{calculateTotals("notDelivered")}</p> */}
          <p>82,310</p>
        </div>
        <div className="card">
          <h3>Interested</h3>
          {/* <p>{calculateTotals("interested")}</p> */}
          <p>1,80,770</p>
        </div>
        <div className="card">
          <h3>Not Interested</h3>
          {/* <p>{calculateTotals("notInterested")}</p> */}
          <p>75,530</p>
        </div>
      </section>

      <section className="campaign-table">
       
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              {/* <th>Message Content</th> */}
              <th>Total Sent</th>
              <th>Delivered</th>
              <th>Not Delivered</th>
              <th>Interested</th>
              <th>Not Interested</th>
              <th>Date Created</th>
            </tr>
          </thead>
          {/* <tbody>
            {filterCampaignsByDate().map((campaign, index) => (
              <tr key={index}>
                <td>{campaign.campaignName}</td>
                <td>{campaign.messageContent}</td>
                <td>{campaign.totalSent}</td>
                <td>{campaign.delivered}</td>
                <td>{campaign.interested}</td>
                <td>{campaign.notInterested}</td>
                <td>{new Date(campaign.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody> */}
          {/* <tbody>
          <tr>
  <td>fatak pay 160+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>fatak pay 160+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>ACRE BL</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>fatak pay 160+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>ACRE BL</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>fatak pay 160+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>ACRE BL</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>ACRE SME</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>CLIX</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>Stashfin 90+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>South Stashfin</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>
<tr>
  <td>fatak pay 160+</td>
  <td>4500</td>
  <td>3400</td>
  <td>2300</td>
  <td>1100</td>
  <td>01-11-24</td>
 
</tr>

          </tbody> */}


<tbody>
    {[
      { name: "ACRE BL", totalSent: 5000, deliveredPercent: 80, interestedPercent: 70 },
      { name: "ACRE SME", totalSent: 4500, deliveredPercent: 75, interestedPercent: 65 },
      { name: "CLIX", totalSent: 4200, deliveredPercent: 78, interestedPercent: 68 },
      { name: "Stashfin BKT", totalSent: 4600, deliveredPercent: 72, interestedPercent: 62 },
      { name: "Stashfin 180+", totalSent: 5000, deliveredPercent: 85, interestedPercent: 75 },
      { name: "Stashfin 90+", totalSent: 4800, deliveredPercent: 70, interestedPercent: 60 },
      { name: "South Stashfin", totalSent: 5100, deliveredPercent: 76, interestedPercent: 66 },
      { name: "Stashfin East", totalSent: 4400, deliveredPercent: 74, interestedPercent: 64 },
      { name: "Onecard FSB", totalSent: 4700, deliveredPercent: 82, interestedPercent: 72 },
      { name: "Incred Mum", totalSent: 4300, deliveredPercent: 77, interestedPercent: 67 },
      { name: "Loantap", totalSent: 4900, deliveredPercent: 79, interestedPercent: 69 },
      { name: "Triumph", totalSent: 4500, deliveredPercent: 73, interestedPercent: 63 },
      { name: "Unicard Writeoff", totalSent: 5200, deliveredPercent: 80, interestedPercent: 70 },
      { name: "Creditfair", totalSent: 4800, deliveredPercent: 76, interestedPercent: 66 },
      { name: "Fatakpay", totalSent: 4700, deliveredPercent: 78, interestedPercent: 68 },
      { name: "ICICI", totalSent: 4900, deliveredPercent: 82, interestedPercent: 72 },
      { name: "ACRE BL", totalSent: 5000, deliveredPercent: 80, interestedPercent: 70 },
      { name: "ACRE SME", totalSent: 4500, deliveredPercent: 75, interestedPercent: 65 },
      { name: "CLIX", totalSent: 4200, deliveredPercent: 78, interestedPercent: 68 },
      { name: "Stashfin BKT", totalSent: 4600, deliveredPercent: 72, interestedPercent: 62 },
      { name: "Stashfin 180+", totalSent: 5000, deliveredPercent: 85, interestedPercent: 75 },
      { name: "Stashfin 90+", totalSent: 4800, deliveredPercent: 70, interestedPercent: 60 },
      { name: "South Stashfin", totalSent: 5100, deliveredPercent: 76, interestedPercent: 66 },
      { name: "Stashfin East", totalSent: 4400, deliveredPercent: 74, interestedPercent: 64 },
      { name: "Onecard FSB", totalSent: 4700, deliveredPercent: 82, interestedPercent: 72 },
      { name: "Incred Mum", totalSent: 4300, deliveredPercent: 77, interestedPercent: 67 },
      { name: "Loantap", totalSent: 4900, deliveredPercent: 79, interestedPercent: 69 },
      { name: "Triumph", totalSent: 4500, deliveredPercent: 73, interestedPercent: 63 },
      { name: "Unicard Writeoff", totalSent: 5200, deliveredPercent: 80, interestedPercent: 70 },
      { name: "Creditfair", totalSent: 4800, deliveredPercent: 76, interestedPercent: 66 },
      { name: "Fatakpay", totalSent: 4700, deliveredPercent: 78, interestedPercent: 68 },
      { name: "ICICI", totalSent: 4900, deliveredPercent: 82, interestedPercent: 72 },



    ].map((campaign, index) => {
      const delivered = Math.round(campaign.totalSent * (campaign.deliveredPercent / 100));
      const notDelivered = campaign.totalSent - delivered;
      const interested = Math.round(delivered * (campaign.interestedPercent / 100));
      const notInterested = delivered - interested;
      const createdAt = new Date().toLocaleDateString();

      return (
        <tr key={index}>
          <td>{campaign.name}</td>
          <td>{campaign.totalSent}</td>
          <td>{delivered}</td>
          <td>{notDelivered}</td>
          <td>{interested}</td>
          <td>{notInterested}</td>
          <td>{createdAt}</td>
        </tr>
      );
    })}
  </tbody>

        </table>
      </section>
    </main>
  );
};

export default SMSDashboard;
