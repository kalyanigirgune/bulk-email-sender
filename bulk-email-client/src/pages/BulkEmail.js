import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BulkEmail = () => {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState("");

  const sendEmails = async () => {
    const emailList = emails.split(",").map((email) => email.trim());
    const formData = new FormData();
    formData.append("emails", JSON.stringify(emailList));
    formData.append("subject", subject);
    formData.append("message", message);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      const response = await fetch("http://localhost:5000/send-bulk-email", {
        method: "POST",
        body: formData, // Send as FormData
      });

      const data = await response.json();
      setStatus(data.success || data.error);
    } catch (error) {
      setStatus("Failed to send emails.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "30rem" }}>
        <h2 className="text-center mb-4">Send Bulk Emails</h2>
        <form>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter multiple emails, separated by commas"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              value={message}
              onChange={setMessage}
              placeholder="Enter your message..."
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={sendEmails}
          >
            Send Mail
          </button>
          {status && <p className="text-center text-danger mt-3">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default BulkEmail;
