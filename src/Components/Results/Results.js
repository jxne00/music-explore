import React from 'react';
import './Results.css';

const Results = ({ results, searchMade }) => {
    return (
        <div className='resultsContainer'>
            {searchMade && Object.keys(results).length > 0
                ? Object.entries(results).map(([section, items]) => (
                      <div key={section} className='resultsSection'>
                          <h2 className='sectionTitle'>
                              {section.charAt(0).toUpperCase() + section.slice(1)}
                          </h2>
                          {items.map((item, index) => (
                              <div key={index} className='resultItem'>
                                  <img
                                      src={item.image || 'default-image.png'}
                                      alt={item.name}
                                      className='resultImage'
                                  />
                                  <div className='resultInfo'>
                                      <h3 className='resultTitle'>{item.name}</h3>
                                      <p className='resultArtist'>
                                          Artist: {item.artist}
                                      </p>
                                      <p className='resultReleaseDate'>
                                          Release Date: {item.releaseDate}
                                      </p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ))
                : searchMade && <p>No results found</p>}
        </div>
    );
};

export default Results;
