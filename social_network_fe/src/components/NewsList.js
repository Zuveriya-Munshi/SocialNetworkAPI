import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

export default function NewsList() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const url = "https://localhost:7020/api/News/NewsList";
        
        axios.get(url)
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
        const url = "https://localhost:7020/api/News/AddNews";

        const data = {
            Title: title,
            Content : content,
            Email : localStorage.getItem("loggedEmail") ,
            CreatedOn : ''
        };

        axios.post(url, data)
            .then((response) => {
                const responseData = response.data;
                if (responseData.statusCode === 200) {
                    getData();
                    Clear();
                    alert("News Added ")
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
                setTitle('');
                setContent('');
            }
    };

    return (
        <Fragment>
            <AdminHeader />
            <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add News</h3>
                <form>
                  <div className="row" style={{color: "black"}}>
                    <div className="form-group">
                      <label htmlFor="Title"> Title</label>
                      <input type="text" id="Title"  className="form-control form-control-lg" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Content">Content</label>
                      <input type="text" id="Content" className="form-control form-control-lg" placeholder="Enter Contents" onChange={(e) => setContent(e.target.value)} value={content} />
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
                            <th scope="row">Title</th>
                            <th scope="row">Content</th>
                            <th scope="row">Created On</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.title}</td>
                                <td>{user.content}</td>
                                <td>{user.createdOn}</td>
                              
                                
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
