import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      login(res.data);
      navigate('/face-detect');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" {...register('email')} className="border w-full p-2 mb-2" />
      <p className="text-red-500">{errors.email?.message}</p>
      <input type="password" placeholder="Password" {...register('password')} className="border w-full p-2 mb-2" />
      <p className="text-red-500">{errors.password?.message}</p>
      <button type="submit" className="bg-blue-600 text-white w-full py-2 mt-3">Login</button>
    </form>
  );
}
