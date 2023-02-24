import React from 'react';
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // destructing the data from state variable
  const { email, password } = formData;

  // for handling the input value when changing
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // handling the form data
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Log in to get support</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
