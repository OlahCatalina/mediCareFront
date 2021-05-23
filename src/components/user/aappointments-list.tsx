import React, { useEffect, useRef, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import axios from "axios";
import { Accordion, Card } from 'react-bootstrap';
import "./appointments.css";

const Appointments = (props: { id: any; }) => {
    const [appointments, setAppointments] = useState<any>([]);
    const [doctors, setDoctors] = useState<any>([]);
    const [medicalServices, setMedicalServices] = useState<any>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<any>();
    const [selectedService, setSelectedService] = useState<any>();
    const selectedDate = useRef<any>();
    useEffect(() => {
        if (props.id) {
            getApps();
        }
        getDoctors();
        getMedicalServices();
    }, []);

    const getApps = async () => {
        let res = await axios.get(`http://localhost:8000/api/appointments/${props.id}`);
        setAppointments(res.data);
    }

    const getDoctors = async () => {
        let res = await axios.get(`http://localhost:8000/api/doctors`);
        setDoctors(res.data.data);
    }

    const getMedicalServices = async () => {
        let res = await axios.get(`http://localhost:8000/api/medical-services`);
        setMedicalServices(res.data.data);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setSelectedDoctor(null);
        setSelectedService(null);
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        const app = {
            medical_service_id: selectedService.id,
            user_id: props.id,
            doctor_id: selectedDoctor.id,
            date: selectedDate.current.value
        };
        let res = await axios.post(`http://localhost:8000/api/appointment`, app);
        if (res.status === 200) {
            getApps();
            handleClose();
        }
    }

    return (
        <div className="cont">
            <Button className="create-btn" variant="info" onClick={handleShow}>Create a new appointment</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton id="dropdown-item-button" title="Select doctor" className="dropdown">
                        {
                            doctors.map((doctor: any, index: any) => (
                                <Dropdown.Item key={doctor.id} as="button" onClick={(e) => { setSelectedDoctor(doctor) }}>{doctor.full_name}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    {selectedDoctor && <p className="dropdown">Selected doctor {selectedDoctor.full_name}</p>}

                    <DropdownButton id="dropdown-item-button" title="Select medical service" className="dropdown">
                        {
                            medicalServices.map((doctor: any, index: any) => (
                                <Dropdown.Item key={doctor.id} as="button" onClick={(e) => { setSelectedService(doctor) }}>{doctor.title}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    {selectedService && <div>
                        Selected service {selectedService.title}
                        <p>Description {selectedService.description}</p>
                        <p>Price {selectedService.price}</p>
                    </div>}

                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group controlId="date">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control ref={selectedDate} type="date" name="date" placeholder="Choose appoointment date" />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirm appointment
                    </Button>
                </Modal.Footer>
            </Modal>
            <Accordion defaultActiveKey="0">
                {appointments.map((appointment: any, index: any) => (
                    <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={appointment.id.toString()}>
                            <div>Date: {appointment.date} - {appointment.doctor}</div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={appointment.id.toString()}>
                            <Card.Body>
                                <div>My doctor: {appointment.doctor}</div>
                                <div>Medical service: {appointment.medical_service}</div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </div >
    );
}

export default Appointments;
