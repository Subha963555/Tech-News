import React from 'react';

const Card = (props) => {
  return (
    <div className="card" style={{ maxWidth: '18rem', margin: '1rem', height: '33rem' }}>
      <img
        className="card-img-top"
        src={!props.urlToImage ? 'https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?cs=srgb&dl=pexels-francesco-ungaro-396547.jpg&fm=jpg' : props.urlToImage}
        alt="Card cap"
        style={{ height: '200px' }}
      />
      <div className="card-body">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {props.source.name || 'Unknown Source'}
          <span className="visually-hidden">unread messages</span>
        </span>
        <h5 className="card-title">{props.title?.slice(0, 35)}</h5>
        <p className="card-text">{!props.content ? 'Content not found' : props.content.slice(0, 195)}</p>
        <a href={props.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
      <span class="badge rounded-pill text-bg-dark">{props.author}</span>
    </div>
  );
};

export default Card;
