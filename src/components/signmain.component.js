import React, { Component, useState } from "react";
import './components.css';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Alert } from 'reactstrap';

const initialState = {

}

export default class SignMain extends Component {

    constructor(props) {
        super(props);
        this.state = { "dropDownOpen": false };

        this.showAlert = false;
        this.alertType = "";
        this.alertContent = "";

        this.handleHospSubmit = this.handleHospSubmit.bind(this);
        this.handleDocSubmit = this.handleDocSubmit.bind(this);

        this.hospRegister = this.props.hospRegister;
        this.docRegister = this.props.docRegister;

    }

    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    handleChange = (event) => {

        if (this.isNumeric(event.target.value)) {
            this.setState({ [event.target.name]: parseInt(event.target.value) });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }

    }


    toggle = () => {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        })
    }

    handleDropDownChange = (val) => {
        this.setState({
            is_hosp_part: val,
            doc_type: val
        })
    }

    handleHospSubmit = (event) => {
        axios.post(
            'http://127.0.0.1:5000/hosp_register',
            this.state,
        ).then((response) => {

            if (response.status === 201) {
                this.setState({ showAlert: true });
                this.setState({ alertType: "success" });
                this.setState({ alertContent: "Request Submitted !" });
            }
            else {
                this.setState({ showAlert: true });
                this.setState({ alertType: "warning" });
                this.setState({ alertContent: "Request Under Review" });
            }
        });

        event.preventDefault();

    }

    handleDocSubmit = (event) => {
        console.log(this.state);
        axios.post(
            'http://127.0.0.1:5000/doc_register',
            this.state,
        ).then((response) => {

            if (response.status === 201) {
                this.setState({ showAlert: true });
                this.setState({ alertType: "success" });
                this.setState({ alertContent: "Request Submitted !" });
            }
            else {
                this.setState({ showAlert: true });
                this.setState({ alertType: "warning" });
                this.setState({ alertContent: "Request Under Review" });
            }
        });

        event.preventDefault();
    }

    hospRegisterClicked = (event) => {
        this.setState(initialState);
        this.hospRegister = true;
        console.log("hospRegisterClicked", this.hospRegister);
        this.setState({
            "hosp_phone": "",
            "hosp_id": "",
            "hosp_name": "",
            "hosp_address": "",
            "hosp_pass": ""
        });
    }

    docRegisterClicked = (event) => {
        this.setState(initialState);
        this.docRegister = true;
        console.log("docRegisterClicked", this.docRegister);
        this.setState(
            {
                "doc_name": "",
                "doc_id": "",
                "doc_hosp": "",
                "doc_phone": "",
                "doc_spec": "",
                "doc_desc": "",
                "is_admin": false,
                "doc_pass": "",
            });
    }

    backClicked = (event) => {

        this.docRegister = false;
        this.hospRegister = false;
        this.setState(initialState);

        this.setState({ showAlert: false });
        this.setState({ alertType: "warning" });
        this.setState({ alertContent: "Request Under Review" });
        this.setState({ "dropDownOpen": false });
    }


    render() {
        if (!this.hospRegister && !this.docRegister) {
            return (
                <div>
                    {this.state.showAlert && <div>
                        <Alert color={this.state.alertType}>
                            <h4 className="alert-heading">{this.state.alertContent}!</h4>
                        </Alert>
                    </div>}
                    <h3>Register</h3>
                    <br></br>
                    <div className="outerDiv">
                        <div className="innerDiv">
                            <form>
                                <h4>Are you a Doctor ?</h4>
                                <p>Join Zerogya and experience a new way of healthcare.</p>
                                <br></br>
                                <button type="button" className="btn btn-primary btn-md" onClick={this.docRegisterClicked}>Register</button>
                            </form>
                        </div>
                        <div className="innerDiv">
                            <form>
                                <h4>Are you a Hospital Admin ?</h4>
                                <p>Register your hospital and become a part of Zerogya.</p>
                                <br></br>
                                <button type="button" className="btn btn-primary btn-md" onClick={this.hospRegisterClicked} >Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.hospRegister) {
            return (
                <div>
                    <button type="submit" className="btn btn-outline-primary btn-sm" onClick={this.backClicked}>Back</button>
                    <h3>Register a Hospital</h3>
                    <div className="outerDiv">
                        <form onSubmit={this.handleHospSubmit}>
                            <div className="form-group">
                                <label>Hospital Name</label>
                                <input type="text" name="hosp_name" value={this.state.value} className="form-control" placeholder="Hospital Name" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Hospital Contact</label>
                                <input type="text" name="hosp_phone" value={this.state.value} className="form-control" placeholder="Hospital Contact" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Hospital Registration ID</label>
                                <input type="text" name="hosp_id" value={this.state.value} className="form-control" placeholder="Hospital ID" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Hospital Address</label>
                                <input type="text" name="hosp_address" value={this.state.value} className="form-control" placeholder="Hospital Address" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="hosp_pass" value={this.state.value} className="form-control" placeholder="Enter password" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="hosp_cpass" value={this.state.value} className="form-control" placeholder="Confirm password" onChange={this.handleChange} />
                                {(this.state.hosp_pass !== this.state.hosp_cpass && this.state.hosp_cpass) && <span style={{ color: "red" }}>password doesn't match</span>}
                                {(this.state.hosp_pass === this.state.hosp_cpass && this.state.hosp_cpass) && <span style={{ color: "green" }}>password match</span>}
                            </div>
                            <button type="submit" className="btn btn-primary btn-md">Submit</button>
                        </form>
                        {this.state.showAlert && <div>

                        <div style={{marginTop: "20px"}}>
                        <Alert color={this.state.alertType}>
                            <h4 className="alert-heading">{this.state.alertContent}!</h4>
                        </Alert>
                        </div>
                    </div>}
                    </div>
                </div>
            );
        }
        if (this.docRegister) {
            return (
                <div>
                    {this.state.showAlert && <div>
                        <Alert color={this.state.alertType}>
                            <h4 className="alert-heading">{this.state.alertContent}!</h4>
                        </Alert>
                    </div>}
                    <button type="submit" className="btn btn-outline-primary btn-sm" onClick={this.backClicked}>Back</button>
                    <h3>Register a Doctor</h3>
                    <div className="outerDiv">
                        <form onSubmit={this.handleDocSubmit}>
                            <div className="form-group">
                                <label>Doctor Name</label>
                                <input type="text" name="doc_name" value={this.state.value} className="form-control" placeholder="Doctor's Name" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Doctor UPRN</label>
                                <input type="text" name="doc_id" value={this.state.value} className="form-control" placeholder="Doctor's UPRN" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Doctor Contact</label>
                                <input type="text" name="doc_phone" value={this.state.value} className="form-control" placeholder="Doctor's Contact" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Doctor Description</label>
                                <input type="textarea" name="doc_desc" value={this.state.value} className="form-control" placeholder="Doctor's role description" onChange={this.handleChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Doctor Speciality</label>
                                <input type="text" name="doc_spec" value={this.state.value} className="form-control" placeholder="Doctor's Speciality" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="doc_pass" value={this.state.value} className="form-control" placeholder="Enter password" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="doc_cpass" value={this.state.value} className="form-control" placeholder="Confirm password" onChange={this.handleChange} />
                                {(this.state.doc_pass !== this.state.doc_cpass && this.state.doc_cpass) && <span style={{ color: "red" }}>password doesn't match</span>}
                                {(this.state.doc_pass === this.state.doc_cpass && this.state.doc_cpass) && <span style={{ color: "green" }}>password match</span>}
                            </div>
                            <div className="form-group">
                                <label>Is your Hospital a part of Zerogya ?</label>
                                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        {this.state.is_hosp_part}
                                    </DropdownToggle>
                                    <DropdownMenu
                                        title="Dropdown right"
                                        id="dropdown-menu-align-right">
                                        <DropdownItem onClick={() => this.handleDropDownChange("Yes")} dropdownvalue="Yes">Yes</DropdownItem>
                                        <DropdownItem onClick={() => this.handleDropDownChange("No")} dropdownvalue="No">No</DropdownItem>
                                        <DropdownItem onClick={() => this.handleDropDownChange("IndependentDoctor")} dropdownvalue="Independent Doctor">Independent Doctor</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            {(this.state.is_hosp_part === "Yes" || this.state.is_hosp_part === "No") && (<div className="form-group">
                                <label>Doctor's Hospital Name</label>
                                <input type="text" name="doc_hosp" value={this.state.value} className="form-control" placeholder="Doctor's Hospital" onChange={this.handleChange} />
                            </div>)}

                            <button type="submit" className="btn btn-primary btn-md">Submit</button>
                        </form>
                        {this.state.showAlert && <div>
                            
                            <div style={{marginTop: "20px"}}>
                            <Alert color={this.state.alertType}>
                                <h4 className="alert-heading">{this.state.alertContent}!</h4>
                            </Alert>
                            </div>
                        </div>}
                    </div>
                </div>
            );
        }
    }
}