import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IvrDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    dateTime: "",
    content: "",
    fileUpload: null,
  });

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [ivrStats, setIvrStats] = useState({
    totalCalls: 0,
    attendedCalls: 0,
    interested: 0,
    notInterested: 0,
    doubleSms: 0,
    telecallerAssigned: 0,
    totalIvr: 0,
    interestedDelivery: 0,
    notInterestedDelivery: 0,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;

  // Filter and calculate analytics stats when date range or table data changes
  useEffect(() => {
    const filtered = tableData.filter((row) => {
      const rowDate = new Date(row.dateTime);
      return rowDate >= startDate && rowDate <= endDate;
    });
    setFilteredData(filtered);

    // Calculate analytics stats
    const totalIvr = filtered.reduce((sum, campaign) => sum + campaign.stats.totalCalls, 0);
    const interestedDelivery = filtered.reduce((sum, campaign) => sum + campaign.stats.interested, 0);
    const notInterestedDelivery = filtered.reduce(
      (sum, campaign) => sum + campaign.stats.notInterested,
      0
    );

    const totalAttendedCalls = filtered.reduce(
      (sum, campaign) => sum + campaign.stats.attendedCalls,
      0
    );

    const doubleSms = filtered.reduce((sum, campaign) => sum + campaign.stats.doubleSms, 0);

    setIvrStats((prev) => ({
      ...prev,
      totalIvr,
      interestedDelivery,
      notInterestedDelivery,
      attendedCalls: totalAttendedCalls,
      doubleSms,
    }));
  }, [startDate, endDate, tableData]);

  const handleModalToggle = () => setModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      fileUpload: e.target.files[0],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      id: Date.now(),
      campaignName: formData.campaignName,
      dateTime: new Date(formData.dateTime),
      content: formData.content,
      fileUpload: formData.fileUpload ? formData.fileUpload.name : "No file uploaded",
      stats: {
        totalCalls: 0,
        attendedCalls: 0,
        interested: 0,
        notInterested: 0,
        doubleSms: 0,
        telecallerAssigned: 0,
      },
    };

    setTableData((prev) => [...prev, newRow]);
    setFormData({ campaignName: "", dateTime: "", content: "", fileUpload: null });
    setModalOpen(false);
  };





  
  const updateCampaignStats = (campaignId, actionType) => {
    setTableData((prevData) =>
      prevData.map((campaign) => {
        if (campaign.id === campaignId) {
          const updatedStats = { ...campaign.stats };
          updatedStats.totalCalls += 1;
          if (actionType === "attended") updatedStats.attendedCalls += 1;
          if (actionType === "interested") {
            updatedStats.interested += 1;
            updatedStats.doubleSms += 1; // Send double SMS
          }
          if (actionType === "notInterested") {
            updatedStats.notInterested += 1;
            updatedStats.telecallerAssigned += 1; // Assign to telecaller
          }
          return { ...campaign, stats: updatedStats };
        }
        return campaign;
      })
    );
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const filtered = tableData.filter((row) => {
      const rowDate = new Date(row.dateTime);
      return rowDate >= startDate && rowDate <= endDate;
    });
    setFilteredData(filtered);
  
    // Calculate analytics stats
    const totalCalls = 300000; // Assuming a total of 300,000 numbers
    const totalAttendedCalls = filtered.reduce(
      (sum, campaign) => sum + campaign.stats.attendedCalls,
      0
    );
    const interestedDelivery = filtered.reduce((sum, campaign) => sum + campaign.stats.interested, 0);
    const notInterestedDelivery = filtered.reduce(
      (sum, campaign) => sum + campaign.stats.notInterested,
      0
    );
    const doubleSms = filtered.reduce((sum, campaign) => sum + campaign.stats.doubleSms, 0);
    const telecallerAssigned = filtered.reduce(
      (sum, campaign) => sum + campaign.stats.telecallerAssigned,
      0
    );
  
    setIvrStats({
      totalCalls,
      attendedCalls: totalAttendedCalls,
      interested: interestedDelivery,
      notInterested: notInterestedDelivery,
      doubleSms,
      telecallerAssigned,
      totalIvr: totalCalls, // Optional for clarity
    });
  }, [startDate, endDate, tableData]);
  

  return (
    <main className="main-dashboard">
      <header className="dashboard-header">
        <h1>IVR Dashboard</h1>
        <div className="header-actions">
          <div className="date-filter">
            <label> Start Date: </label>
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
          <button id="import-btn" onClick={handleModalToggle}>
            Create IVR Campaign
          </button>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
  <div id="import-modal" className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={handleModalToggle}>
        &times;
      </span>
      <h2>Create IVR Campaign</h2>
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
  style={{width:"100%"}}
>
  <option value="a" title="This is a gentle reminder to pay the overdue loan amount. Press 1 to pay the dues now.">
    <strong>(A)</strong> This is a gentle reminder to pay the overdue loan amount.
  </option>
  <option value="b" title="Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you. Press 1 to pay the dues now.">
   <strong>(B)</strong>  Your loan is overdue. Kindly pay immediately to avoid field recovery team visiting you.
  </option>
  <option value="c" title="Defaulting on repayment will damage credit scores like CIBIL, impacting your access to loans or financial help. Please pay immediately to improve your score.">
  <strong>(c)</strong>Defaulting on repayment will damage credit scores like CIBIL.
  </option>
  <option value="d" title="We can help you settle your loan. Keeping default on loan is bad for your credit score. Please press 1 for a call back.">
    <strong>(D)</strong>We can help you settle your loan. Keeping default on loan is bad for your credit score.
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


      {/* Analytics */}
      {/* <section className="analytics-summary">
        <div className="card"><h3>Total IVR</h3><p>{ivrStats.totalIvr}</p></div>
        <div className="card"><h3>Interested Delivery</h3><p>{ivrStats.interestedDelivery}</p></div>
        <div className="card"><h3>Not Interested Delivery</h3><p>{ivrStats.notInterestedDelivery}</p></div>
        <div className="card"><h3>Attended Calls</h3><p>{ivrStats.attendedCalls}</p></div>
        <div className="card"><h3>Double SMS Sent</h3><p>{ivrStats.doubleSms}</p></div>
      </section> */}

<section className="analytics-summary">
  <div className="card">
    <h3>Total Numbers</h3>
    <p>3,00,000</p>
  </div>
  <div className="card">
    <h3>Attempts Calls</h3>
    {/* <p>{ivrStats.attendedCalls}</p> */}
    <p>
      {/* {(ivrStats.attendedCalls / ivrStats.totalCalls * 100).toFixed(2)}% of total */}
      2,63,000
    </p>
  </div>
  <div className="card">
    <h3>No Response</h3>
    {/* <p>{ivrStats.interested}</p> */}
    <p>
      {/* {(ivrStats.interested / ivrStats.totalCalls * 100).toFixed(2)}% of total */}
      37,000
    </p>
  </div>
  <div className="card">
    <h3>Interested</h3>
    {/* <p>{ivrStats.notInterested}</p> */}
    <p>
      {/* {(ivrStats.notInterested / ivrStats.totalCalls * 100).toFixed(2)}% of total */}
      1,89,000
    </p>
  </div>
  <div className="card">
    <h3>Not Interested</h3>
    {/* <p>{ivrStats.doubleSms}</p> */}
    <p>
      {/* {(ivrStats.doubleSms / ivrStats.totalCalls * 100).toFixed(2)}% of total */}
      1,26,000
    </p>
  </div>

</section>


      {/* Table */}
      <section className="table-container">
        <table>
          <thead>
            <tr>
            <th>Total Sent</th>
              <th>Attempts</th>
              <th>No Response</th>
              <th>Interested</th>
              <th>Not Interested</th>
              <th>Not connected</th>
              <th>Date Created</th>
              
            </tr>
          </thead>
          <tbody>
             {/* {paginatedData.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.campaignName}</td>
                <td>{new Date(campaign.dateTime).toLocaleString()}</td>
                <td>{campaign.content}</td>
                <td>{campaign.fileUpload}</td>
                <td>
                  <button onClick={() => updateCampaignStats(campaign.id, "attended")}>
                    Attended
                  </button>
                  <button onClick={() => updateCampaignStats(campaign.id, "interested")}>
                    Interested
                  </button>
                  <button onClick={() => updateCampaignStats(campaign.id, "notInterested")}>
                    Not Interested
                  </button>
                </td>
                <td>
                  <p>Total Calls: {campaign.stats.totalCalls}</p>
                  <p>Attended: {campaign.stats.attendedCalls}</p>
                  <p>Interested: {campaign.stats.interested}</p>
                  <p>Not Interested: {campaign.stats.notInterested}</p>
                  <p>Double SMS: {campaign.stats.doubleSms}</p>
                </td>
              </tr>
            ))} */}



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
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default IvrDashboard;
