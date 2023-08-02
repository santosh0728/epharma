import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Card,Modal } from 'antd';
import { Formik,Form,Field } from 'formik';
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
  });

  const ChangePassForm = () => {
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
            console.log(values);
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
              <Field name="confirmNewPassword" type="password" placeholder="Confirm New Password"/>
              {errors.confirmNewPassword && touched.confirmNewPassword ? <div>{errors.confirmNewPassword}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    )
   }


const Profile= () => {
    const {userDetails}= useSelector(state=>state.users)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit= ()=> {
        alert("submit to backend")
    }
    return(
  <Card title="Your Profile">
    <Card type="inner" title="User Details" extra={<a href="#">Edit</a>}>
     Full Name: {userDetails.fullname}<br/>
     Email: {userDetails.email} <br/>
     Phone Number: {userDetails.phoneNumber}<br/>

    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      title="Security"
      extra={<a href="#">More</a>}
    >
     <span onClick={()=>setIsModalOpen(true)}>Change Password </span><br/>
     Delete Account
    </Card>
    <Modal
    footer={null}
    title="Change Password" open={isModalOpen} onOk={handleSubmit} onCancel={()=>setIsModalOpen(false)} >
      <ChangePassForm/>
      </Modal>
  </Card>
)};

export default Profile;
