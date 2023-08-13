import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Modal, message } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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

const ChangePassForm = ({handleChangePassword}) => {
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


const Profile = () => {
  const { userDetails } = useSelector(state => state.users)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    alert("submited to backend")
  }
  const [msg, contextHolder] = message.useMessage();

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
      {contextHolder}
      <Card title="Your Profile">
        <Card type="inner" title="User Details" extra={<a href="#">Edit</a>}>
          Full Name: {userDetails.fullname}<br />
          Email: {userDetails.email} <br />
          Phone Number: {userDetails.phoneNumber}<br />

        </Card>
        <Card
          style={{
            marginTop: 16,
          }}
          title="Security"
          extra={<a href="#">More</a>}
        >
          <span onClick={() => setIsModalOpen(true)}>Change Password </span><br />
          Delete Account
        </Card>
        <Modal
          footer={null}
          title="Change Password" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} >
          <ChangePassForm handleChangePassword={handleChangePassword} />
        </Modal>
      </Card>
    </>
  )
};

export default Profile;
