"use client"
import { useState, useEffect } from "react";
import Constantes from "../../../../../../src/Constantes";
import { parseCookies } from "nookies";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem ,
        Col, Form, FormGroup, Label, Row, Button, Table,
        Card,CardHeader,CardBody } from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { MdDriveFolderUpload, MdOutlinePhotoCamera} from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import AlertMessage from "../../../../../../src/Components/ElementsUI/AlertMessage";
import LoadingGif from  "../../../../../../src/Components/ElementsUI/LoadingGif";
import styles from "../../manutencao.module.css";
import InputForm from "../../../../../../src/Components/ElementsUI/InputForm";
import AsyncSelectForm from "../../../../../../src/Components/ElementsUI/AsyncSelectForm";
import TableStyle from  "../../../../../../src/Components/ElementsUI/TableStyle";
import ModalStyle from "../../../../../../src/Components/ElementsUI/ModalStyle"; 
import MaskTime from "../../../../../../src/Utils/MaskTime";
import MaskReal from "../../../../../../src/Utils/MaskReal";

export default function Edit() {

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

   const [openModal, setOpenModal] = useState(false);

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

   const [vehicles, setVehicles] = useState([{id: "",
                                              plate: "OAB-1111",
                                              kilometer: "320.000km",
                                              totalValue: "R$ 1.350,00",
                                              description: "Troca de pastilhas de freio"}]);

   const [vehicleIndex, setVehicleIndex] = useState();
   const [parts, setParts] = useState([]);

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

    const productOptions = (teste) => {
       let url;
       let query = {};
       query.size = 100;
       query.name = teste;
       url =  "product?" + new URLSearchParams(query);
       
       return fetch(Constantes.urlBackStock + url, {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "STOCK",
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

   function getMaintenance(id){
        fetch(Constantes.urlBackCosts + `manitenance/${id}`, {
                  method: "GET",
                  headers: {
                      "Module": "COSTS",
                      "Authorization": token2
                  }
            })
            .then((response) => 
               response.json().then(data => ({
                   status: response.status, 
                   body: data }))
            ) 
            .then(({ status, body}) => {
               
               switch(status){
                   case 200:
                      for (const [key, value] of Object.entries(body)) {
                        setValue(key,value);
                      }
                      /* setVehicles();
                      setImages();
                      setPhotos(); */
                   break;
                   case 400:
                     console.log("erro:",body);
                   break;
                   case 404:
                     console.log("erro:",body);
                   break;
                   
               }
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
            }) 
   }

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

   function addVehicle(){
      let newVehicle = getValues("new_vehicle");
     
      for(const [key,value] of Object.entries(newVehicle)){
         if(value == "") return showAlert("danger", "Preencha todos os dados do veículo!");
      }

      setVehicles([...vehicles,{id:  newVehicle.vehicleId,
                                plate:  newVehicle.plate,
                                value: newVehicle.value,
                                mileage: newVehicle.mileage + " km",
                                date: newVehicle.date,
                                hour: newVehicle.hour,
                                description: newVehicle.description}]);
   }

   function removeVehicle(index){
      setVehicles(vehicles.filter((_,i) => i != index));
   }

   function dataForTable(data){
      let tableData = [];
      //"Veiculo","Quilometragem","Valor","Descrição","","Ações"
      data.forEach((d,index) => 
          tableData.push({
            "plate": d.plate,
            "mileage": d.mileage,
            "value": d.value,
            "description": d.description,
            "insert_parts": <span style={{color:"#1fcec9",borderBottom:"1px solid #1fcec9"}} onClick={() => {setOpenModal(true);setVehicleIndex(index)}}>Adicionar peças&nbsp;&nbsp;&nbsp;<SlArrowDown/></span>,
            "actions": actionButtons(index)
          })
      );

      return tableData;
   }

   function addPart(){
      let piece = getValues("select_piece");

      if(piece.id == "") return;
   
      setParts([...parts, {id:piece.value, name: piece.label}])
   }

   function addPartsToVehicle(){
    

   }

   function actionButtons(index){
    return <div style={{display:"flex",gap:"2%",flexWrap:"wrap"}}>
             <div className={styles.balloon_div}>
               <Button className={styles.button}
                       onClick={() => {removeVehicle(index)}}><BiTrash/></Button>
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
    
    const formData = new FormData();
    let post = { ...data, maintenanceCosts: vehicles};
    delete post.new_vehicle;
    console.log(post);
    if(photos.length > 0) photos.forEach((photo) => { formData.append("images",photo.arquivo,photo.desricao)});
    
    if(documents.length > 0) documents.forEach((document) => { formData.append("files",document.arquivo,document.desricao)});
    
    const jsonString = JSON.stringify(post);
    const jsonBlob = new Blob([jsonString], { type: "application/json"});
    formData.append("maintenance",jsonBlob,"maintenance.json");
    let url = "manitenance/" + params.id;
    fetch(Constantes.urlBackCosts + url, {
          method: "PUT",
          headers: {
              "Module": "COSTS",
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
               showAlert("success", "Serviço cadastro com sucesso!");
               router.push("/custos/manutencao");
             break;
             case 400:
               setErrors(apiErrors);
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
     getMaintenance(params.id);
   },[params]);

   return (<>

        { loading && <LoadingGif/>}

        <CardHeader className={styles.header} style={{justifyContent:"flex-start", alignItems: "center"}}>
           <IoArrowBackCircleSharp style={{width:"45px",height:"70px",color:"#009E8B",cursor:"pointer"}}
                                   onClick={() => {router.back()}}/>
           <h1 className={styles.header_h1}>Editar Serviço de Manutenção</h1>
        </CardHeader>
        
        <CardBody style={{width:"90%"}}>
           <Form onSubmit={handleSubmit(submit)}>
            <Accordion open={open} toggle={toggle} style={{flex:"1"}}>
               <AccordionItem>
                  <AccordionHeader targetId="register">
                     <span className={styles.accordionTitle}>Registro do serviço</span></AccordionHeader>
                  <AccordionBody accordionId="register" style={{padding:"15px"}}>
                   <Row className="d-flex mt-3">
                     <Col sm="6">
                         <InputForm
                          id="place"
                          name="place"
                          label="Local Responsável*"
                          placeholder="--Digite--"
                          register={register}
                          required={true}
                          type="text"
                          errors={errors}
                         />
                     </Col>
                     <Col sm="6">
                        <AsyncSelectForm
                          id="supplierId"
                          name="supplierId"
                          label="Fornecedor*"
                          register={register}
                          onChange={(e) => {setValue(`supplierId`,e.value)}}
                          options={supplierOptions}
                        />
                     </Col>
                   </Row>

                   <Row className="d-flex mt-3">
                     <Col sm="6">
                         <InputForm
                          id="employee"
                          name="employee"
                          label="Profissional Responsável*"
                          placeholder="--Digite--"
                          register={register}
                          required={true}
                          type="text"
                          errors={errors}
                         />
                     </Col>
                   </Row>
                   
                   <Row className="d-flex mt-3">
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
                  </AccordionBody>
               </AccordionItem>
               <AccordionItem>
                  <AccordionHeader targetId="address">
                     <span className={styles.accordionTitle}>Distribuição de custos</span></AccordionHeader>
                  <AccordionBody accordionId="address" style={{padding:"15px"}}>
                    <Row className="d-flex mt-3">
                       <Col sm="4">
                          <InputForm
                            id="invoiceNumber"
                            name="invoiceNumber"
                            label="N° Nota Fiscal*"
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
                    </Row>
                  </AccordionBody>
               </AccordionItem>
               <AccordionItem>
                  <AccordionHeader targetId="vehicles">
                    <span className={styles.accordionTitle}>Selecionar veículos</span></AccordionHeader>
                  <AccordionBody accordionId="vehicles" style={{padding:"15px"}}>
                     <Row className="d-flex mt-3">
                       <Col sm="6">
                          <AsyncSelectForm
                            id="new_vehicle.vehicleId"
                            name="new_vehicle.vehicleId"
                            label="Veículo"
                            register={register}
                            onChange={(e) => {setValue('new_vehicle.vehicleId',e.value);setValue('new_vehicle.plate',e.label)}}
                            options={vehicleOptions}
                          />
                       </Col>
                       <Col sm="3">
                          <InputForm
                             id="new_vehicle.value"
                             name="new_vehicle.value"
                             label="Valor"
                             placeholder="--Digite--"
                             register={register}
                             required={true}
                             onChange={(e) => MaskReal(e)}
                             type="text"
                             errors={errors}
                           />
                       </Col>
                       <Col sm="3">
                          <InputForm
                             id="new_vehicle.mileage"
                             name="new_vehicle.mileage"
                             label="Quilometragem"
                             placeholder="--Digite--"
                             register={register}
                             required={true}
                             type="text"
                             errors={errors}
                           />
                       </Col>
                     </Row>
                     <Row className="d-flex mt-3">
                     <Col sm="3">
                       <InputForm
                          id="new_vehicle.date"
                          name="new_vehicle.date"
                          label="Data*"
                          placeholder="dd/mm/aaaa"
                          register={register}
                          required={true}
                          type="date"
                          errors={errors}
                        />
                     </Col>
                     <Col sm="3">
                       <InputForm
                          id="new_vehicle.time"
                          name="new_vehicle.time"
                          label="Hora hh:mm"
                          placeholder="--:--"
                          register={register}
                          required={true}
                          onChange={(e) => MaskTime(e)}
                          type="text"
                          errors={errors}
                       />
                     </Col>
                   </Row>
                     <Row className="d-flex mt-3">
                       <Col sm="12">
                         <InputForm
                             id="new_vehicle.description"
                             name="new_vehicle.description"
                             label="Descrição detalhada"
                             placeholder="Digite aqui"
                             register={register}
                             required={false}
                             type="textarea"
                             errors={errors}
                         />
                       </Col>
                     </Row>
                     <Row className="d-flex mt-3 justify-content-end">
                         <Col sm="auto">
                             <Button onClick={() => {addVehicle()}}
                                     style={{ backgroundColor: "#009E8B",/*  width: "25%", */ height: "50px" }}>
                              Adicionar <FaPlus/>
                             </Button>
                         </Col>
                     </Row>
                     <Row className="d-flex mt-3">
                       <Col sm="12">
                         { vehicles.length > 0 ?  
                            <TableStyle columnNames={["Veículo","Quilometragem","Valor","Descrição","","Ações"]} data={dataForTable(vehicles)}/>  
                           :   
                            <Card style={{padding:"10px",marginBottom:"20px"}}>Não há veículos</Card>
                         }
                       </Col>
                     </Row>
                  </AccordionBody>
               </AccordionItem>
            </Accordion>    
             
          
            <Row className="d-flex mt-3 justify-content-end">
                <Button onClick={() => submit()}
                        style={{ backgroundColor: "#009E8B", width:"25%", height:"60px"}}>
                  Salvar
                </Button>
             </Row> 
          </Form>
        </CardBody>

        <ModalStyle  open={openModal} title="Adicionar Veículo" onClick={() => addPartsToVehicle()} toggle={() => setOpenModal(!openModal)}>
           <Row className="d-flex mt-3">
              <Col sm="6">
                 <Row className="d-flex mt-3">
                   <Col sm="12">
                     <AsyncSelectForm
                         id="select_piece"
                         name="select_piece"
                         label="Selecionar peça"
                         placeholder="--Selecione--"
                         register={register}
                         onChange={(e) => {setValue('select_piece',e)}}
                         required={false}
                         type="select"
                         errors={errors}
                         options={productOptions}
                     />
                   </Col>
                 </Row>
                 <Row className="d-flex mt-3 justify-content-start">
                     <Col sm="auto">
                         <Button onClick={() => addPart()}
                                 style={{ backgroundColor: "#009E8B",/*  width: "25%", */ height: "40px" }}>
                          Adicionar <FaPlus/>
                         </Button>
                     </Col>
                 </Row>
              </Col>
              <Col sm="6">
                <div style={{fontSize: "1.25rem", marginBottom:"20px"}}>Peças Adicionadas</div>
                <Table>
                  <thead>
                    <tr style={{fontSize:"1.2rem"}}>
                     <th style={{backgroundColor:"#fff",borderWidth:2}}>Nome</th>
                     <th style={{backgroundColor:"#fff",width:"120px",borderWidth:2}}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((part,index) => 
                     <tr key={index}>
                        <td style={{backgroundColor: "#ddffff", ...( index == parts.length - 1 && { borderBottomWidth:0})}}>{part.name}</td>
                        <td style={{backgroundColor: "#ddffff", ...( index == parts.length - 1 && { borderBottomWidth:0})}}><BiTrash/></td>
                     </tr> 
                    )}
                  </tbody>
                </Table>
              </Col>
           </Row>
        </ModalStyle>    
       
        {activeAlert && (
            <AlertMessage type={alert["type"]}
                text={alert["text"]}
                isOpen={isOpen}
                toggle={onDismiss}>
            </AlertMessage>
         )}
       
    </>)
  }