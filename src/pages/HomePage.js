
import React, { useState } from 'react';
import NewsletterCard from '../components/NewsletterCard/NewsletterCard';
import Pagination from '../components/Pagination/Pagination';
import UploadModal from '../components/UploadModal/UploadModal';
import './HomePage.css';

// Import your three images from the assets folder
import previewImage1 from '../assets/images/preview1.png';
import previewImage2 from '../assets/images/preview2.png';
import previewImage3 from '../assets/images/preview3.png';

// Create an array of the images to cycle through
const previewImages = [previewImage1, previewImage2, previewImage3];

// Start with an empty array of newsletters
const initialNewsletters = [];

const HomePage = () => {
  const [newsletters, setNewsletters] = useState(initialNewsletters);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const newslettersPerPage = 3;

  const handleUpload = ({ title, file, date }) => {
    const imageToAssign = previewImages[newsletters.length % previewImages.length];
    const newNewsletter = {
      id: `newsletter-${Date.now()}`,
      title: title,
      pdfFile: file,
      date: date,
      previewImageUrl: imageToAssign,
    };
    setNewsletters(prevNewsletters => [newNewsletter, ...prevNewsletters]);
    setCurrentPage(1);
  };

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastNewsletter = currentPage * newslettersPerPage;
  const indexOfFirstNewsletter = indexOfLastNewsletter - newslettersPerPage;

  // **THE FIX IS ON THIS LINE**: The second argument was wrong.
  const currentNewsletters = filteredNewsletters.slice(indexOfFirstNewsletter, indexOfLastNewsletter);

  const totalPages = Math.ceil(filteredNewsletters.length / newslettersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="home-page">
      <h1>Latest Newsletters</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: '450px' }}>
        {currentNewsletters.map((newsletter) => (
          <NewsletterCard
            key={newsletter.id}
            title={newsletter.title}
            date={newsletter.date}
            pdfFile={newsletter.pdfFile}
            previewImageUrl={newsletter.previewImageUrl}
          />
        ))}
      </div>
      {filteredNewsletters.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <button className="add-button" onClick={() => setModalOpen(true)}>+</button>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default HomePage;