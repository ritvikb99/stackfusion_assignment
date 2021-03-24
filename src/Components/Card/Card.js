import React, { useState } from 'react';
import './Card.css';

const Card = (props) => {
  const { name, id, email, phone, dateofbirth } = props;
  const [isVisible, setIsVisible] = useState(false);
  const onCardClick = () => {
    if (isVisible === false) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  return (
    <div className='tc card dib br3 pa3 ma2 grow bw2 shadow-5' onClick={onCardClick}>
      <img src={`https://robohash.org/${id}?set=set2`} alt={`${name} Profile Pic`} />
      <div>
        <h2>{name}</h2>
        <div className={isVisible ? 'show' : 'hidden'}>
          <p>
            <span style={{ color: 'maroon' }}>Email:</span> {email}
          </p>
          <p>
            <span style={{ color: 'maroon' }}>Phone:</span> {phone}
          </p>
          <p>
            <span style={{ color: 'maroon' }}>Date of Birth:</span> {dateofbirth}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
