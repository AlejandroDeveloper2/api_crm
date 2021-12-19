import FormCustomer from '../Components/FormCustomer';
const NewCustomer = () => {
    return (
        <>
           <h1 className="font-black text-4xl text-blue-900">New customer</h1>
           <p className="mt-3">Fill the next fields to register a new customer.</p>
           <FormCustomer/>
        </>
    );
};

export default NewCustomer;