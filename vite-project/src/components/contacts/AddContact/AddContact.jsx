import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';

const AddContact = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: ""

    },
    groups: [],
    errorMessage: ''

  })

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }

  useEffect(() => {
    try {
      setState({ ...state, loading: true })
      const getUsers = async () => {
        let response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data
        })
      };
      getUsers();
    } catch (error) {
      setState({
        ...state,
        loading:false,
        groups: response.data
      })
    }

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact)
      if (response) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message })
      navigate('/contacts/add', { replace: false });
    }

  }

  let { contact, groups } = state;

  return (
    <>
      <section className='add-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold"> Create Contact</p>
              <p className='fst-italic'>  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, quo? </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text" className='form-control' placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="number" className='form-control' placeholder='Mobile' />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className='form-control'>
                    <option value="">Select a Type</option>
                    {
                      groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className='btn btn-success' value='Create' />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default AddContact;