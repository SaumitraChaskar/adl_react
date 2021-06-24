import React, { Component } from "react";
import './components.css'
import InventoryMediaCard from './inventoryCard.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import DatePicker from 'react-date-picker';



export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = { "inventoryData": [], "isNewItemAdding": false, "itemID": "", "itemName": "", "itemQty": 0, "maintainance": "", "restock": "", "calibrate": "" };
        this.fetchInventoryData();
        console.log("Constructor called");
        this.inventoryPopulator = this.inventoryPopulator.bind(this);

    }

    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    inventoryPopulator(data) {
        let inventoryList = [];
        for (let i = 0; i < data.length; i++) {

            inventoryList.push(<InventoryMediaCard
                item_name={data[i].item_name}
                item_id={data[i].item_id}
                item_qty={data[i].item_qty}
                key={i} className="innerDiv" />);
        }
        this.setState({ "inventoryData": inventoryList });
    }


    fetchInventoryData = async () => {
        const response = await fetch("http://127.0.0.1:5000/get_all_inventory_data");
        const data = await response.json();
        console.log("Recieved", data)
        this.inventoryPopulator(data);
        return data;
    }

    handleChange = (event) => {

        if (this.isNumeric(event.target.value)) {
            this.setState({ [event.target.name]: parseInt(event.target.value) });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }

    }

    handleMaintChange = (event) => {
        this.setState({"maintainance" : event});
    }

    handleRestockChange = (event) => {
        this.setState({"restock" : event});

    }

    handleCalibrateChange = (event) => {
        console.log(event);
        this.setState({"calibrate" : event});

    }

    refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
        console.log('page to reload')
    }

    handleAddClicked = (event) => {
        console.log("CLICKED");
        this.setState({ isNewItemAdding: true }, () => {
            console.log(this.state.isNewItemAdding, 'isNewItemAdding');
        });
        // console.log(this.state.isNewItemAdding);
    }

    handleItemAdd = (event) => {

        let reqPayload = {};
        reqPayload["item_id"] = this.state.itemID;
        reqPayload["item_name"] = this.state.itemName;
        reqPayload["item_qty"] = this.state.itemQty;
        reqPayload["maint"] = this.state.maintainance;
        reqPayload["restock"] = this.state.restock;
        reqPayload["calibrate"] = this.state.calibrate;


        axios.post(
            'http://127.0.0.1:5000/add_inventory_item',
            reqPayload,
        ).then((response) => {

            console.log("RESPONSE", response);

            if (response.status === 201) {
                this.setState({ showAlert: true });
                this.setState({ alertType: "success" });
                this.setState({ alertContent: "Request Submitted !" });

                this.refreshPage();
            }
            else {
                this.setState({ showAlert: true });
                this.setState({ alertType: "warning" });
                this.setState({ alertContent: "Request Under Review" });
            }
        });

    }

    formStartsRef = React.createRef()

    // componentDidMount() {
    //     this.scrollToBottom()
    // }
    // componentDidUpdate() {
    //     this.scrollToBottom()
    // }
    scrollToBottom = () => {
        this.formStartsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        return (
            <div style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                {this.state.inventoryData.length === 0 &&
                    <h1>LOADING ...</h1>
                }
                {this.state.inventoryData.length !== 0 &&
                    <div style={{ width: "100%" }}>
                        <div>
                            <h1>Equipments and Products Inventory <span><FontAwesomeIcon style={{ alignContent: "center", marginLeft: "10px" }} icon="plus-circle" onClick={() => { this.setState({ "isNewItemAdding": true }) }} /></span> </h1>
                        </div>
                        <br></br>
                        <hr></hr>
                        <div className="row justify-content-center">
                            {this.state.isNewItemAdding &&
                                <div style={{ border: "1px solid", backgroundColor: "white", boxShadow: "5px 10px #c4c4c4"}}>
                                    <form onSubmit={this.handleItemAdd}>
                                        <div className="outerDiv">
                                            <div className="form-group">
                                                <label>Item Name: </label>
                                                <input type="text" name="itemName" className="form-control" placeholder="Item Name" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Item ID: </label>
                                                <input type="text" name="itemID" className="form-control" placeholder="Item ID" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Item Qty: </label>
                                                <input type="text" name="itemQty" className="form-control" placeholder="Item Quantity" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group" style={{marginTop:"15px"}}>
                                                <label>Next Maintainance Date: </label>
                                                <div><DatePicker
                                                    onChange={this.handleMaintChange}
                                                    value={this.state.maintainance}
                                                /></div>
                                            </div>

                                            <div className="form-group" style={{marginTop:"15px"}}>
                                                <label>Next Restock Data: </label>
                                                <div><DatePicker
                                                    onChange={this.handleRestockChange}
                                                    value={this.state.restock}
                                                /></div>
                                            </div>

                                            <div className="form-group" style={{marginTop:"15px"}}>
                                                <label>Next Recalibration Date: </label>
                                                <div><DatePicker
                                                    onChange={this.handleCalibrateChange}
                                                    value={this.state.calibrate}
                                                /></div>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-md">Add<span><FontAwesomeIcon style={{ alignContent: "center", marginLeft: "10px" }} icon="plus-circle" /></span></button>
                                        </div>
                                    </form>
                                </div>}
                            {this.state.inventoryData}
                        </div>
                    </div>}
                <br></br>
                <div ref={this.formStartsRef}>

                </div>
            </div>
        );
    }
}
