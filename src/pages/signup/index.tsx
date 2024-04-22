import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import './style.css'; // Import the CSS file
import Navbar from '../navebar';
import axios from 'axios';


const SignupPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data: any) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', data);
      console.log('Login successful:', response.data);
      localStorage.setItem('accessToken', response.data.token);

      // Redirect to dashboard or handle success as needed
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, display message, etc.
    }
  };

  return (
    <>
     <Navbar isAuthenticated={false} />
    <div className="container">
      <div className="card">
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="label">Email:</label>
            <input type="email" id="email" {...register('email', { required: true })} className="input" />
            {errors.email && <span className="error">Email is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="label">Name:</label>
            <input type="text" id="name" {...register('name', { required: true })} className="input" />
            {errors.name && <span className="error">Name is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="label">Phone No:</label>
            <input type="number" id="phone" {...register('phone', { required: true })} className="input" />
            {errors.phone && <span className="error">Phone No is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password:</label>
            <input type="password" id="password" {...register('password', { required: true })} className="input" />
            {errors.password && <span className="error">Password is required</span>}
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
