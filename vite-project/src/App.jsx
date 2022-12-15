import React from 'react'
import './App.css'
import { Routes, Route,Navigate } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import ContactList from './components/contacts/ContactList/ContactList'
import ViewContact from './components/contacts/ViewContact/ViewContact'
import EditContact from './components/contacts/EditContact/EditContact'
import AddContact from './components/contacts/AddContact/AddContact'

let App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>}/>
        <Route path={'/contacts/add'} element={<AddContact/>}/>
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
      </Routes>
    </>
  ) 
}

export default App
