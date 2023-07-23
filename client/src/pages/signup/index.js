
import React from "react";
import { Formik,Form,Field } from "formik";
import * as Yup from 'yup';
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";



const Register = () => {
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

      const handleRegister=async(values)=>{
        const{confirmpassword,...formFields}=values
          const requestOptions={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formFields)
          };
          await fetch('http://localhost:4000/signup',requestOptions)
      }

    return(
        <>
        <Header/>
      <div className='container'> 
      <div className="app--login">
        <h2>Sign up</h2>
        <Formik
         initialValues={{
            fullname: '',
            email: '',
            phoneNumber: '',
            password:'',
            confirmpassword:'',
            address:''
         }}
         validationSchema={SignupSchema}
         onSubmit={values => {
          handleRegister(values)
          
          
         }}
       >
         {({ errors, touched }) => (
           <Form>
             <Field name="fullname" placeholder="Full Name"/>
             {errors.fullname && touched.fullname ? (
               <div>{errors.fullname}</div>
             ) : null}
             
             <Field name="email" type="email" placeholder="Email"/>
             {errors.email && touched.email ? <div>{errors.email}</div> : null}
             <Field name="password" type="password" placeholder="Password"/>
             {errors.password && touched.password ? <div>{errors.password}</div> : null}
             <Field name="confirmpassword" type="password" placeholder="Confirm Password"/>
             {errors.confirmpassword && touched.confirmpassword ? <div>{errors.confirmpassword}</div> : null}
             <Field name="phoneNumber" type="text" placeholder="Phone Number"/>
             {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
             <Field name="address" placeholder="Address"/>
             {errors.address && touched.address ? (
               <div>{errors.address}</div>
             ) : null}
             <button type="submit">Signup</button>
           </Form>
         )}
       </Formik>
        <p>Already have an account? <Link href="/login">Log In</Link></p>
      </div>
      </div>
      <Footer/>
      </>
    )
  }

export default Register;
