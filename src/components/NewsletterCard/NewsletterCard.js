
import React from 'react';
import './NewsletterCard.css';

// NOTE: All 'react-pdf' and 'useEffect' imports are gone!

const NewsletterCard = ({ title, date, pdfFile, previewImageUrl }) => {
  // Create a temporary URL for the 'Read More' button link from the uploaded file.
  const readMoreUrl = pdfFile ? URL.createObjectURL(pdfFile) : '#';

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <div className="newsletter-card">
      <div className="newsletter-image-container">
        {/* This is now just a simple image tag. It will always have a source. */}
        <img src={previewImageUrl} alt={`${title} preview`} className="preview-image" />
      </div>
      <div className="newsletter-content">
        <h3>{title}</h3>
        {formattedDate && <p className="publish-date">{formattedDate}</p>}
        <a href={readMoreUrl} target="_blank" rel="noopener noreferrer" className="read-more-btn">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsletterCard;