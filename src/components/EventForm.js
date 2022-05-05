import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './../App.css';

export default class EventForm extends Component {

    emptyState = {
        summary: '',
        description: '',
        location: '',
        startDateTime: null,
        endDateTime: null
    };

    constructor(props) {
        super(props);
        this.state = this.emptyState;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.save(this.getEvent());
        this.setState(this.emptyState);
    }

    getEvent() {
        return {
            summary: this.state.summary,
            description: this.state.description,
            location: this.state.location,
            start: {
                dateTime: new Date(this.state.startDateTime)
            },
            end: {
                dateTime: new Date(this.state.endDateTime)
            }
        }
    }

    render() {

        const { summary, description, location, startDateTime, endDateTime } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <Stack direction="row" spacing={2}>
                    <TextField label="Summary" variant="standard" value={summary} onChange={e => this.setState({ summary: e.target.value })} required />

                    <TextField label="Description" variant="standard" value={description} onChange={e => this.setState({ description: e.target.value })} required />

                    <TextField label="Location" variant="standard" value={location} onChange={e => this.setState({ location: e.target.value })} required />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Start Date Time"
                            value={startDateTime}
                            onChange={(newValue) => {
                                this.setState({ startDateTime: newValue });
                            }}
                            required
                        />

                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="End Date Time"
                            value={endDateTime}
                            onChange={(newValue) => {
                                this.setState({ endDateTime: newValue });
                            }}
                            required
                        />

                    </LocalizationProvider>

                    <Button variant="contained" color="success" type='submit'>Save Event</Button>
                </Stack>
            </form>
        );
    }
}