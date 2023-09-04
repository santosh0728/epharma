import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal, message } from 'antd';
import { Formik, Form, Field } from 'formik';
import { setUserDetails } from '@/redux/reducerSlice/users';
import * as Yup from 'yup';
import Header from '../components/header';


const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  newPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmNewPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassForm = ({ handleChangePassword }) => {
  return (

    <div>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={PasswordChangeSchema}
        onSubmit={values => {
          // same shape as initial values
          handleChangePassword(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="currentPassword" type="password" placeholder="Current Password" />
            {errors.currentPassword && touched.currentPassword ? (
              <div>{errors.currentPassword}</div>
            ) : null}
            <Field name="newPassword" type="password" placeholder="New Password" />
            {errors.newPassword && touched.newPassword ? (
              <div>{errors.newPassword}</div>
            ) : null}
            <Field name="confirmNewPassword" type="password" placeholder="Confirm New Password" />
            {errors.confirmNewPassword && touched.confirmNewPassword ? <div>{errors.confirmNewPassword}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
const EditProfileForm = ({ handleEditProfile }) => {
  const { userDetails } = useSelector(state => state.users)
  const AccountUserFields = [
    { value: 'fullname', type: 'text' },
    { value: 'email', type: 'text' },
    { value: 'phoneNumber', type: 'text' },
  ]
  let tempObj = {}
  AccountUserFields.forEach((item) => {
    tempObj[item.value] =
      userDetails[item.value]
  })
  return (

    <div>
      <Formik
       initialValues={{
       fullname:tempObj?.fullname,
       email:tempObj?.email,
       phoneNumber:tempObj?.phoneNumber

      }}

        onSubmit={values => {
          // same shape as initial values
          handleEditProfile(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="fullname"  />
            {errors.fullname && touched.fullname ? (
              <div className="text-sm inline text-red-500">{errors.fullname}</div>
            ) : null}
            <Field name="email" type="email"  />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="phoneNumber" type="text" />
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}


const Profile = () => {
  const [msg, contextHolder] = message.useMessage();
  const { userDetails } = useSelector(state => state.users)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()
  const handleEditProfile = async (values) => {
    try {
      const { confirmPassword, ...formFields } = values
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields)
      };
      const res = await fetch(`http://localhost:5000/users/${userDetails._id}`, requestOptions)
      const data = await res.json();
      if (data && res.status == 200) {
        dispatch(setUserDetails(data))
        setIsAccountModalOpen(false)
      } else {
        msg.info(res.statusText);
      }
    } catch (error) {
      setIsAccountModalOpen(false)
      console.log(error)
    }
  }
  

  const handleChangePassword = async (values) => {
    const { confirmNewPassword, ...formFields } = values
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
    };
    const res = await fetch(`http://localhost:5000/change-password/${userDetails._id}`, requestOptions)
    const data = await res.json();
    if (data && res.status == 200) {
      setIsModalOpen(false)
      msg.info(data.msg)
    } else if (data && res.status == 401) {
      msg.info(data.msg)
    }

  }

  return (
    <>
    <Header/>
      {contextHolder}
      <Card title="Your Profile">
        <Card type="inner" title="User Details"
          extra={
          <button onClick={() => setIsAccountModalOpen(true)}>Edit Profile</button>}>
        
          
          Full Name: {userDetails.fullname}<br />
          Email: {userDetails.email} <br />
          Phone Number: {userDetails.phoneNumber}<br />

        </Card>
        <Modal
          footer={null}
          title="Edit Profile" 
          open={isAccountModalOpen}
          onCancel={() => setIsAccountModalOpen(false)}
          >

          <EditProfileForm handleEditProfile={handleEditProfile} />
        </Modal>


        <Card
          style={{
            marginTop: 16,
          }}
          title="Security"

        >
          <span onClick={() => setIsModalOpen(true)}>Change Password </span><br />
          Delete Account
        </Card>
        <Modal
          footer={null}
          title="Change Password" 
          open={isModalOpen}
         
          onCancel={() => setIsModalOpen(false)}
          >
          <ChangePassForm handleChangePassword={handleChangePassword} />
        </Modal>
      </Card>
    </>
  )
};

export default Profile;
