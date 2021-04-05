import * as actions from '../../actions/paymentAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import { PaymentNavBar } from "./PaymentNavBar"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import  VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';

class ViewPayments extends Component {


    constructor() {
        super();
        this.state = { payments: [], message: '', displayAlert: false }
    }

    componentDidMount() {
        this.props.onFetchPayments();

    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    deletePayment(id) {
        this.props.onDeletePayment(id);
    }

    render() {
        return (
            <div>
                <PaymentNavBar />
                {this.state.displayAlert && <Alert variant="filled" severity={this.props.message.includes("Successfully") ? "success" : "error"} style={{ justifyContent: "center" }}>
                    {this.props.message}
                </Alert>}
                <br></br><br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow style={{color:"#3f51b5",  fontSize: 'medium'}}>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}} >#</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Mode</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booking ID</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Date</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Status</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>TotalPayment</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Total Revenue</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props && this.props.payments && <TableBody>
                            {this.props.payments.map((payment, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{payment.paymentMode}</TableCell>
                                    <TableCell align="center">{payment.paymentDate}</TableCell>
                                    <TableCell align="center">{payment.booking.bookedId}</TableCell>
                                    <TableCell align="center">{payment.paymentStatus}</TableCell>
                                    <TableCell align="center">{payment.TotalPayment}</TableCell>
                                    <TableCell align="center">{payment.TotalRevenue}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" > 
                                            <Button><Link to={"/detailPayment/" + payment.paymentId} style={{ textDecoration: 'none', color: 'white' }}><VisibilityIcon/></Link></Button>
                                            <Button><Link to={"/updatepayment/" + payment.paymentId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon/></Link></Button>
                                            <Button onClick={this.deletePayment.bind(this, payment.paymentId)}><DeleteIcon/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        message: state.message,
        payments: state.payments
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchPayments: () => dispatch(actions.fetchPayments()),
        onDeletePayment: (id) => dispatch(actions.deletePayment(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions._deletePayment(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewPayments);

