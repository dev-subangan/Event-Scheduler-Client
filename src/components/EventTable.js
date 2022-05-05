import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default class EventTable extends Component {

    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Events</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Start Date Time</TableCell>
                            <TableCell>End Date Time</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.events && this.props.events.map((event) => (
                            <TableRow
                                key={event.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {event.summary}
                                </TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>{event.start.dateTime}</TableCell>
                                <TableCell>{event.end.dateTime}</TableCell>
                                <TableCell >
                                    <Button variant="outlined" color="error" onClick={e => this.props.delete(event.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}