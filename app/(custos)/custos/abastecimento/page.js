"use client"
import { useState, useEffect, useContext } from "react";
import Constantes from "../../../../src/Constantes";
import { AuthContext } from '../../../../src/Context/AuthContext';
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaPlus, FaFilter, FaEraser } from "react-icons/fa6";
import { BiInfoCircle,BiTrash } from "react-icons/bi";
import { BsPencilSquare, BsCheckSquare  } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import styles from "./abastecimento.module.css";
import { Row, Col, Form, Button, Card, CardHeader,CardBody,CardFooter,
         Nav, NavItem, NavLink } from "reactstrap";
import AlertMessage from "../../../../src/Components/ElementsUI/AlertMessage";
import LoadingGif from "../../../../src/Components/ElementsUI/LoadingGif";
import TableStyle from  "../../../../src/Components/ElementsUI/TableStyle";
import PaginationStyle from "../../../../src/Components/ElementsUI/PaginationStyle";
import InputForm from "../../../../src/Components/ElementsUI/InputForm";
import AsyncSelectForm from "../../../../src/Components/ElementsUI/AsyncSelectForm";
import ModalStyle from "../../../../src/Components/ElementsUI/ModalStyle"; 

export default function Page() {

   const { "token2": token2 } = parseCookies();
   const { permissions } = useContext(AuthContext);
   
   function checkPermission(name){
      return permissions ? permissions.findIndex((permission) => permission.name == name) != -1 : false;
   }

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const [showAsync, setShowAsync] = useState(true);

   const [subPage, setSubPage] = useState("Abastecimento");

   const fuelTypes = [
            { id: 'COMUM', name: 'Gasolina comum' },
            { id: 'GASOLINA_ADITIVADA', name: 'Gasolina aditivada' },
            { id: 'S10', name: 'Diesel S10' },
            { id: 'S500', name: 'Diesel S500' },
            { id: 'DIESEL_ADITIVADO', name: 'Diesel aditivado' },
   ];

   const vehicleTypes = [
            { id: 'ONIBUS', name: 'Ônibus' },
            { id: 'CAMINHAO', name: 'Caminhão' },
            { id: 'MICRO_ONIBUS', name: 'Micro-Ônibus' },
            { id: 'VAN', name: 'Van' },
            { id: 'MOTO', name: 'Moto' },
            { id: 'CARRO', name: 'Carro' },
   ];
   
   /* const [statusOptions, setStatusOptions] = useState([{id:true,name:"Ativo"},
                                                       {id:false,name:"Inativo"}]); */
    
   const [columns, setColumns] = useState([]);

   const [fuelSupplies, setFuelSupplies] = useState([{id:"ONIB-2023-0001-04.02.2025",vehicle:"ONIB-2023-0001",gasStation:"Posto BR Sul",fuelType:"Diesel S500",date:"01/01/2025",value:"R$ 220,00"}]);
   const [invoices, setInvoices] = useState([{id:"1",number:"004872",emissionDate:"01/01/2025"}]);

   const [number, setNumber] = useState(0);
   const [size, setSize] = useState(5);
   const [totalElements, setTotalElements] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   const [openModal, setOpenModal] = useState(false);

   const [alert, setAlert] = useState({});
   const [activeAlert, setActiveAlert] = useState(false);
   const [isOpen, setIsOpen] = useState(true);
   const onDismiss = () => setIsOpen(false);
   
   const {
       register,
       handleSubmit,
       setError,
       clearErrors,
       control,
       setValue,
       formState: { errors },
    } = useForm({ defaultValues: {companyId:""} });


    function showAlert(type, text) {
       setIsOpen(false);

       setAlert({
           type: type,
           text: text
       })
       setIsOpen(true)
       setActiveAlert(true)
    }

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


   function dataForTable(data){
      let tableData = [];

      data.forEach(d => 
          tableData.push(
            subPage == "Abastecimento" ?
              {
                "id": d.id,
                "vehicle": d.vehicle,
                "gasStation": d.gasStation,
                "fuelType": d.fuelType,
                "date": d.date,
                "value": d.value,
                "actions": actionButtons(d.id)
              } :
            subPage == "Nota Fiscal" ?
              {
                "id": d.id,
                "number": d.number,
                "emissionDate": d.emissionDate,
                "actions": actionButtons(d.id)
              } :
            null
            

        )
      );

      return tableData;
   }

   /* function setStatus(id){
      fetch(Constantes.urlBackAdmin + `employee/${id}`, {method: "PATCH",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.status) 
          .then((status) => {
               switch(status){
                   case 201:
                     showAlert("success", " Status alterado com sucesso!");
                   break;
                   case 401:
                     showAlert("danger","Erro de autorização");
                   break;
                   case 404:
                     showAlert("danger","Erro ao Alterar o Status");
                   break;  
               }
               getMaintenance();
          })
          .catch((error) => {
             console.log(error);
          }) 
   } */

   /* function deleteMaintenance(){
      fetch(Constantes.urlBackAdmin + `employee/${employeeId}`, {method: "DELETE",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token2
          },})
          .then((response) => response.status) 
          .then((status) => {
               switch(status){
                   case 201:
                     showAlert("success", "Excluído com sucesso!");
                   break;
                   case 401:
                     showAlert("danger","Erro de autorização");
                   break;
                   case 404:
                     showAlert("danger","Error ao Apagar Funcionário");
                   break;   
               }
              getMaintenance();
              setOpenModal(false);
          })
          .catch((error) => {
             console.log(error);
          }) 
   } */

   function actionButtons(id){
    return <div style={{display:"flex",gap:"2%",flexWrap:"wrap"}}>
            <div className={styles.balloon_div}>
               <Button className={styles.button} onClick={() => {router.push(`/custos/abastecimento/${id}?type=${subPage == "Abastecimento" ? "abastecimento" : 
                                                                                                                 subPage == "Nota Fiscal" ?  "nota" : ''}`)}}><BiInfoCircle/></Button>
               <div className={styles.balloon_aviso_div}>
                 <div className={styles.balloon_aviso_border}>
                   <div className={styles.balloon_aviso_text}>
                      Visualizar
                   </div>
                 </div>
               </div>
             </div>
           {/*  { checkPermission("Employee_Read") && <> */}
             <div className={styles.balloon_div}>
               <Button className={styles.button} onClick={() => {router.push(`/custos/abastecimento/${id}/edit?type=${subPage == "Abastecimento" ? "abastecimento" : 
                                                                                                                      subPage == "Nota Fiscal" ?  "nota" : ''}`)}}><BsPencilSquare/></Button>
               <div className={styles.balloon_aviso_div}>
                 <div className={styles.balloon_aviso_border}>
                   <div className={styles.balloon_aviso_text}>
                      Editar
                   </div>
                 </div>
               </div>
             </div>
            {/*<div className={styles.balloon_div}>
               <Button className={styles.button}onClick={() => {setEmployeeId(id);setOpenModal(true)}}><BiTrash/></Button>
               <div className={styles.balloon_aviso_div}>
                 <div className={styles.balloon_aviso_border}>
                   <div className={styles.balloon_aviso_text}>
                      Remover
                   </div>
                 </div>
               </div>
             </div> </>}*/}
           </div>;
   }

   function clearFilter(){
      setValue("fuelType","");
      setShowAsync(false);
      setValue("vehicleTypes","");
      setValue("supplyId","");
      setValue("emissionDate","");
      getData();
   }
                                                    
   function getData(data){

      let query = {};
      query.page = number;
      query.size = size;

      if(data != undefined) query = { ...query, ...data};

      setLoading(true);

      let url = subPage == "Abastecimento" ? "supply?" : "supply/invoice?";

      fetch(Constantes.urlBackCosts + url + new URLSearchParams(query), {
                method: "GET",
                headers: {
                    "Module": "ADMINISTRATION",
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
                   if(subPage == "Abastecimento") setFuelSupplies(body.content);
                   else if( subPage == "Nota Fiscal") setInvoices(body.content);
                   setNumber(body.page.number);
                   setSize(body.page.size);
                   setTotalElements(body.page.totalElements);
                   setTotalPages(body.page.totalPages);
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
     if(subPage == "Abastecimento"){
        getData();
        setColumns(["Id","Veículo","Posto de Combustível","Tipo de Combustível","Data","Valor","Ações"]);
     } 
     if(subPage == "Nota Fiscal"){
        getData();
        setColumns(["N da Nota Fiscal","Data de Emissão","Operações","Ações"]);
     } 
   },[subPage,number,size]);

   useEffect(() => {
    if(!showAsync) setShowAsync(true);
   },[showAsync]);

   return (<>

        { loading && <LoadingGif/>}
   
        <CardHeader className={styles.header}>
        { /*  <h1 className={styles.header_h1}>Abastecimento</h1> */}
         {/* { checkPermission("Employee_Read") && */}
         <Button className={styles.header_button}
                 onClick={() => { router.push(`/custos/abastecimento/create?type=${subPage == "Abastecimento" ? "abastecimento" : 
                                                                                   subPage == "Nota Fiscal" ?  "nota" : ''}`);}}>
             Cadastrar <FaPlus />
          </Button>{/* } */}
        </CardHeader>

        <Nav tabs className={styles.navbar}>
           <NavItem  style={{cursor:"pointer"}}>
             <NavLink active={subPage == "Abastecimento"} onClick={() => setSubPage("Abastecimento")} 
                      className={styles.navlink}>Abastecimento</NavLink>
           </NavItem>
           <NavItem  style={{cursor:"pointer"}}>
           <NavLink active={subPage == "Nota Fiscal"} onClick={() => setSubPage("Nota Fiscal")}
                    className={styles.navlink}>Nota Fiscal</NavLink>
           </NavItem>
        </Nav>

        <CardBody style={{width:"90%",backgroundColor:"#fff"}}>
          <Form onSubmit={handleSubmit(getData)}>
            <Row className="d-flex mt-3">
              {subPage == "Abastecimento" && <>
                <Col sm="4">
                  <InputForm
                    id="fuelType"
                    name="fuelType"
                    label="Tipo de Combustível"
                    placeholder="Selecione"
                    register={register}
                    type="select"
                    options={fuelTypes}
                  />
                </Col>

                <Col sm="4">
                  <InputForm
                    id="vehicleTypes"
                    name="vehicleTypes"
                    label="Tipo de Veículo"
                    placeholder="Selecione"
                    register={register}
                    type="select"
                    options={vehicleTypes}
                  />
                </Col>
                { showAsync == true && 
                 <Col sm="4">
                    <AsyncSelectForm
                      id={"supplyId"}
                      name={"supplyId"}
                      label="Posto de Combustível"
                      register={register}
                      onChange={(e) => {setValue(`supplyId`,e.value)}}
                      options={supplierOptions}
                    />
                  </Col>}
                </>}

              {subPage == "Nota Fiscal" && <>
                 <Col sm="4">
                   <InputForm
                     id="emissionDate"
                     name="emissionDate"
                     label="Data de Emissão"
                     placeholder="dd/mm/aaaa"
                     register={register}
                     type="date"
                   />
                 </Col>
                </>}
            </Row>

            <Row style={{ display:"flex", justifyContent:"flex-end", gap:"10px"}}>
              <Button onClick={() => {clearFilter()}} style={{ backgroundColor: "#009E8B", width:"20%"}}>
                Limpar <FaEraser />
              </Button>

              <Button type="submit" style={{ backgroundColor: "#009E8B", width:"20%", marginRight:"10px"}}>
                Filtrar <FaFilter />
              </Button>
            </Row> 
          </Form>
        </CardBody>

        <CardBody style={{width:"90%"}}>
              <TableStyle columnNames={columns} data={dataForTable(subPage == "Abastecimento" ? fuelSupplies : 
                                                                   subPage == "Nota Fiscal" ?  invoices : null)} />          
        </CardBody>

        <CardFooter style={{width:"90%",backgroundColor:"transparent"}}>

              <PaginationStyle number={number} setNumber={setNumber} size={size} setSize={setSize} 
                               pageElements={subPage == "Abastecimento" ? fuelSupplies.length : 
                                             subPage == "Nota Fiscal" ?  invoices.length : null} 
                               totalElements={totalElements} totalPages={totalPages}/>
            
        </CardFooter>

        <ModalStyle  open={openModal} title="Remover Funcionário" onClick={() => {deleteEmployee()}} toggle={() => setOpenModal(!openModal)}>
          Cuidado essa ação poderá ser desfeita!
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