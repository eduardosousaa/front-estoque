"use client"
import { useState, useEffect } from "react";
import Constantes from "../../../../../src/Constantes";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Col, Form, FormGroup, Label, Row, Button, Table, Input,
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
   
   const [type, setType] = useState("abastecimento");

   const fuelTypes = [ { id: 'GASOLINE_COMMON', name: 'Gasolina comum' },
                       { id: 'GASOLINE_ADDITIVE', name: 'Gasolina aditivada' },
                       { id: 'DIESEL_S10', name: 'Diesel S10' },
                       { id: 'DIESEL_S500', name: 'Diesel S500' },
                       { id: 'DIESEL_ADDITIVE', name: 'Diesel aditivado' }];


   const [photos, setPhotos] = useState([]);

   const [documents, setDocuments] = useState([/* {arquivo: (formData),
                                                 arquivoBlob: (blob),
                                                 descricao: (string)} */]);


   const [createInvoice, setCreateInvoice] = useState([]);


   const [columns, setColumns] = useState(["Veículo","Quilometragem","Posto de Combustível","Tipo de Combustível","Data","Valor","Ações"]);

   const [fuelSupplies, setFuelSupplies] = useState([/* {vehicle:"ONIB-2023-0001",kilometer:"342.850 km",gasStation:"Posto BR Sul",fuelType:"Diesel S500",date:"01/01/2025",value:"R$ 220,00"} */]);

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


   const toggle = (id) => {
         if(open.includes(id)){
            setOpen(open.filter((e) => e != id)); 
         }else{
            setOpen([...open,id]);
         } 
   };

   /* const [data, setData] = useState({}); 

   const [errors, setErrors] = useState({});*/


   const supplierOptions = (teste) => {
           let url;
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
              });
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
       let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "supply/invoice?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackCosts + url, {method: "GET",
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
                 "label": "N°" + dado.number + " - R$" + dado.value 
                }));
       
                 return dadosTratados;
          });
          return [];
    };

    const fuelSupplyOptions = (teste) => {
       let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "supply?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackCosts + url, {method: "GET",
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
          });
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


   function addFuelSupply(){
      let fuelSupply = getValues("fuelSupply");
     
      if(fuelSupply == "") return;

      setFuelSupplies([...fuelSupplies,fuelSupply]);
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
               <Button className={styles.button} onClick={() => setFuelSupplies(fuelSupplies.filter((_,i) => i != index))}><FaTrash/></Button>
               <div className={styles.balloon_aviso_div}>
                 <div className={styles.balloon_aviso_border}>
                   <div className={styles.balloon_aviso_text}>
                      Remover
                   </div>
                 </div>
               </div>
             </div>
           </div>;
   }


  

   function submit(data){
      
      setLoading(true);

      let url;

      const formData = new FormData();
       
      if(type == "abastecimento") {
          console.log("abastecimento");
          let post = { ...data};

          post.value = post.value.replaceAll(".","");
          post.value = parseFloat(post.value.replace(",","."));
          
          console.log(post);
          if(photos.length > 0) photos.forEach((photo) => { formData.append("images",photo.arquivo,photo.desricao)});
          
          if(documents.length > 0) documents.forEach((document) => { formData.append("files",document.arquivo,document.desricao)});
          
          const jsonString = JSON.stringify(post);
          const jsonBlob = new Blob([jsonString], { type: "application/json"});
          formData.append("supply",jsonBlob,"supply.json");
          url = "supply";
      }else if (type == "nota"){
         data.value = data.value.replaceAll(".","");
         data.value = parseFloat(data.value.replace(",","."));
         data.supply = fuelSupplies;
         url = "supply/invoice";
      }
      
      fetch(Constantes.urlBackCosts + url, {
            method: "POST",
            headers: {
                ...(type == 'nota' &&  {'Content-Type': 'application/json'}),
                "Module": "COSTS",
                "Authorization": token2
            },
            body: type == "nota" ? JSON.stringify(data) : formData
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
                 showAlert("success",type == "abastecimento" ? "Abastecimento cadastro com sucesso!" :
                                                               "Nota cadastrada com sucesso!");
                 router.push("/custos/abastecimento");
               break;
               case 400:
                 setErrors(body);
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
      })
    }

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.get('type')) {
         setType(urlParams.get('type'));
      }   

   },[]);


   return (<>

        { loading && <LoadingGif/>}

        <CardHeader className={styles.header} style={{justifyContent:"flex-start", alignItems: "center"}}>
           <IoArrowBackCircleSharp style={{width:"45px",height:"70px",color:"#009E8B",cursor:"pointer"}}
                                   onClick={() => {router.back()}}/>
           <h1 className={styles.header_h1}>Cadastro de {type == "abastecimento" && "Abastecimento"}
                                                        {type == "nota" && "Nota Fiscal"}</h1>
        </CardHeader>
        
        <CardBody style={{width:"90%"}}>
           <Form onSubmit={handleSubmit(submit)}>


            { type == "abastecimento" && <>
             <Card style={{padding:"20px"}}>

              <Row className="d-flex mt-3">
                 <FormGroup style={{fontSize:"20px",marginLeft:"15px"}} switch>
                   <Input
                     type="switch"
                     checked={createInvoice}
                     onChange={() => {
                       setCreateInvoice(!createInvoice);
                     }}
                   />
                   <Label check>Cadastrar Nota Fiscal</Label>
                 </FormGroup>

                 {createInvoice ? <>
                      <Col sm="4">
                         <InputForm
                           id="invoiceNumber"
                           name="invoiceNumber"
                           label="N° da Nota Fiscal"
                           placeholder="--Digite--"
                           register={register}
                           required={true}
                           type="text"
                           errors={errors}
                         />
                      </Col>
                      <Col sm="4">
                         <InputForm
                           id="invoiceDate"
                           name="invoiceDate"
                           label="Data de Emissão"
                           placeholder="dd/mm/aaaa"
                           register={register}
                           type="date"
                         />
                      </Col>
                      <Col sm="4">
                         <InputForm
                           id="invoiceValue"
                           name="invoiceValue"
                           label="Valor Total*"
                           placeholder="--Digite--"
                           register={register}
                           required={true}
                           onChange={(e) => MaskReal(e)}
                           type="text"
                           errors={errors}
                          />
                      </Col>
                    </>
                   :
                 <Col sm="4">
                    <AsyncSelectForm
                      id="invoiceId"
                      name="invoiceId"
                      label="Nota Fiscal"
                      register={register}
                      onChange={(e) => {setValue('invoiceId',e.value)}}
                      options={invoiceOptions}
                    />
                 </Col>}
              </Row>

              <Row className="d-flex mt-3">
                 <Col sm="6">
                    <AsyncSelectForm
                      id="vehicleId"
                      name="vehicleId"
                      label="Veículo"
                      register={register}
                      onChange={(e) => {setValue('vehicleId',e.value);setValue('plate',e.label)}}
                      options={vehicleOptions}
                    />
                 </Col>
                 <Col sm="6">
                   <InputForm
                     id="fuelType"
                     name="fuelType"
                     label="Tipo de Combustível"
                     placeholder="Selecione"
                     register={register}
                     type="select"
                     options={fuelTypes}
                     errors={errors}
                   />
                 </Col>
              </Row>
              <Row className="d-flex mt-3">
                <Col sm="3">
                    <AsyncSelectForm
                      id={"supplierId"}
                      name={"supplierId"}
                      label="Posto de Combustível"
                      register={register}
                      onChange={(e) => {setValue(`supplierId`,e.value)}}
                      isDisabled={!createInvoice}
                      options={supplierOptions}
                    />
                </Col>
                <Col sm="3">
                    <InputForm
                       id="mileage"
                       name="mileage"
                       label="Quilometragem"
                       placeholder="--Digite--"
                       register={register}
                       required={true}
                       type="text"
                       errors={errors}
                     />
                 </Col>
                <Col sm="3">
                  <InputForm
                     id="date"
                     name="date"
                     label="Data"
                     placeholder="dd/mm/aaaa"
                     register={register}
                     required={true}
                     type="date"
                     errors={errors}
                   />
                </Col>
                <Col sm="3">
                    <InputForm
                       id="value"
                       name="value"
                       label="Valor total"
                       placeholder="--Digite--"
                       register={register}
                       required={true}
                       onChange={(e) => MaskReal(e)}
                       type="text"
                       errors={errors}
                     />
                 </Col>
              </Row>
             </Card>
             <Row className="d-flex mt-3 mb-3">
               <Col sm="2">
                  <Label style={{height:"25px",fontSize:"18px"}}>Anexos</Label>
               </Col>
               <Col sm="6" style={{display:"flex",gap:"40px"}}>
                  <label className={styles.archiveFormButtonGreen} htmlFor={`doc_fileBtn`} style={{flex:"1"}}>Anexar Arquivo<MdDriveFolderUpload style={{color:"teal"}}/></label>
                  <input id={`doc_fileBtn`} type="file" style={{display:"none"}} accept="application/pdf" onChange={(e) => {changeArquivo(e,"document");}}
                                                                                                          onClick={(e) => e.target.value = null}/>

                  <label className={styles.archiveFormButtonGreen} htmlFor={`doc_imageBtn`} style={{flex:"1"}}>Anexar Foto<MdOutlinePhotoCamera style={{color:"teal"}}/></label>
                  <input id={`doc_imageBtn`} type="file" style={{display:"none"}} accept="image/png, image/jpeg" onChange={(e) => {changeArquivo(e,"photo");}}
                                                                                                                 onClick={(e) => e.target.value = null}/>
               </Col>
             </Row>
             {(documents.length > 0 || photos.length > 0) && <Card style={{padding:"20px"}}>
                <Row className="d-flex mt-3">
                  {documents.length > 0 && <Col sm="6">
                     {documents.map((document,index) =>  
                        <Card key={index} className={styles.archiveFormLink}>
                            <a href={document.arquivoBlob} target="_blank" rel="noreferrer">{document.descricao}</a>
                            <Button color="danger" onClick={() => setDocuments(documents.filter((_,i) => i != index))}
                                    className="p-2" style={{ backgroundColor: '#fff', borderColor: '#dc3545', width: '40px'}}>
                                <FaTrash style={{color:"#e32c2c",height: "25px"}}/>
                            </Button>
                        </Card>
                      )}
                  </Col>}
                  {photos.length > 0 && <Col sm="6">
                    <Row className="d-flex mt-3">
                       {photos.map((photo,index) =>  
                          <Col key={index}>
                              <div style={{position:"relative",backgroundColor:"#E5E7EB", padding:"16px",width:"232px",height:"160px"}}>
   
                                  <TiDelete size={40} color="#e32c2c" style={{position:"absolute",top:"100",left:"180",cursor:"pointer"}} onClick={() => setPhotos(photos.filter((_,i) => i != index))}/>
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

             </Card>}
            </>}


            { type == "nota" && <>

              <Row className="d-flex mt-3">
                 <Col sm="4">
                    <InputForm
                      id="number"
                      name="number"
                      label="N° da Nota Fiscal"
                      placeholder="--Digite--"
                      register={register}
                      required={true}
                      type="text"
                      errors={errors}
                    />
                 </Col>
                 <Col sm="4">
                    <InputForm
                      id="date"
                      name="date"
                      label="Data de Emissão"
                      placeholder="dd/mm/aaaa"
                      register={register}
                      type="date"
                    />
                 </Col>
                 <Col sm="4">
                    <InputForm
                       id="value"
                       name="value"
                       label="Valor total"
                       placeholder="--Digite--"
                       register={register}
                       required={true}
                       onChange={(e) => MaskReal(e)}
                       type="text"
                       errors={errors}
                     />
                 </Col>
              </Row>

              <Row className="d-flex mt-3">
                <Col sm="4">
                   <AsyncSelectForm
                      id="fuelSupply"
                      name="fuelSupply"
                      label="Abastecimento"
                      register={register}
                      onChange={(e) => {setValue('fuelSupply',e.value)}}
                      options={fuelSupplyOptions}
                    />
                </Col>
                <Col sm="5">
                   <Button onClick={() => addFuelSupply()}
                           style={{ backgroundColor: "#009E8B",marginTop:"32px", height:"50px"}}>
                      <FaPlus/> Adicionar
                   </Button>
                </Col>
              </Row>
               <Row className="d-flex mt-3">
                   <TableStyle columnNames={columns} data={dataForTable(fuelSupplies)} />

               </Row>
            </>}
          
            <Row className="d-flex mt-3 justify-content-end">
                <Button type="submit"
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