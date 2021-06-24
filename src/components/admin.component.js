import React, { Component } from "react";
import './components.css'
import HospitalMediaCard from './hospitalCard.component';
import DoctorMediaCard from './doctorCard.component';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { "user_id": "", "password": "", "hospData": [], "docData": [] };
        this.hospData = this.fetchHospitalData();
        this.docData = this.fetchDoctorData();
        this.hospPopulator = this.hospPopulator.bind(this);
    }

    hospPopulator(data) {
        let hospList = [];
        for (let i = 0; i < data.length; i++) {

            hospList.push(<HospitalMediaCard
                hosp_name={data[i].hosp_name}
                hosp_id={data[i].hosp_id}
                hosp_address={data[i].hosp_address}
                hosp_phone={data[i].hosp_phone}
                hosp_pass={data[i].hosp_pass}
                key={i} className="innerDiv" />);
        }
        this.setState({ "hospData": hospList });
    }

    docPopulator(data) {
        let docList = [];
        for (let i = 0; i < data.length; i++) {
            let doc_type = "";

            if (data[i].is_hosp_part === "IndependentDoctor") {
                doc_type = "Independent"
            }
            if (data[i].is_hosp_part === "No") {
                doc_type = "Hospital Not Registered"
            }
            if (data[i].is_hosp_part === "Yes") {
                doc_type = "Hospital ZID:" + data[i].doc_hosp_zid
            }

            docList.push(<DoctorMediaCard
                doc_phone={data[i].doc_phone}
                doc_id={data[i].doc_id}
                doc_name={data[i].doc_name}
                doc_type={data[i].doc_type}
                doc_hosp={data[i].doc_hosp}
                doc_spec={data[i].doc_spec}
                doc_desc={data[i].doc_desc}
                doc_pass={data[i].doc_pass}
                key={i} className="innerDiv" />);
        }
        this.setState({ "docData": docList });
    }

    fetchHospitalData = async () => {
        const response = await fetch("http://127.0.0.1:5000/get_all_hosp_request");
        const data = await response.json();
        console.log(data)
        this.hospPopulator(data);
        return data;
    }

    fetchDoctorData = async () => {
        const response = await fetch("http://127.0.0.1:5000/get_all_doctor_request");
        const data = await response.json();
        console.log(data)
        this.docPopulator(data);
        return data;
    }

    render() {
        return (
            <div style={{width:"100%",justifyContent: "center", alignItems:"center"}}>
                {(this.state.hospData.length === 0 && this.state.docData.length === 0) && 
                    <h1>LOADING ...</h1>
                }
                {(this.state.hospData.length !== 0 || this.state.docData.length !== 0) &&
                    <div style={{width:"100%"}}>
                        <div>
                            <h1>Pending Approval Requests</h1>
                            <br></br>
                            <hr></hr>
                        </div>

                        <div>
                            <h3>Hospital Requests</h3>
                        </div>
                        <div className="row justify-content-center">
                            {this.state["hospData"]}
                        </div>

                        <br></br>
                        <hr></hr>
                        <div>
                            <h3>Doctor Requests</h3>
                        </div>
                        <div className="row justify-content-center">
                            {this.state["docData"]}
                        </div>
                    </div>}
                    <br></br>
                    <h1>COVID-19 Analytics</h1>
                    <hr></hr>
                <div style={{paddingLeft: "100px"}}>
                    <iframe src="http://localhost:8502" width="1000" height="1000" title="streamlitTry">
                        <p>Your browser does not support iframes.</p>
                    </iframe>
                </div>
            </div>
        );
    }
}
