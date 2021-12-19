import React from 'react';
import {Formik, Form, Field }from 'formik';
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import Alert from '../Components/Alert';
import Spinner from '../Components/Spinner';

const FormCustomer = ({customer, loading}) => {
    const navigate=useNavigate();
    const newCustomerSchema=Yup.object().shape({
        name: Yup.string()
                .min(3, "Name is too short!")
                .max(30, "Name is too long!")
                .required("The customer's name is required!"),
        company:Yup.string()
                    .required("The customer's company is required!"),
        email:Yup.string()
                .email("Email isn't valid!")
                .required("The customer's email address is required!"),
        phone:Yup.number()
                .positive("Number isn't valid!")
                .integer("Number isn't valid!")
                .typeError("Phone number must be a number!")
    })
    const handleSubmit = async(values)=>{
        try{
            let response;
            if(customer.id){
                //Edit record
                const url=`http://localhost:4000/customers/${customer.id}`
                    response = await  fetch(url, {
                    method:'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })               
            }else{
                //new record
                const url='http://localhost:4000/customers'
                    response = await  fetch(url, {
                    method:'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })                
            }
            await response.json()
            navigate('/customers')
        }catch(error){
            console.log(error);
        }
            
    }
    return (
        loading ? <Spinner/> :(
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md 
            md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl
                uppercase text-center">{customer?.name ? 'Edit customer':'Add customer'}</h1>

                <Formik
                    initialValues={{
                        name:customer?.name ?? "",
                        company:customer?.company ?? "",
                        email:customer?.email ?? "",
                        phone:customer?.phone ?? "",
                        notes:customer?.notes ?? ""
                    }}
                    enableReinitialize={true}
                    onSubmit={async(values, {resetForm})=>{
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={newCustomerSchema}
                >
                    {({errors, touched})=>(
                        <Form
                            className="mt-10 "
                        >
                            <div className="mb-4">
                                <label htmlFor="Name" className="text-gray-800">Name:</label>
                                <Field 
                                    id="name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Enter Customer's name" 
                                    name="name"              
                                />
                                {errors.name && touched.name ? (
                                    <Alert>{errors.name}</Alert>
                                ):null}
                            </div>     
                            <div className="mb-4">
                                <label htmlFor="company" className="text-gray-800">Company:</label>
                                <Field 
                                    id="company"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Enter Customer's company"
                                    name="company"                
                                />
                                {errors.company && touched.company ? (
                                    <Alert>{errors.company}</Alert>
                                ):null}
                            </div>  
                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-800">E-mail:</label>
                                <Field 
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Enter Customer's email" 
                                    name="email"              
                                />
                                {errors.email && touched.email ? (
                                    <Alert>{errors.email}</Alert>
                                ):null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="text-gray-800">Number phone:</label>
                                <Field 
                                    id="phone"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Enter Customer's number phone"
                                    name="phone"               
                                />
                                {errors.phone && touched.phone ? (
                                    <Alert>{errors.phone}</Alert>
                                ):null}
                            </div>  
                            <div className="mb-4">
                                <label htmlFor="notes" className="text-gray-800">Notes:</label>
                                <Field 
                                    id="notes"
                                    as="textarea"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Type notes about the customer here!"
                                    name="notes"               
                                />
                            </div>
                            <button 
                                type="submit"
                                className="mt-5 w-full bg-blue-800 p-3 text-white 
                                uppercase font-bold text-lg" 
                            >
                            {customer?.name ? 'Edit customer':'Add customer'}
                            </button>                             
                        </Form>
                    )}
                    
                </Formik>
            </div>
        )
    );
};
FormCustomer.defaultProps = {
    customer:{},
    loading: false
}
export default FormCustomer;