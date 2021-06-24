/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Alert } from 'reactstrap';

function Login() {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [alertType, setAlertType] = useState("");

    const history = useHistory();


    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
        console.log('page to reload')
    }

    function determineUserType() {
        let user = localStorage.getItem("user");
        if (user.role === "admin") {
            console.log("Admin Logging In");
            refreshPage();
            history.push("/admin");
        }
        if (user.role === "hospital") {
            console.log("Hospital Logging In");
            refreshPage();
            history.push("/hosp-dashboard");
        }
        if (user.role === "doctor") {
            console.log("Doctor Logging In");
            refreshPage();
            history.push("/doc-dashboard");
        }

    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);


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

            if (response.status === 401) {
                console.log("Error")
                setShowAlert(true);
                setAlertType("warning");
                setAlertContent("User or password Incorrect");
            }

            console.log(response);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            let log_user = JSON.parse(localStorage.getItem("user"));

            if (log_user.role === "admin") {
                console.log("Admin Logging In");
                refreshPage();
                history.push("/admin");
            }
            if (log_user.role === "hospital") {
                console.log("Hospital Logging In");
                refreshPage();
                history.push("/hosp-dashboard");
            }
            if (log_user.role === "doctor") {
                console.log("Doctor Logging In");
                refreshPage();
                history.push("/doc-dashboard");
            }
        }).catch(
            function (error) {
              let error_code = error.response.status;

              if (error_code === 502) {
                console.log("Error")
                setShowAlert(true);
                setAlertType("warning");
                setAlertContent("User ID or Password Incorrect");
            }

            }
          );

    };

    return (
        <div>
            <form onSubmit={handleSubmitLogin}>
                <h3>Sign In</h3>

                <div className="outerDiv">
                    <div className="form-group">
                        <label>User ID</label>
                        <input type="text" name="user_id" value={user_id}
                            onChange={({ target }) => setUser_id(target.value)} className="form-control" placeholder="Enter User ID" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} className="form-control" placeholder="Enter password" onChange={({ target }) => setPassword(target.value)} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-md">Submit</button>
                    <p className="forgot-password text-right">
                        New user ? <span><Link className="nav-link" to={"/sign-main"}>Register</Link></span>
                    </p>
                </div>
            </form>

            {showAlert && <div>
                <Alert color={alertType}>
                    <h4 className="alert-heading">{alertContent}!</h4>
                </Alert>
            </div>}

        </div>
    );
}


export default Login;