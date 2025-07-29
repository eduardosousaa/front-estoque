"use client"
import { useState, useEffect } from "react";
import Constantes from "../../../../../src/Constantes";
import { parseCookies } from "nookies";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem ,
        Col, Form, FormGroup, Label, Row, Button, Table, Input,
        Card,CardHeader,CardBody } from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiInfoCircle,BiTrash } from "react-icons/bi";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { MdDriveFolderUpload, MdOutlinePhotoCamera} from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import AlertMessage from "../../../../../src/Components/ElementsUI/AlertMessage";
import LoadingGif from  "../../../../../src/Components/ElementsUI/LoadingGif";
import styles from "../abastecimento.module.css";
import InputForm from "../../../../../src/Components/ElementsUI/InputForm";
import AsyncSelectForm from "../../../../../src/Components/ElementsUI/AsyncSelectForm";
import TableStyle from  "../../../../../src/Components/ElementsUI/TableStyle";
import MaskReal from "../../../../../src/Utils/MaskReal";

export default function Create() {

   const { "token2": token2 } = parseCookies();

   const {
	  	register,
	  	handleSubmit,
	  	setError,
	  	clearErrors,
	  	control,
	  	setValue,
      getValues,
	  	formState: { errors },
	} = useForm({ /* defaultValues:  */});

   const [open, setOpen] = useState(["register","address","vehicles"]);
   const [loading, setLoading] = useState(false);

   const router = useRouter();
   const params = useParams();

   const [type, setType] = useState("abastecimento");

   const fuelTypes = [ { id: 'COMUM', name: 'Gasolina comum' },
                       { id: 'GASOLINA_ADITIVADA', name: 'Gasolina aditivada' },
                       { id: 'S10', name: 'Diesel S10' },
                       { id: 'S500', name: 'Diesel S500' },
                       { id: 'DIESEL_ADITIVADO', name: 'Diesel aditivado' }];


   const [photos, setPhotos] = useState([{arquivoBlob:"https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXJsfGVufDB8fDB8fHww"},
                                         {arquivoBlob:"https://images.unsplash.com/photo-1587691592099-24045742c181?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXJsfGVufDB8fDB8fHww"},
                                         {arquivoBlob:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww"},
                                         {arquivoBlob:"https://images.unsplash.com/photo-1741704751367-e276706e530d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVybHxlbnwwfHwwfHx8MA%3D%3D"},
                                         {arquivoBlob:"https://images.unsplash.com/photo-1605099922599-a9e6eaf1ab5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHVybHxlbnwwfHwwfHx8MA%3D%3D"}]);

   const [documents, setDocuments] = useState([/* {arquivo: (formData),
                                                 arquivoBlob: (blob),
                                                 descricao: (string)} */
                                          {arquivo: null,
                                           arquivoBlob: null,
                                           descricao: "arquivo.pdf"}]);


   const [createInvoice, setCreateInvoice] = useState([]);


   const [columns, setColumns] = useState(["Veículo","Quilometragem","Posto de Combustível","Tipo de Combustível","Data","Valor","Ações"]);

   const [fuelSupplies, setFuelSupplies] = useState([{vehicle:"ONIB-2023-0001",kilometer:"342.850 km",gasStation:"Posto BR Sul",fuelType:"Diesel S500",date:"01/01/2025",value:"R$ 220,00"}]);

   const [alert, setAlert] = useState({});
   const [activeAlert, setActiveAlert] = useState(false);
   const [isOpen, setIsOpen] = useState(true);
   const onDismiss = () => setIsOpen(false);


   function showAlert(type, text) {
      setIsOpen(false);

      setAlert({
          type: type,
          text: text
      })
      setIsOpen(true)
      setActiveAlert(true)
   }

   const [accordionErrors, setAccordionErrors] = useState([]);

   const toggle = (id) => {
         if(open.includes(id)){
            setOpen(open.filter((e) => e != id)); 
         }else{
            setOpen([...open,id]);
         } 
   };

   /* const [data, setData] = useState({}); 

   const [errors, setErrors] = useState({});*/


    const gasStationOptions = (teste) => {
      /*  let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "supplier?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackAdmin + url, {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.json())
          .then((data) => {
       
             let dadosTratados = [];
       
             data["content"].forEach(dado =>
                dadosTratados.push({
                 "value":  dado.id,
                 "label": dado.name 
                }));
       
                 return dadosTratados;
          }); */
          return [];
    };


    const vehicleOptions = (teste) => {
       let url;
       let query = {};
       query.size = 100;
       query.plate = teste;
       url =  "vehicle/own_vehicle?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackPatrimony + url, {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.json())
          .then((data) => {
       
             let dadosTratados = [];
       
             data["content"].forEach(dado =>
                dadosTratados.push({
                 "value":  dado.id,
                 "label": dado.plate 
                }));
       
                 return dadosTratados;
          });
    };


     const invoiceOptions = (teste) => {
      /*  let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "supplier?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackAdmin + url, {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.json())
          .then((data) => {
       
             let dadosTratados = [];
       
             data["content"].forEach(dado =>
                dadosTratados.push({
                 "value":  dado.id,
                 "label": dado.name 
                }));
       
                 return dadosTratados;
          }); */
          return [];
    };

    const fuelSupplyOptions = (teste) => {
      /*  let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "supplier?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackAdmin + url, {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.json())
          .then((data) => {
       
             let dadosTratados = [];
       
             data["content"].forEach(dado =>
                dadosTratados.push({
                 "value":  dado.id,
                 "label": dado.name 
                }));
       
                 return dadosTratados;
          }); */
          return [];
    };

    
   function changeArquivo(e,type){
      if(e.target.files[0] != undefined){

         let bar;
         if(e.target.value.includes("\\")) bar = "\\"; 
         if(e.target.value.includes("/")) bar = "/";
         let fileName = e.target.value.split(bar)[e.target.value.split(bar).length - 1]; 

         const file = e.target.files[0];
         const newFile = new File([file],fileName,{
                            type: file.type
                         });
      
         const reader = new FileReader();
   
         reader.onload = function(e) {
           const blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
           /* console.log(blob); */
           const objectURL = URL.createObjectURL(blob);
           /* console.log(objectURL); */

           if(type == "document"){
              setDocuments([...documents,{arquivo: newFile,
                                         arquivoBlob: objectURL,
                                         descricao: fileName}]);
           }else if(type == "photo"){
               setPhotos([...photos,{arquivo: newFile,
                                    arquivoBlob: objectURL,
                                    descricao: fileName}]);
           }
         };
   
         reader.readAsArrayBuffer(file);
      }
    }   


   function dataForTable(data){
     let tableData = [];
 
     data.forEach(d => 
         tableData.push({
               "vehicle": d.vehicle,
               "kilometer": d.kilometer,
               "gasStation": d.gasStation,
               "fuelType": d.fuelType,
               "date": d.date,
               "value": d.value,
               "actions": actionButtons(d.id)
         })
     );

     return tableData;
   }

   function actionButtons(id){
    return <div style={{display:"flex",gap:"2%",flexWrap:"wrap"}}>
            <div className={styles.balloon_div}>
               <Button className={styles.button} onClick={() => {router.push(`/custos/abastecimento/${id}?type=abastecimento`)}}><BiInfoCircle/></Button>
               <div className={styles.balloon_aviso_div}>
                 <div className={styles.balloon_aviso_border}>
                   <div className={styles.balloon_aviso_text}>
                      Visualizar
                   </div>
                 </div>
               </div>
             </div>
           </div>;
   }


  

   function submit(){
      
      /* setLoading(true);

      let url = "employee";
      fetch(Constantes.urlBackAdmin + url, {
            method: "POST",
            headers: {
                "Module": "ADMINISTRATION",
                "Authorization": token2
            },
            body: formData
      })
      .then((response) => 
           response.status == 201 ? {status: response.status, body:  null} :
           response.json().then(data => ({
                          status: response.status, 
                          body: data }))
      ) 
      .then(({status, body}) => {

           setLoading(false);

           switch(status){
               case 201:
                 showAlert("success", "Funcionário cadastro com sucesso!");
                 router.push("/admin/funcionarios");
               break;
               case 400:
                 let apiErrors = {
                              person:{},
                              address:{},
                              accountBanks:{},
                              employee:{},
                              kinship:{}
                           };
                 let sectionError = [];
                 Object.keys(body).forEach((error) => {
                     if(!sectionError.includes(error.split(".")[0])) sectionError.push(error.split(".")[0]);
                     apiErrors[error.split(".")[0]][error.split(".")[1]] = body[error];
                 })
                 setErrors(apiErrors);
                 setAccordionErrors(sectionError);
                 showAlert("danger", "Preencha os dados obrigatórios!");
               break;
               case 404:
                 console.log("erro:",body);
                 showAlert("danger",body.message);
               break;
               
           }
      })
      .catch((error) => {
         console.log(error);
      })  */
    }

   useEffect(() => {
      if(accordionErrors.length > 0){
         setOpen(accordionErrors);
         showAlert("danger", "Preencha os dados obrigatórios!");
      }
     /*  accordionErrors.forEach((accordion) =>{ 
         setOpen(accordion);
         showAlert("danger", "Preencha os dados obrigatórios!");
         return;
      }); */
      
   },[accordionErrors]);

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.get('type')) {
         setType(urlParams.get('type'));
      } 
      
     //getFuelSupply(params.id);
      
   },[params]);


   return (<>

        { loading && <LoadingGif/>}

        <CardHeader className={styles.header} style={{justifyContent:"flex-start", alignItems: "center"}}>
           <IoArrowBackCircleSharp style={{width:"45px",height:"70px",color:"#009E8B",cursor:"pointer"}}
                                   onClick={() => {router.back()}}/>
           <h1 className={styles.header_h1}>Dados de {type == "abastecimento" && "Abastecimento"}
                                                     {type == "nota" && "Nota Fiscal"}</h1>
        </CardHeader>
        
        <CardBody style={{width:"90%"}}>
           <Form onSubmit={handleSubmit(submit)}>


            { type == "abastecimento" && <>
             <Card style={{padding:"20px"}}>
              <Row className="d-flex mt-3">
                 <Col sm="4">Veículo<br/> ONIB-2023-001</Col>
                 <Col sm="4">Tipo de Combustível<br/> Diesel S10</Col> 
                 <Col sm="4">Posto de Combustíve<br/> Posto Total</Col> 
              </Row>
              <Row className="d-flex mt-3 mb-3">
                <Col sm="4">Quilometragem<br/> 128.430 km</Col>
                <Col sm="4">Valor<br/> R$ 220,90</Col> 
                <Col sm="4">Data<br/> 04/04/2024</Col> 
              </Row>
             </Card>
             <Card style={{padding:"20px",marginTop:"20px"}}>
                <Row className="d-flex mt-3">
                  {documents.length > 0 && <Col sm="6">
                     {documents.map((document,index) =>  
                        <Card key={index} className={styles.archiveFormLink}>
                            <a href={document.arquivoBlob} target="_blank" rel="noreferrer">{document.descricao}</a>
                        </Card>
                      )}
                  </Col>}
                  {photos.length > 0 && <Col sm="6">
                    <Row className="d-flex mt-3">
                       {photos.map((photo,index) =>  
                          <Col key={index} sm="4">
                              <div style={{position:"relative",backgroundColor:"#E5E7EB", padding:"16px",width:"232px",height:"160px"}}>

                                  <div style={{backgroundColor:"#FFFFFF",
                                               border:"2px dashed #D1D5DB",
                                               padding:"16px",
                                               display:"flex",
                                               flexDirection:"column",
                                               alignItems:"center",
                                               justifyContent:"center",
                                               width:"200px",height:"118px"}}>
   
                                   <img style={{width:"200px",maxHeight:"118px"}} src={photo.arquivoBlob}/>
                                             
                                  </div>
                              </div>
                          </Col>
                        )}
                    </Row>
                  </Col>}
                </Row>
             </Card>
            </>}


            { type == "nota" && <>


               <Card style={{padding:"20px"}}> 
                 <Row className="d-flex mt-3">
                   <Col sm="4">N da Nota Fiscal<br/> 004872</Col>
                   <Col sm="4">Data de Emissão<br/> 04/04/2024</Col>
                   <Col sm="4">Valor Total<br/> R$ 220,90</Col>  
                 </Row>
               </Card>

               
               <Row className="d-flex mt-3">
                   <TableStyle columnNames={columns} data={dataForTable(fuelSupplies)} />

               </Row>
            </>}
          
            <Row className="d-flex mt-3 justify-content-end">
                <Button onClick={() => submit()}
                        style={{ backgroundColor: "#009E8B", width:"25%", height:"60px"}}>
                   Salvar
                </Button>
             </Row> 
          </Form>
        </CardBody>

      
       
        {activeAlert && (
            <AlertMessage type={alert["type"]}
                text={alert["text"]}
                isOpen={isOpen}
                toggle={onDismiss}>
            </AlertMessage>
         )}
       
    </>)
  }