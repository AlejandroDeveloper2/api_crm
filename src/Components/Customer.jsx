import { useNavigate } from "react-router-dom";

const Customer = ({customer, handleDelete}) => {
    const navigate=useNavigate();

    const {name, company, email, phone, notes, id}=customer;
    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-3">{id}</td>
            <td className="p-3">{name}</td>
            <td className="p-3">{company}</td>
            <td className="p-3">
                <p>
                    <span className="text-gray-800 uppercase font-bold">
                        Email:
                    </span>
                    {email}
                </p>
                <p>
                    <span className="text-gray-800 uppercase font-bold">
                        Phone number:
                    </span>
                    {phone}
                </p>
            </td>
            <td className="p-3">{notes}</td>
            <td className="p-3">
                <button 
                    type="button" 
                    className="w-full block mb-3 bg-blue-500 text-white
                    p-3 text-center uppercase font-bold text-xs  hover:bg-blue-600"
                    onClick={()=>navigate(`/customers/${id}`)}
                >
                    See
                </button>
                <button 
                    type="button" 
                    className="w-full block mb-3 bg-yellow-500 text-white
                    p-3 text-center uppercase font-bold text-xs  hover:bg-yellow-600"
                    onClick={()=>navigate(`/customers/edit/${id}`)}
                >
                    Edit
                </button>
                <button 
                    type="button" 
                    className="w-full block bg-red-500 text-white
                    p-3 text-center uppercase font-bold text-xs hover:bg-red-600"
                    onClick={()=>handleDelete(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Customer;