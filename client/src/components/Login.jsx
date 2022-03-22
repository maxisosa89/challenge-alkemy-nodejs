import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState, useEffect } from "react";
import { faWindows } from "@fortawesome/free-brands-svg-icons";



export default function Login(){
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [formLogin, setFormLogin] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })


    const handlechange = async(e) => {
        e.persist()
        await setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async() => {
        await axios.post("/signin", formLogin).then(response => {
            
            window.localStorage.setItem(
                'logged', JSON.stringify(response.data)
            )
        }).catch(err => alert(err))
    }
    const handleSignUp = async() => {
        await axios.post("/signup", formLogin).then(response => {
            setModalOpen(false)
            alert(response.data.msg)
            
        }).catch(err => alert(err))
    }


    return (
        <div className="form-group d-flex justify-content-center align-items-center vh-100">
            <div className="border" style={{width: "300px", padding: "10px 50px 50px 50px"}}>
                <h1>Login</h1>
                <div >
                    <label htmlFor="email">Email:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="email" id="email" value={formLogin ? formLogin.email : ""}/>
                    <br />
                </div>
                <div >
                    <label htmlFor="password">Password:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="password" id="password" value={formLogin ? formLogin.password : ""}/>
                    <br />
                </div>
                <div className="row col d-flex justify-content-center">
                    <button className="btn btn-primary col-5" style={{margin: "0px 5px 0px 0px"}} onClick={handleLogin}>Enter</button>
                    <button className="btn btn-secondary col-5" style={{margin: "0px 0px 0px 5px"}} onClick={() => setModalOpen(true)}>Sign Up</button>
                </div>
            </div>
            <Modal isOpen={modalOpen}>
                <ModalBody>
                    <h1>Sign Up</h1>
                    <label htmlFor="nameUser">Name:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="nameUser" id="nameUser" value={formLogin ? formLogin.nameUser : ""}/>
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="email" id="email" value={formLogin ? formLogin.email : ""}/>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="password" id="password" value={formLogin ? formLogin.password : ""}/>
                    <br />
                    <label htmlFor="password2">Repeat Password:</label>
                    <input onChange={handlechange} className="form-control" type="text" name="password2" id="password2" value={formLogin ? formLogin.password2 : ""}/>
                    <br />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                    <button className="btn btn-secondary" onClick={()=> setModalOpen(false)}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )}

