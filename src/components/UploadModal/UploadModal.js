import React, { useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  // 1. Get today's date and format it to 'YYYY-MM-DD' for the input
  // .toISOString() gives a format like "2024-08-15T10:00:00.000Z"
  // .split('T')[0] splits it at the 'T' and takes the first part: "2024-08-15"
  const todayFormatted = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  // 2. Set the initial state of the date to be today's formatted date
  const [publishDate, setPublishDate] = useState(todayFormatted);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && file && publishDate) {
      onUpload({ title, file, date: publishDate });
      onClose(); // Close the modal
      // 4. Reset fields to their initial state after upload
      setTitle('');
      setFile(null);
      setPublishDate(todayFormatted);
    } else {
      alert('Please fill in all fields: title, date, and file.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Upload New Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Newsletter Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., September 2024 Issue"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Publishing Date</label>
            <input
              type="date"
              id="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              // 3. Set the 'max' attribute to today's date
              // This prevents users from selecting future dates in the calendar picker
              max={todayFormatted}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">PDF File</label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="upload-btn">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;