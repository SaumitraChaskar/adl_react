import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Alert } from 'reactstrap';

import './components.css'


export default function DoctorMediaCard(props) {

  var approve_disable = false;

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const approveDoctor = (event) => {

    // Disable approve
    approve_disable = true;
    let reqPayload = {};

    reqPayload["user_id"] = props.doc_id;
    reqPayload["desc"] = props.doc_desc;
    reqPayload["speciality"] = props.doc_spec;
    reqPayload["name"] = props.doc_name;
    reqPayload["mobile"] = props.doc_phone;
    reqPayload["hospital"] = props.doc_hosp
    reqPayload["password"] = props.doc_pass

    axios.post(
      'http://127.0.0.1:5000/addDoctor',
      reqPayload,
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        }
      }
    ).then(function (response) {
      console.log(response)
      if (response.status === 201) {
        setShowAlert(true);
        setAlertType("success");
        setAlertContent("Apporval Submitted !");
    }
    else {
        setShowAlert(true);
        setAlertType("warning");
        setAlertContent("Account Already Approved");
    }
    });

  }

  return (
    <Card className="col-sm-5 hospCard">
      <CardActionArea>
        <CardContent>
          {showAlert && <div>
            <Alert color={alertType}>
              <h4 className="alert-heading">{alertContent}!</h4>
            </Alert>
          </div>}
          <Typography gutterBottom variant="h5" component="h2">
            {props.doc_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Doctor ID:</b> {props.doc_id}<br></br>
            <b>Doctor Contact:</b> {props.doc_phone}<br></br>
            <b>Doctor Type:</b> {props.doc_type}<br></br>
            <b>Doctor's Hospital:</b> {props.doc_hosp && <span>Hospital Not Linked</span>}<br></br>
            <b>Doctor's Speciality:</b> {props.doc_spec}<br></br>
            <b>Doctor's role description:</b> {props.doc_desc}<br></br>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => { approveDoctor() }} disabled={approve_disable}>
          Approve
        </Button>
        <Button size="small" color="secondary" >
          Decline
        </Button>
        <Button size="small" color="inherit">
          Update Required
        </Button>
      </CardActions>
    </Card>
  );
}