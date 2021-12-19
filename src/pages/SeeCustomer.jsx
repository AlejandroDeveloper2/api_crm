import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Spinner from '../Components/Spinner';

const SeeCustomer = () => {
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
            }, 2000)        
        }
        getCustomerAPI()
    },[])
    
    return (
        loading ? <Spinner/>:Object.keys(customer).length === 0 ? <p>There's not any results</p>:(      
            <div>
                {loading ? 'Loading...':(
                    <>              
                        <h1 className="font-black text-4xl text-blue-900"> See customer: {customer.name} </h1>
                        <p className="mt-3">Customer's data</p>
                        {customer.name && (
                            <p className="text-2xl text-gray-700 mt-10">
                                <span className="text-gray-800 uppercase font-bold">Customer: </span>
                                {customer.name}
                            </p>
                        )}           
                        {customer.company && (
                            <p className="text-2xl text-gray-700 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Company: </span>
                                {customer.company}
                            </p>
                        )}           
                        {customer.email && (
                            <p className="text-2xl text-gray-700 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Email: </span>
                                {customer.email}
                            </p>
                        )}          
                        {customer.phone && (
                            <p className="text-2xl text-gray-700 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Phone: </span>
                                {customer.phone}
                            </p>
                        )}          
                        {customer.notes ? (
                            <p className="text-2xl text-gray-700 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Notes: </span>
                                {customer.notes}
                            </p>
                        ):null} 
                    </>
                )}           
            </div>
        )
    );
};

export default SeeCustomer;