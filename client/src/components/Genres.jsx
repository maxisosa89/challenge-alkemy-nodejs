import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState, useEffect } from "react";

const url = "/genres";

export default function () {
    const [genres, setGenres] = useState();
    const [modalInsert, setModalInsert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tipoModal, setTipoModal] = useState("")
    const [form, setForm] = useState({
        idGenre: "",
        nameGenre: "",
        imgGenre: "",
    })
    
    const getGenres = async() => {
        await axios.get(url).then(response => {
            setGenres(response.data)
        }).catch(err => console.log(err))
    }
    const postGenre = async()=> {
        await axios.post(url, form).then(response => {
            openModal()
            getGenres()
            alert(response.data)
        }).catch(err => console.log(err))
    }

    const selectGenre = (genreEdited) => {
        setTipoModal("actualizar")
        setForm({
            idGenre: genreEdited.idGenre,
            nameGenre: genreEdited.nameGenre,
            imgGenre: genreEdited.imgGenre,
        })
    }

    const putGenre = async() => {
        
        await axios.put(url+"/"+form.idGenre, form).then(response => {
            openModal()
            getGenres()
            alert(response.data)
        }).catch(err => console.log(err))
    }

    const openModal = () => {
        setModalInsert(!modalInsert)
    }

    const handlechange = async(e) => {
        e.persist()
        await setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
    }

    const deleteGenre = async() => {
        await axios.delete(url+"/"+form.idGenre).then(response => {
            setModalDelete(false)
            getGenres()
            alert(response.data)
        }).catch(err => console.log(err))
    }

    useEffect(()=>{
        getGenres()
    }, [])

    return (
        <div className="container p-4">
            <br />
            <h1>Genres</h1>
            <button className="btn btn-success" onClick={()=>{setForm({
        idGenre: "",
        nameGenre: "",
        imgGenre: "",
    });setTipoModal("");openModal()}}>Add Genre</button>
            <br /><br />
            <div className="row">
              
                        {
                            genres?.map(e => {
                                return (
                               
                                    <div className="col-md-3" key={e.idGenre}>
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <h3 className="card-title text-uppercase">
                                                    {e.nameGenre}
                                                </h3>
                                                {
                                                    <img src={e.imgGenre ? e.imgGenre : "https://bitsofco.de/content/images/2018/12/broken-1.png"} style={{width: "100%", height: "150px", marginBottom:"10px"}}></img>
                                                }
                                                <button className="btn btn-primary" onClick={() =>{selectGenre(e); openModal()}}><FontAwesomeIcon icon={faEdit}/></button>
                                                {"  "}
                                                <button className="btn btn-danger" onClick={() =>{selectGenre(e); setModalDelete(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                            </div>
                                        </div>    
                                    </div>
     
                               
                                )
                            })
                        }
                      
            </div>

            <Modal isOpen={modalInsert}>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="idGenre">ID</label>
                        <input className="form-control" type="text" name="idGenre" id="idGenre" value={form ? form.idGenre : ""} readOnly />
                        <br />
                        <label htmlFor="nameGenre">Name</label>
                        <input onChange={handlechange} className="form-control" type="text" name="nameGenre" id="nameGenre" value={form ? form.nameGenre : ""}/>
                        <br />
                        <label htmlFor="imgGenre">Image</label>
                        <input onChange={handlechange} className="form-control" type="text" name="imgGenre" id="imgGenre" value={form ? form.imgGenre : ""}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {
                        tipoModal !== "actualizar" ?
                        <button className="btn btn-success" onClick={postGenre}>Create</button> :
                        <button className="btn btn-success" onClick={e => putGenre(form)}>Save</button>
                    }
                    <button className="btn btn-danger"  onClick={()=> openModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Are you sure?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => deleteGenre()}>YES</button>
                    <button className="btn btn-secondary" onClick={()=> setModalDelete(false)}>NO</button>
                </ModalFooter>
            </Modal>



        </div>
    )

}