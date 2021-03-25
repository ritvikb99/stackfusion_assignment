import React from 'react';
import Card from '../Card/Card';

const CardsList = ({ users }) => {
  if (users === 'no-users-ound') {
    return <h2>No Users Registered Yet</h2>;
  } else {
    let cardsArray = users.map((user) => {
      return <Card key={user.id} id={user.id} name={user.name} email={user.email} phone={user.phone} dateofbirth={user.dateofbirth} />;
    });
    return cardsArray;
  }
};

export default CardsList;
