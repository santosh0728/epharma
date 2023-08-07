
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { message } from 'antd';
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/Logo.png"
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/reducerSlice/users";



const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [msg, contextHolder] = message.useMessage();
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    address: Yup.string()
      .min(5, 'Address Too Short!')
      .max(20, 'Address Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Password Too Short!')
      .required('Required'),
    confirmpassword: Yup.string()
      .min(5, 'Password Too Short!')
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const handleRegister = async (values) => {
    const { confirmpassword, ...formFields } = values
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
    };
    const res = await fetch('http://localhost:5000/signup', requestOptions)
    const data = await res.json()
    if (data && res.status == 200) {
      
      dispatch(setUserDetails(data))
      router.push('/home')
      setTimeout(() => {
        msg.info(data.msg);
      }, 2000);
    } else {
      msg.info(JSON.stringify(res.statusText + ": The entered number has already been registered"));
    }
  }

  return (
    <>
      {contextHolder}
      {/* <Header /> */}
      <div className='container'>
        <div className="app--signup">
          <h2>Sign up</h2>
          <Formik
            initialValues={{
              fullname: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmpassword: '',
              address: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              handleRegister(values)


            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="fullname" placeholder="Full Name" />
                {errors.fullname && touched.fullname ? (
                  <div className="text-sm inline text-red-500">{errors.fullname}</div>
                ) : null}

                <Field name="email" type="email" placeholder="Email" />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}

                <Field name="password" type="password" placeholder="Password" />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}

                <Field name="confirmpassword" type="password" placeholder="Confirm Password" />
                {errors.confirmpassword && touched.confirmpassword ? <div>{errors.confirmpassword}</div> : null}

                <Field name="phoneNumber" type="text" placeholder="Phone Number" />
                {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                <Field name="address" placeholder="Address" />
                {errors.address && touched.address ? (
                  <div>{errors.address}</div>
                ) : null}
                <button type="submit">Signup</button>
              </Form>
            )}
          </Formik>
          <p>Already have an account? <Link href="/login">Log In</Link></p>
        </div>
        <div className="app--logo1">
          <Image
            src={Logo}
            width={400}
            height={400}
            alt="logo"
          ></Image>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Register;
