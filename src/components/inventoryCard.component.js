import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from 'reactstrap';
import axios from 'axios';
import NumericInput from 'react-numeric-input';




import './components.css'


export default function InventoryMediaCard(props) {


  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");
  const [itemQty, setItemQty] = useState(0);
  const [isEdited, setIsEdited] = useState(false);

 

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  }));
  


  const updateClicked = (event) => {
    setIsEdited(true);
  }


  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log('page to reload')
  }


  const saveClicked = (event) => {
    setIsEdited(false);

    let reqPayload = {};

    reqPayload["item_id"] = props.item_id;
    reqPayload["item_qty"] = itemQty;

    axios.post(
      'http://127.0.0.1:5000/update_inventory_item',
      reqPayload,
    ).then(function (response) {
      console.log(response)
      if (response.status === 200) {
        setShowAlert(true);
        setAlertType("success");
        setAlertContent("Item Quantity Updated");

        refreshPage();
      }
    });

  }

  return (
    <Card className="col-sm-5 hospCard">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <b style={{ margin: "5px" }}>Item ID:</b> {props.item_id}<br></br>
             {
              isEdited
                ?
                (
                  <div style={{height: "100px"}}>
                    <b style={{ margin: "5px" }}>Initial Item Qty:</b><b>{props.item_qty}</b><br></br>
                    <b style={{ margin: "5px" }}>New Item Qty:</b><NumericInput min={0} max={100} onChange={value => setItemQty(value)} />
                  </div>

                )
                : (<b style={{ margin: "5px" }}>Item Qty: {props.item_qty}</b>
                )
            }
            <br></br>
          </Typography>
          {showAlert !== false && <div>
            <Alert color={alertType}>
              <h4 className="alert-heading">{alertContent}!</h4>
            </Alert>
          </div>}

        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          isEdited
            ?
            (<Button size="small" color="secondary" onClick={() => { saveClicked() }}>
              Save
            </Button>)
            : (<Button size="small" color="inherit" onClick={() => { updateClicked() }}>
              Update
            </Button>
            )
        }
        <Button size="small" color="secondary" >
          Restock Schedule
        </Button>

      </CardActions>
    </Card>
  );
}
