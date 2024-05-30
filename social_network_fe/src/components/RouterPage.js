import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import RegistrationList from "./RegistrationList";
import ArticleList from "./ArticleList";
import NewsList from "./NewsList";
import StaffList from "./StaffList";

export default function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/registrationlist" element={<RegistrationList />} />
        <Route path="/articlelist" element={<ArticleList />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/stafflist" element={<StaffList />} />
      </Routes>
    </Router>
  );
}
