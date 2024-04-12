import React from 'react';
import './Results.css';

const Results = ({ results, searchMade }) => {
    return (
        <div className='resultsContainer'>
            {results.length > 0
                ? results.map((item, index) => (
                      <div key={index} className='resultItem'>
                          <img
                              src={item.image || 'default-image.png'}
                              alt={item.name}
                              className='resultImage'
                          />
                          <div className='resultInfo'>
                              <h3 className='resultTitle'>{item.name}</h3>
                              <p className='resultDescription'>{item.description}</p>
                              <p className='resultArtist'>Artist: {item.artist}</p>
                              <p className='resultReleaseDate'>
                                  Release Date: {item.releaseDate}
                              </p>
                          </div>
                      </div>
                  ))
                : searchMade && <p>No results found</p>}
        </div>
    );
};

export default Results;
