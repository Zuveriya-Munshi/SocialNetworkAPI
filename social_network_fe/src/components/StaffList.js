import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

export default function StaffList() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
   

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const url = "https://localhost:7020/api/Registration/RegistrationList";
        const data = {
        
            UserType : "STAFF"
        }
        axios.get(url,data)
            .then((response) => {
                const responseData = response.data;
                if (responseData.statusCode === 200) {
                    setData(responseData.listNews);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSave = (e) => {
        e.preventDefault();
        const url = "https://localhost:7020/api/Registration/StaffRegistration";

        const data = {
            Name: name,
            Email : email,
            Password : password,
        };

        axios.post(url, data)
            .then((response) => {
                const responseData = response.data;
                if (responseData.statusCode === 200) {
                    getData();
                    Clear();
                    alert("Staff Added ")
                }
                else{
                    alert(responseData.message)
                }
            })
            .catch((error) => {
                console.log(error);
            });
            const Clear = (e) =>{
                e.preventDefault();
                setData('');
            }
    };

    return (
        <Fragment>
            <AdminHeader />
            <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="Name"> Name</label>
                      <input type="text" id="Name" className="form-control form-control-lg" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <input type="text" id="Email" className="form-control form-control-lg" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input type="text" id="Password" className="form-control form-control-lg" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="mt-4 pt-2" >
                  <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg button" type="reset" value="Reset" />
                  <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2 button" type="submit" value="Submit" onClick={(e) => handleSave(e)} />
  </div>
                    </div>
                    </form>
            </div>
            <h2>News Details</h2>
            {data ? (
                <table className="table stripped table-hover mt-4" style={{backgroundColor:"white", width:'80%', margin:"0 auto"}}>
                    <thead className="thead-dark">
                        <tr>
                        <th scope="row">#</th>
                            <th scope="row">Name</th>
                            <th scope="row">Email</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>                              
                                
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
