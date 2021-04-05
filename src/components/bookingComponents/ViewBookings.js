import * as actions from '../../actions/bookingAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import { BookingNavBar } from "./BookingNavBar"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import  VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';

class ViewBookings extends Component {


    constructor() {
        super();
        this.state = { bookings: [], message: '', displayAlert: false }
    }

    componentDidMount() {
        this.props.onFetchBookings();

    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    deleteBoooking(id) {
        this.props.onDeleteBooking(id);
    }

    render() {
        return (
            <div>
                <BookingNavBar />
                {this.state.displayAlert && <Alert variant="filled" severity={this.props.message.includes("Successfully") ? "success" : "error"} style={{ justifyContent: "center" }}>
                    {this.props.message}
                </Alert>}
                <br></br><br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow style={{color:"#3f51b5",  fontSize: 'medium'}}>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}} >#</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Customer Name</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Vehicle Number</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booking Date</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booked Till Date</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booking Desc</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Distance</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Total Cost</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props && this.props.bookings && <TableBody>
                            {this.props.bookings.map((booking, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{booking.customer.firstName} {booking.customer.lastName}</TableCell>
                                    <TableCell align="center">{booking.vehicle.vehicleNumber}</TableCell>
                                    <TableCell align="center">{booking.bookingDate}</TableCell>
                                    <TableCell align="center">{booking.bookedTillDate}</TableCell>
                                    <TableCell align="center">{booking.bookingDescription}</TableCell>
                                    <TableCell align="center">{booking.distance}</TableCell>
                                    <TableCell align="center">{booking.totalCost}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" > 
                                            <Button><Link to={"/detailViewBooking/" + booking.bookingId} style={{ textDecoration: 'none', color: 'white' }}><VisibilityIcon/></Link></Button>
                                            <Button><Link to={"/updateBooking/" + booking.bookingId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon/></Link></Button>
                                            <Button onClick={this.deleteBoooking.bind(this, booking.bookingId)}><DeleteIcon/></Button>
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
        bookings: state.bookings
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchBookings: () => dispatch(actions.fetchBookings()),
        onDeleteBooking: (id) => dispatch(actions.deleteBooking(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions._deleteBooking(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewBookings);

