import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import './style.css';

const AddNewBookPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:3001/book/addBook', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Book added successfully:', response.data);


      // Clear the form after successful submission
      reset();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error, display message, etc.
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="form-title">Add New Book</h2>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" id="title" {...register('title', { required: true })} className="form-input" />
          {errors.title && <span className="form-error">Title is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="authorName" className="form-label">Author Name</label>
          <input type="text" id="authorName" {...register('authorName', { required: true })} className="form-input" />
          {errors.authorName && <span className="form-error">Author Name is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="authorName" className="form-label">Publication House</label>
          <input type="text" id="authorName" {...register('publicationHouse', { required: true })} className="form-input" />
          {errors.authorName && <span className="form-error">Publication House is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="authorName" className="form-label">Publication Date</label>
          <input type="text" id="authorName" {...register('publicationDate', { required: true })} className="form-input" />
          {errors.authorName && <span className="form-error">Publication Date is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="authorName" className="form-label">Genre</label>
          <input type="text" id="authorName" {...register('genre', { required: true })} className="form-input" />
          {errors.authorName && <span className="form-error">Genre is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="authorName" className="form-label">Publication Year</label>
          <input type="text" id="authorName" {...register('publicationYear', { required: true })} className="form-input" />
          {errors.authorName && <span className="form-error">Publication Year is required</span>}
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookPage;
