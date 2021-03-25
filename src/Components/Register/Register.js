import React, { useState } from 'react';
import './Register.css';
const Register = (props) => {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerDOB, setRegisterDOB] = useState('');
  const [displayMessage, setDisplayMessage] = useState(new Date());
  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onPhoneChange = (event) => {
    setRegisterPhone(event.target.value);
  };

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  };

  const onDOBChange = (event) => {
    setRegisterDOB(event.target.value);
  };

  const onSubmit = () => {
    if (registerEmail === '') {
      setDisplayMessage('no-email');
    } else if (registerName === '') {
      setDisplayMessage('no-name');
    } else if (registerPhone === '') {
      setDisplayMessage('no-phone');
    } else if (registerDOB === '') {
      setDisplayMessage('no-date');
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(registerEmail)) {
      setDisplayMessage('invalid-email');
    } else {
      fetch('https://stackfusion-assignment.herokuapp.com/user-form', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          phone: registerPhone,
          dateofbirth: registerDOB,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === 'unable-to-register') {
            setDisplayMessage('unable-to-register');
          } else if (data === 'email-exists') {
            setDisplayMessage('email-exists');
          } else if (data === 'invalid-phone') {
            setDisplayMessage('invalid-phone');
          } else {
            props.onRequestUsers();
            setDisplayMessage('success');
            let list = document.getElementsByClassName('resetable');
            for (let element of list) {
              element.value = '';
            }
            setTimeout(() => {
              props.changeRoute('displayForms');
            }, 5000);
          }
        });
    }
  };

  return (
    <div>
      <div className='center centerText'>
        {displayMessage === 'success' ? (
          <p className='f5 b success'>
            Thanks for registering {registerName}. We have sent a confirmation mail to {registerEmail}
            <br />
            You will be automatically redirected to the form displaying page in 5 seconds.
          </p>
        ) : (
          <p className='empty' />
        )}
      </div>
      <article className='br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                  Name
                </label>
                <input
                  onChange={onNameChange}
                  className='br3 pa2 input-reset ba bg-transparent hover-white w-100 resetable'
                  type='text'
                  name='name'
                  id='name'
                  required
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className='br3 pa2 input-reset ba bg-transparent hover-white w-100 resetable'
                  type='email'
                  name='email-address'
                  id='email-address'
                  required
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6 No-center' htmlFor='phone'>
                  Phone
                </label>
                <input
                  onChange={onPhoneChange}
                  className='br3 b pa2 input-reset ba bg-transparent hover-white w-100 resetable'
                  type='tel'
                  pattern='[0-9]{10}'
                  name='phone'
                  id='phone'
                  required
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6 No-center' htmlFor='dob'>
                  Date of Birth
                </label>
                <input
                  onChange={onDOBChange}
                  className='br3 b pa2 input-reset ba bg-transparent hover-white w-100 resetable'
                  type='date'
                  placeholder='2003-01-01'
                  max={`${Number(new Date().toISOString().slice(0, 10).split('-')[0]) - 18}-${Number(
                    new Date().toISOString().slice(0, 10).split('-')[1]
                  )}-${Number(new Date().toISOString().slice(0, 10).split('-')[2])}`}
                  name='dob'
                  id='dob'
                  required
                />
              </div>
            </fieldset>
            <div className='center centerText'>
              <input
                onClick={onSubmit}
                className='br-pill b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Register'
              />
            </div>
            <div className='centerText center'>
              {displayMessage === 'invalid-email' ? (
                <p className='error'>Please enter a valid email address </p>
              ) : displayMessage === 'no-email' ? (
                <p className='error'>Please enter your email address </p>
              ) : displayMessage === 'no-phone' ? (
                <p className='error'>Please enter a Phone Number </p>
              ) : displayMessage === 'no-name' ? (
                <p className='error'>Please enter your name </p>
              ) : displayMessage === 'email-exists' ? (
                <p className='error'>There is already an account with this email address.</p>
              ) : displayMessage === 'unable-to-register' ? (
                <p className='error'>Unable to register </p>
              ) : displayMessage === 'no-phone' ? (
                <p className='error'>Please enter a Date of Birth </p>
              ) : displayMessage === 'invalid-phone' ? (
                <p className='error'>Please enter a valid 10 digit phone number </p>
              ) : (
                <p className='empty' />
              )}
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Register;
