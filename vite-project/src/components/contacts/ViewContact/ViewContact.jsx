import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Navbar/Spinner/Spinner';


const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
    group: {}
  })

  useEffect(() => {
    try {
      setState({ ...state, loading: true })
      const getUsers = async () => {
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroup(response.data)
        console.log(response.data)
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data
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

  }, [contactId])

  let { loading, contact, errorMessage, group } = state;

  return (
    <>
      <section className='view-contact-intro'>
        <div className='container'>
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p><b>Here you Can See your Contact Details</b></p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner /> : <>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
            <section className='view-contact mt-3'>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={contact.photo} alt="" className='img-fluid' />
                  </div>
                  <div className="col-md-8">
                    <ul className='list-group'>
                      <li className='list-group-item list-group-item-section'>
                        Name: <span className='fw-bold'>{contact.name}</span>
                      </li>
                      <li className='list-group-item list-group-item-section'>
                        MobileNumber: <span className='fw-bold'>{contact.mobile}</span>
                      </li>
                      <li className='list-group-item list-group-item-section'>
                        Type: <span className='fw-bold'>{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
                  </div>
                </div>
              </div>
            </section>
          }
        </>
      }

    </>
  )
}

export default ViewContact;