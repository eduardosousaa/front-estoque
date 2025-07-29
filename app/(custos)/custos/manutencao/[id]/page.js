"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import Constantes from "../../../../../src/Constantes";
import { parseCookies } from "nookies";
import { Col, Row, Label, Button, Card,CardHeader,CardBody } from 'reactstrap';
import { FaPlus, FaTrash } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import LoadingGif from "../../../../../src/Components/ElementsUI/LoadingGif";
import TableStyle from  "../../../../../src/Components/ElementsUI/TableStyle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import FormatarReal from "../../../../../src/Utils/FormatarReal";
import styles from "../manutencao.module.css";

export default function Page() {


   const { "token2": token2 } = parseCookies();

   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const params = useParams();

   const [data, setData] = useState({}); 
  
   const [photos, setPhotos] = useState([]);

   const [documents, setDocuments] = useState([/* {arquivo: (formData),
                                                 arquivoBlob: (blob),
                                                 descricao: (string)} */]);

   const [vehicles, setVehicles] = useState([]);

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
                      setData(body);

                      if(body.maintenanceCosts.length > 0){
                         setVehicles(body.maintenanceCosts.map((cost) => { 
                             return {vehicleId: cost.vehicleId,
                                     value: "R$ " + FormatarReal(String(cost.value.toFixed(2))),
                                     mileage: cost.mileage + " km"
                            };
                         }));
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
   
   useEffect(() => {
     getMaintenance(params.id);
   },[params]);

   return (<>

       { loading && <LoadingGif/>}

       <CardHeader className={styles.header} style={{justifyContent:"flex-start", alignItems: "center"}}>
           <IoArrowBackCircleSharp style={{width:"45px",height:"70px",color:"#009E8B",cursor:"pointer"}}
                                   onClick={() => {router.back()}}/>
           <h1 className={styles.header_h1}>Dados da Manutenção</h1>
       </CardHeader>

       <CardBody style={{width:"90%"}}>
        <Row className="d-flex mt-3">
           <Col sm="4">
             <Card style={{padding:"20px"}}>
               <Row className="d-flex mt-3">
                 <Col sm="6">Responsável<br/> {data.employeeName || "-"}</Col>
                 <Col sm="6">Fornecedor<br/> {data.supplierName || "-"}</Col> 
               </Row>
               <Row className="d-flex mt-3">
                 <Col sm="6">Local<br/> {data.place || "-"}</Col>
               </Row>
             </Card>
           </Col>
           <Col sm="8">
             <Card style={{padding:"20px"}}>
               <Label style={{height:"25px",fontSize:"24px"}}>Anexos</Label> 
               <Row className="d-flex mt-3">
                 {documents.length > 0 && <Col sm="5">
                        {documents.map((document,index) =>  
                           <Card key={index} className={styles.archiveFormLink}>
                               <a href={document.arquivoBlob} target="_blank" rel="noreferrer">{document.descricao}</a>
                               {/* <Button color="danger" onClick={() => setDocuments(documents.filter((_,i) => i != index))}
                                       className="p-2" style={{ backgroundColor: '#fff', borderColor: '#dc3545', width: '40px'}}>
                                   <FaTrash style={{color:"#e32c2c",height: "25px"}}/>
                               </Button> */}
                           </Card>
                         )}
                     </Col>}
                 {photos.length > 0 && <Col sm="6">
                      <Row className="d-flex mt-3">
                         {photos.map((photo,index) =>  
                            <Col key={index} sm="8">
                                <div style={{position:"relative",backgroundColor:"#E5E7EB", padding:"16px",width:"232px",height:"160px"}}>

                                    {/* <TiDelete size={40} color="#e32c2c" style={{position:"absolute",top:"100",left:"180",cursor:"pointer"}} onClick={() => setPhotos(photos.filter((_,i) => i != index))}/> */}
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
           </Col>  
        </Row>

        <Row className="d-flex mt-3">
          <Card style={{padding:"20px"}}>
            <Label style={{height:"25px",fontSize:"24px"}}>Distribuição de custos</Label>
           
            <Card style={{padding:"20px",backgroundColor:"#F3F3F3"}}>
              <Row className="d-flex mt-3">
                 <Col sm="6">Número da nota fiscal<br/> {data.invoiceNumber || "-"}</Col>
                 <Col sm="6" style={{textAlign:"end"}}>Valor total<br/> {data.invoiceValue ? "R$ " + FormatarReal(String(data.invoiceValue.toFixed(2))) : "-"}</Col>
              </Row>
            </Card>

            <Row className="d-flex mt-3">
              <Col sm="12">
                { vehicles.length > 0 ?  
                   <TableStyle columnNames={["Veículo","Valor da Manutenção","Quilometragem"]} data={vehicles}/>  
                  :   
                   <Card style={{padding:"10px",marginBottom:"20px"}}>Não há veículos</Card>
                }
              </Col>
            </Row> 

          </Card>
        </Row>
       </CardBody>
        
       
    </>)
  }