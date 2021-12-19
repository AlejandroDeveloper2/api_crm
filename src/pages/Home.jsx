import {useEffect, useState} from 'react'
import Customer from '../Components/Customer';

const Home = () => {

    const[customers, setCustomers]=useState([]);

    useEffect(()=>{
        const getCustomersAPI=async()=>{
            try{
                const url='http://localhost:4000/customers'
                const response=await fetch(url)
                const result=await response.json()
                setCustomers(result)
            }catch(error){
                console.log(error)
            }
        }
        getCustomersAPI()
    },[]);
    const handleDelete= async id=>{
        const confirm=confirm('Are you sure to delete this customer?')
        if(confirm){
            try {
                const url=`http://localhost:4000/customers/${id}`
                const response= await fetch(url,{
                    method: 'DELETE'
                });
                await response.json();
                //to reload the list of customers without reload the page and don't make another query to the Api again.
                const arrayCustomers=customers.filter(customer=> customer.id !== id)
                setCustomers(arrayCustomers);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
           <h1 className="font-black text-4xl text-blue-900">Customers List</h1>
           <p className="mt-3">Manage your customers!</p>
           <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white" >
                    <tr>
                        <th className="p-2">Id</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Company</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Notes</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer)=>(
                        <Customer
                            key={customer.id}
                            customer={customer}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
           </table>
        </>
    );
};

export default Home;