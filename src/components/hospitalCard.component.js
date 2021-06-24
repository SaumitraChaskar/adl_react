import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from 'reactstrap';
import axios from 'axios';

import './components.css'


export default function HospitalMediaCard(props) {

  var approve_disable = false;

  const [showAlert, setShowAlert] = useState(0);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

    const approveHospital = (event) => {

        // Disable approve
        approve_disable = true;
        let reqPayload = {};

        reqPayload["user_id"] = props.hosp_id;
        reqPayload["location"] = props.hosp_address;
        reqPayload["name"] = props.hosp_name;
        reqPayload["mobile"] = props.hosp_phone;
        reqPayload["password"] = props.hosp_pass;

        axios.post(
            'http://127.0.0.1:5000/addHospital',
            reqPayload,
            {
              headers: {
                "x-access-token" : JSON.parse(localStorage.getItem("user")).token,
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
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
        {showAlert !== 0 && <div>
                        <Alert color={alertType}>
                            <h4 className="alert-heading">{alertContent}!</h4>
                        </Alert>
                    </div>}
          <Typography gutterBottom variant="h5" component="h2">
            {props.hosp_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Hospital ID:</b> {props.hosp_id}<br></br>
            <b>Hospital Address:</b> {props.hosp_address}<br></br>
            <b>Hospital Contact:</b> {props.hosp_phone}<br></br>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => { approveHospital() }} disabled={approve_disable}>
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
