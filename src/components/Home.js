import React, { Component } from 'react';
import EventTable from './EventTable'
import EventForm from './EventForm'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { getAccessToken } from "../Util/token-util";
export default class Home extends Component {

    GOOGLE_CALENDAR_EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.deleteEvent = this.deleteEvent.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    async componentDidMount() {
        const token = await getAccessToken();
        axios.get(
            this.GOOGLE_CALENDAR_EVENTS_URL,
            { headers: { Authorization: `Bearer ${token}`, } }
        )
            .then(response => {
                this.setState({ events: response.data['items'] });
            })
            .catch(error => console.log(error.message))
    }

    async saveEvent(event) {
        const token = await getAccessToken();
        axios.post(
            this.GOOGLE_CALENDAR_EVENTS_URL,
            event,
            { headers: { Authorization: `Bearer ${token}`, } }
        )
            .then(response => {
                this.setState({ events: [...this.state.events, response.data] })
            })
            .catch(error => console.log(error.message))
    }

    async deleteEvent(id) {
        const token = await getAccessToken();
        axios.delete(
            `${this.GOOGLE_CALENDAR_EVENTS_URL}/${id}`,
            { headers: { Authorization: `Bearer ${token}`, } }
        )
            .then(() => {
                this.setState({ events: this.state.events.filter(event => event.id !== id) });
            })
            .catch(error => console.log(error.message))
    }

    render() {
        return (
            <Stack direction="column" spacing={2}>
                <EventForm save={this.saveEvent} />
                <EventTable events={this.state.events} delete={this.deleteEvent} />
            </Stack>
        );
    }
}