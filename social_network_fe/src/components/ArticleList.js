import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

export default function ArticleList() {
    const [data, setData] = useState([]);
    const [role, setRole] = useState([]);
    useEffect(() => {
        getData();
        setRole(localStorage.getItem("username"));
    }, []);

    const getData = () => {
        const url = "https://localhost:7020/api/Article/ArticleList";
        axios.get(url)
          .then((response) => {
            const responseData = response.data;
            if (responseData.statusCode === 200) {
              setData(responseData.listArticle);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
   
    const handleApprove = (e , id)=>{
        e.preventDefault();
        const url = "https://localhost:7020/api/Article/ArticleApproval";

        const data = {
            Id : id
        }
        axios
        .post(url, data)
        .then((response) => {
            const data = response.data;
            if (data.statusCode === 200) {
                alert("Approved!");
                getData();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Fragment>
            <AdminHeader />
                <h2>Article Details</h2>
                {data ? (
                <table className="table stripped table-hover mt-4" style={{backgroundColor:"white", width:'80%', margin:"0 auto"}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="row">#</th>
                            <th scope="row">Title</th>
                            <th scope="row">Content</th>
                            <th scope="row">Email</th>
                            <th scope="row">Image</th>
                            <th scope="row">IsApproved</th>
                            <th scope="row">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((val,index) => {
                            return(
                                <tr>
                            <th scope="row">{index+1} </th>
                                <td>{val.title}</td>
                                <td>{val.content}</td>
                                <td>{val.email}</td>
                                <td>{val.image}</td>
                                <td>{val.isApproved}</td>
                           <td>
                             {
                                val.isApproved === 0 ?
                                <button className="btn btn-primary" onClick={(e) => handleApprove(e,val.id)}>Mark Approved</button>
                          : 
                          "Already Approved"
                        }
                           </td>
                           </tr>
                            )
                })
            }
                    </tbody>
                </table>
                ) : (
                    "No data available"
                )}
        </Fragment>
    );
}
