/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";


function DocDashboard() {
    const [user_id, setuser_id] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const history = useHistory();


    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
        console.log('page to reload')
    }

    function determineUserType() {
        let user = localStorage.getItem("user");
        if(user.role === "admin"){
            console.log("Admin Logging In");
            refreshPage();
            history.push("/admin");
        }
        
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);


    // logout the user
    const handleLogout = () => {
        setUser({});
        setuser_id("");
        setPassword("");
        localStorage.clear();
    };

    // login the user
    const handleSubmitLogin = async e => {
        e.preventDefault();
        const user = { user_id, password };
        // send the user_id and password to the server
        axios.post(
            'http://127.0.0.1:5000/login',
            user,
        ).then(function (response) {
            console.log(response);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        });

    };

    return (
        <div>
            
        </div>
    );
}


export default DocDashboard;