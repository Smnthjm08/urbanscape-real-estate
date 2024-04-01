import React from 'react';
import { Form, Input, Button, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from 'axios';

const Register = () => {
  //form handler
const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try{
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success){
        message.success("Register Successfully!");
        navigate("/login");
      }
      else {
        message.error(res.data.message);
      }
    } catch{
      console.log(error)
      message.error("Something went Wrong")
    }
  };

  return (
    <div className="form-container">
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h1 className='text-center'>Register Form</h1>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input type='text' />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type='email' />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input type='password' />
        </Form.Item>

        <Link to="/login" className='m-2'>Already Registered</Link>

        <Button className='btn btn-primary' type='primary' htmlType='submit'>
          Register
        </Button>

      </Form>
    </div>
  )
}

export default Register;
