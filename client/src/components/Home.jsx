import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState, useEffect } from "react";
import Categories from './Categories'
import Login from './Login'




export default function Home({token}){
    

    return (
        <div>
            {
                !token ?
                <Login />
                :
                <Categories />
                
            }
            
        </div>
    )}

