import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

export default function RegistrationList() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const url = "https://localhost:7020/api/Registration/RegistrationList";
        const data = {
            Name : name,
            Email : email,
            PhoneNo : phoneNo,
            Password : password, 
            UserType : "USER"
        }
        axios.get(url,data)
            .then((response) => {
                const responseData = response.data;
                if (responseData.statusCode === 200) {
                    setData(responseData.listRegistration);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleApprove = (e, id) => {
        e.preventDefault();
        const url = "https://localhost:7020/api/Registration/UserApproval";

        const data = {
            Id: id
        };

        axios.post(url, data)
            .then((response) => {
                const responseData = response.data;
                if (responseData.statusCode === 200) {
                    alert("Approved!");
                    getData();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Fragment>
            <AdminHeader />
            <h2>User Details</h2>
            {data ? (
                <table className="table stripped table-hover mt-4" style={{backgroundColor:"white", width:'80%', margin:"0 auto"}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.phoneNo}</td>
                                <td>
                                    {user.isApproved === 0 ? (
                                        <button className="btn btn-primary" onClick={(e) => handleApprove(e, user.ID)}>Mark Approved</button>
                                    ) : (
                                        "Already Approved"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                "No data available"
            )}
        </Fragment>
    );
}
