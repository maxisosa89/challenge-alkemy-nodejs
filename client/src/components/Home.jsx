import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";

export default function Home(){
    const [modalOpen, setModalOpen] = useState(false)

    function handleSignUp(){
        setModalOpen(true)
    }

    return (
        <div className="form-group d-flex justify-content-center align-items-center vh-100">
            <div className="border" style={{width: "300px", padding: "50px"}}>
                <label htmlFor="email">Email</label>
                <input onChange={e=>console.log(e)} className="form-control" type="text" name="email" id="email" value={""}/>
                <br />
                <label htmlFor="password">Password</label>
                <input onChange={e=>console.log(e)} className="form-control" type="text" name="password" id="password" value={""}/>
                <br />
                <div className="row">
                    <button className="btn btn-primary col-6">Enter</button>
                    <button className="btn btn-secondary col-6" onClick={handleSignUp}>SignUp</button>
                </div>
            </div>
            <Modal isOpen={modalOpen}>
                <ModalBody>
                    <label htmlFor="nameUser">Name</label>
                    <input onChange={e=>console.log(e)} className="form-control" type="text" name="nameUser" id="nameUser" value={""}/>
                    <br />
                    <label htmlFor="email">Email</label>
                    <input onChange={e=>console.log(e)} className="form-control" type="text" name="email" id="email" value={""}/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input onChange={e=>console.log(e)} className="form-control" type="text" name="password" id="password" value={""}/>
                    <br />
                    <label htmlFor="password2">Repeat Password</label>
                    <input onChange={e=>console.log(e)} className="form-control" type="text" name="password2" id="password2" value={""}/>
                    <br />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary">Sign Up</button>
                    <button className="btn btn-secondary" onClick={()=> setModalOpen(false)}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )}

