import React, { useState, useEffect } from 'react';
import { confirm } from "react-confirm-box";
import { json, Link } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Navbar/Spinner/Spinner';

const ContactList = () => {
    let [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMessage: ''
    });

    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            const getUsers = async () => {
                let response = await ContactService.getAllContacts();
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data
                })
            };
            getUsers();
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    let clickDelete = async (contactId) => {
        try {
            const result = await confirm("Are you sure want to Delete Contact");
            if (result) {
                let response = await ContactService.deleteContact(contactId); // removing
                if (response) {
                    setState({ ...state, loading: true })
                    const getUsers = async () => {
                        let response = await ContactService.getAllContacts();
                        setState({
                            ...state,
                            loading: false,
                            contacts: response.data
                        })
                    };
                    getUsers();
                }
            }

        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }

    }

    let { loading, contacts, errorMessage } = state;

    return (
        <>
            <section className='contact-search p-3'>
                <div className='container'>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col'>
                                <p className="h3">Contact List Application
                                    <Link to={'/contacts/add'} className="btn-bnt-primary ms-2">
                                        <i className='fa fa-plus-circle me-2' />
                                        Add Contact</Link>
                                </p>
                                <p className='fst italic'>
                                    In this Application You Can Save your Contact Details for Clicking Add New Contact Button and update accroding to their requirement on clicking given icons. Here you can update your image url Delete and view your contact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : <>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    contacts.length > 0 &&
                                    contacts.map(contact => {
                                        return (
                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-4">
                                                                <img src={contact.photo} alt="" className='img-fluid contact-img' />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className='list-group'>
                                                                    <li className='list-group-item list-group-item-section'>
                                                                        Name: <span className='fw-bold'>{contact.name}</span>
                                                                    </li>
                                                                    <li className='list-group-item list-group-item-section'>
                                                                        Phone: <span className='fw-bold'>{contact.mobile}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-1">
                                                                <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                                                    <i className='fa fa-eye' />
                                                                </Link>
                                                                <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                                                    <i className='fa fa-pen' />
                                                                </Link>
                                                                <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                                                    <i className='fa fa-trash' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}
export default ContactList;