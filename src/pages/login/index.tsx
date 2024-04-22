import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './style.css';
import Navbar from '../navebar';
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', data);
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
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="label">Email:</label>
            <input type="email" id="email" {...register('email', { required: true })} className="input" />
            {errors.email && <span className="error">Email is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password:</label>
            <input type="password" id="password" {...register('password', { required: true })} className="input" />
            {errors.password && <span className="error">Password is required</span>}
          </div>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
