import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });
  // destructing the data from state variable
  const { name, email, password1, password2 } = formData;

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
    if (password1 !== password2) {
      toast.error('Make sure your passowrd is same on both fields');
    }
  };
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
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
              id='password1'
              value={password1}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your password'
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

export default Register;
