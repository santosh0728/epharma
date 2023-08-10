import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import { message } from 'antd';
import Header from '../components/header';
import Footer from '../components/footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/redux/reducerSlice/users';

const Login = () => {
  const router = useRouter()
  const [msg, contextHolder] = message.useMessage();
  const dispatch = useDispatch()
  const handleLogin = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    const res = await fetch('http://localhost:5000/login', requestOptions)
    const data = await res.json()
    if (data && res.status == 200&& data.success) {

      dispatch(setUserDetails(data))
      router.push('/home')
      setTimeout(() => {
        msg.info(data.msg);
      }, 2000);
    } else {
      msg.info(JSON.stringify(res.statusText + ": ERROR"));
    }
  }

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    password: Yup.string().required('Required')
  });
  return (
    <>
      {contextHolder}
      <Header />
      <div className='container'>
        <div className="app--login">
          <h2>Please Login </h2>
          <Formik
            initialValues={{
              phoneNumber: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={values => {
              // same shape as initial values
              handleLogin(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="phoneNumber" placeholder="Phone Number" />
                {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                <Field name="password" type="password" placeholder="Password" />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                <button type="submit">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login;