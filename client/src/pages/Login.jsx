import React from 'react';
import { Form, Input, Button } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";

const Login = () => {
    //form handler
    const onFinishHandler = (values) => {
      console.log(values);
    };
  return (
    <div className="form-container">
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h1 className='text-center'>Login Form</h1>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type='email' />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input type='password' />
        </Form.Item>

        <Link to="/register" className='m-2'>Not Registered?</Link>

        <Button className='btn btn-primary' type='primary' htmlType='submit'>
          Login 
        </Button>

      </Form>
    </div>
  )
}

export default Login