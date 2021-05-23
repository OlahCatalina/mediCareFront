import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';
import "./apps.css";
import './capp.css';
import AppointmentsChart from "./chart";
const Calendar = require('react-awesome-calendar').default;

const DoctorAppointmentsPage = (props: { id: any }) => {

    const [appointments, setAppointments] = useState<any>([]);
    const [event, setEvent] = useState<any>();
    const [events, setEvents] = useState<any>([]);
    let calendar = useRef();
    
    useEffect(() => {
        getApps();
    }, []);

    const toEvents = (events: any[]) => {
        let options: { id: any; from: any; to: any; color: string; title: any; }[] = [];
        events.forEach(event => {
            options.push({
                id: event.id,
                from: event.date,
                to: event.date,
                color: '#8281fd',
                title: "Service " + event.medical_service + " for " + event.patient.first_name + " " + event.patient.last_name,
            });
        });
        return options;
    }

    const getApps = async () => {
        let res = await axios.get(`http://localhost:8000/api/doctor-appointments/${props.id}`);
        setAppointments(res.data);
        setEvents(toEvents(res.data));
    }
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const openModal = (event: any) => {
        setEvent(events.find((el: any) => el.id === event));
        console.log(events.find((el: any) => el.id === event));
        handleShow();
    }

    return (
        <div className="cont">
            {event && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {event && <div>
                        <p>Selected service {event.medical_service}</p>
                        <p>{event.title}</p>
                        <p>Date {event.from}</p>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            }
            {
                events &&
                <div className="pageCalendar">
                    <Calendar
                        ref={calendar}
                        onClickEvent={(event: any) => openModal(event)}
                        onChange={(dates: any) => console.log(dates)}
                        onClickTimeLine={(date: any) => console.log(date)}
                        events={events}
                    />
                </div>


            }
            <AppointmentsChart appointments={appointments}/>
        </div >
    )
}

export default DoctorAppointmentsPage;
