import './App.css';
import { useState, useEffect } from 'react';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import CardsList from './Components/CardsList/CardsList';
import SearchBox from './Components/SearchBox/SearchBox';
import { connect } from 'react-redux';
import Scroll from './Components/Scroll/Scroll';
import { setSearchField, requestUsers } from './actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchUsers.searchField,
    users: state.requestUsers.users,
    error: state.requestUsers.error,
    isPending: state.requestUsers.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => {
      dispatch(setSearchField(event.target.value));
    },
    onRequestUsers: () => {
      dispatch(requestUsers()); //requestUsers(dispatch)    ALT
    },
  };
};

const App = (props) => {
  useEffect(() => {
    props.onRequestUsers();
    // eslint-disable-next-line
  }, []);

  const [route, setRoute] = useState('register');
  const changeRoute = (route) => {
    if (route === 'register') {
      setRoute('register');
    } else {
      setRoute('displayForms');
    }
  };
  let filteredUsers = props.users.filter((user) => {
    return user.name.toLowerCase().includes(props.searchField.toLowerCase());
  });
  return (
    <div className='App'>
      <Navigation />
      <div className='nav'>
        <button
          className='f6 grow no-underline br-pill ph3 pv2 mb2 dib near-black bg-white'
          onClick={() => changeRoute('displayForms')}
        >
          Show users
        </button>
        <button
          style={{ marginLeft: 'auto' }}
          className='f6 grow no-underline br-pill ph3 pv2 mb2 dib near-black bg-white'
          onClick={() => changeRoute('register')}
        >
          Register
        </button>
      </div>
      {route === 'register' ? <Register onRequestUsers={props.onRequestUsers} changeRoute={changeRoute} /> : <br />}
      {route === 'displayForms' ? (
        <div className='centerText'>
          <SearchBox searchChange={props.onSearchChange} />
          <hr />
          <Scroll>
            <CardsList users={filteredUsers} />
          </Scroll>
        </div>
      ) : (
        <br />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
