import React, { useState,useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Navbar/Spinner/Spinner';

const EditContact = () => {
  let navigate = useNavigate();
 let {contactId} = useParams();

  let [state,setState] = useState({
    loading: false,
    contact : {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: ""
    },
    groups : [],
    errorMessage : ''
  })

  useEffect(() => {
    try {
      setState({ ...state, loading: true })
      const getUsers = async () => {
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();

        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups:groupResponse.data
        })
      };
      getUsers();
    } catch (error) {
      setState({
        ...state,
        loading:false,
        contact: response.data
      })

    }
    return () => {
      // this now gets called when the component unmounts
    };
  }, [contactId]);

  let updateInput = (event) =>{
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name] : event.target.value
      }
    })

  }

  let submitForm = async (event) =>{
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId)
      if (response) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message })
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }

  }
  
  let { loading, contact, groups, errorMessage } = state;

  return (
    <>
    {
      loading? <Spinner/> : <>
      <section className='add-contact p-3'>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3 text-primary fw-bold">Edit Contact</p>
            <p> <b>Here You Can Modify and update Your Contacts</b></p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-4">
            <form onSubmit={submitForm}>
              <div className="mb-2">
                <input 
                required="true"
                name= "name"
                value={contact.name}
                onChange={updateInput}
                type="text" className='form-control' placeholder='Name'/>
              </div>
              <div className="mb-2">
                <input 
                 required="true"
                 name= "photo"
                 value={contact.photo}
                 onChange={updateInput}
                type="text" className='form-control' placeholder='Photo Url'/>
              </div>
              <div className="mb-2">
                <input 
                 required="true"
                 name= "mobile"
                 value={contact.mobile}
                 onChange={updateInput}
                type="number" className='form-control' placeholder='Mobile'/>
              </div>
              <div className="mb-2">
                <select
                 required="true"
                 name= "groupId"
                 value={contact.groupId}
                 onChange={updateInput}
                 className='form-control'>
                  <option value="">Select a Type</option>
                  {
                    groups.length>0 && 
                    groups.map(group =>{
                      return(
                        <option key={group.id} value={group.id}>{group.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="mb-2">
                <input type="submit" className='btn btn-primary' value='Update'/>
                <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
              </div>
            </form>
          </div>
          <div className="col-md-6">
          <img src={contact.photo} alt="" className='img-fluid'/>
          </div>
        </div>
      </div>
    </section>
      </>
    }
    
  </>
  )
}

export default EditContact