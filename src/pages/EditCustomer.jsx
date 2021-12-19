import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCustomer from "../Components/FormCustomer";

const EditCustomer = () => {
    const[customer, setCustomer]=useState({})
    const[loading, setLoading]=useState(true)
    //hook allows you to read params from url for instance the customer's id
    const {id} = useParams()
    useEffect(() =>{
        const getCustomerAPI=async()=>{
            try {
                const url=`http://localhost:4000/customers/${id}`
                const response=await fetch(url)
                const result=await response.json()
                setCustomer(result)
            } catch (error) {
                console.log(error)
            }
            setTimeout(()=>{
                setLoading(!loading)
            }, 1000)        
        }
        getCustomerAPI()
    },[])
    
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Edit customer</h1>
            <p className="mt-3">Use this form to update the customer's information.</p>
            {customer?.name ? (
                <FormCustomer
                    customer={customer}
                    loading={loading}
                />
            ):<p>Customer's Id doesn't exist.</p>}   
        </>
    );
};

export default EditCustomer;