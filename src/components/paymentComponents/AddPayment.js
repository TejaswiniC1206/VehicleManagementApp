import * as actions from '../../actions/paymentAction'

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '@material-ui/lab/Alert';
import { PaymentNavBar } from "./PaymentNavBar"
import { connect } from 'react-redux';


class AddPayment extends Component {

    constructor(){
        super();
        this.paymentMode = React.createRef();
        this.paymentDate = React.createRef();
        this.paymentStatus = React.createRef();
        this.booking = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }


    addPayment(event) {
        event.preventDefault();
        this.props.onaddPayment({
            booking:{ bookingId: this.bookingId},
            paymentMode: this.paymentMode,paymentStatus: this.paymentStatus,paymentDate: this.paymentDate
        });
    }

    render() { 
        return (
            <div>
                 <PaymentNavBar/>
                 {this.state.displayAlert && <AlertMessage message={this.props.message}/>}                       
                <Container maxWidth="sm" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                        <form>

                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Payment Mode</Typography>
                            <input type="text" ref={this.paymentMode} placeholder="Enter paymentMode" name="paymentMode" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Booking ID</Typography>
                            <input type="text" ref={this.bookingId} placeholder="Enter bookingId" name="bookingId" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Payment Date</Typography>
                            <input type="date" ref={this.paymemntDate} placeholder="Enter paymentDate" name="paymentDate" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Payment Status</Typography>
                            <input type="text" ref={this.paymentStatus} placeholder="Enter paymentStatus" name="paymentStatus" required /><br></br><br></br>
                            <Button style={{ align: "center" }} variant="contained" onClick={this.addPayment.bind(this)} color="primary">Proceed</Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onaddPayment: (payload) => dispatch(actions.addPayment(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddPayment);
