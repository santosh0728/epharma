
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';



const { Header, Sider, Content } = Layout;

const Admin = () => {
    const [file, setFile] = useState(null)
    const handleAddProducts = (values) => {
        const data = new FormData()

        Object.entries(values).forEach((item)=>{
            data.append(item[0], item[1])
            })
            data.append('product',file)

        fetch('http://localhost:5000/products',
            {
                method: 'POST',
                body: data
            })
    }
    
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const adminProductSchema = Yup.object().shape({
        productName: Yup.string()
          .min(2, 'Too Short!')
          .max(20, 'Too Long!')
          .required('Required'),
        category: Yup.string()
          .oneOf(["OTC Medicine","Women Choice","Sexual Wellness","Baby Care","Dental care","Prescription Medicine"])
          .required('Required'),
        productPrice: Yup.string()
          .min(2, 'Too Short!')
          .max(20, 'Too Long!')
          .required('Required'),
        productDescription: Yup.string()
          .min(2, 'Too Short!')
          .max(20, 'Too Long!')
          .required('Required'),
        
      });

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
           
                <div className="demo-logo-vertical" />
                
                <Menu
                
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Add Product',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Product Category',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Product Stock',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                
                <Header style={{ padding: 0, background: colorBgContainer }}> 
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    
                </Header>
                
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 585,
                        background: colorBgContainer,
                    }}
                >
                    <div className='add-product'>
                    <h1>Add product</h1>
                    <Formik
                        initialValues={{
                            productName: '',
                            category: '',
                            productPrice: '',
                            productDescription: ''
                        }}
                        validationSchema={adminProductSchema}
                        onSubmit={values => {
                            handleAddProducts(values)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className='form'>
                                    <Field placeholder="Product Name" name="productName" />
                                    {errors.productName && touched.productName ? (
                                        <div>{errors.productName}</div>
                                    ) : null}<br />
                                    <Field component="select" placeholder="Product Category" name="category" >
                                        <option value="">Please Select the category</option>
                                        <option value="OTC Medicine">OTC Medicine</option>
                                        <option value="Women Choice">Women Choice</option>
                                        <option value="Sexual Wellness">Sexual Wellness</option>
                                        <option value="Baby Care">Baby Care</option>
                                        <option value="Dental care">Dental care</option>
                                        <option value="Prescription Medicine">Prescription Medicine</option>
                                    </Field>
                                    {errors.category && touched.category ? (
                                        <div>{errors.category}</div>
                                    ) : null}<br />
                                    <Field placeholder="Product Price" name="productPrice" />
                                    {errors.productPrice && touched.productPrice ? <div>{errors.productPrice}</div> : null}<br />
                                    <Field type="textarea" placeholder="Product Description" name="productDescription" />
                                    {errors.productDescription && touched.productDescription ? <div>{errors.productDescription}</div> : null}<br />
                                    <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
                                  
                                    <button type="submit">Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Admin;

// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';


//  const Admin = () => {

//     const handleAddProducts = (values)=>{
//         fetch('http://localhost:5000/products', 
//         {method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:JSON.stringify(values)})
//     }


//  return (
//   <div>
//     <h1>Add product</h1>
//     <Formik
//       initialValues={{
//         productName: '',
//         category: '',
//         productPrice: '',
//         productDescription: ''
//       }}
//       onSubmit={values => {
//         handleAddProducts(values)
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <div className='form'>
//           <Field placeholder="productName" name="productName" />
//           {errors.productName && touched.productName ? (
//             <div>{errors.productName}</div>
//           ) : null}<br/>
//           <Field placeholder="category" name="category" />
//           {errors.category && touched.category ? (
//             <div>{errors.category}</div>
//           ) : null}<br/>
//           <Field placeholder="productPrice"  name="productPrice"  />
//           {errors.productPrice && touched.productPrice ? <div>{errors.productPrice}</div> : null}<br/>

//           <Field type="textarea" placeholder="productDescription"  name="productDescription" />
//           {errors.productDescription && touched.productDescription ? <div>{errors.productDescription}</div> : null}<br/>
//           <button type="submit">Submit</button>
//           </div>
         
//         </Form>
//       )}
//     </Formik>
//   </div>
// )
// }
// export default Admin