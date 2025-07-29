"use client"
import Constantes from "../../Constantes";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../Context/AuthContext";
import { FaBell, FaUserAlt, FaRoute, FaCar, FaHandHoldingUsd } from 'react-icons/fa';
import styles from './Navbar.module.css';
import { parseCookies, destroyCookie} from "nookies";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import { TbBuildingWarehouse } from "react-icons/tb";
import { Button } from 'reactstrap';

const Navbar = ({showSidebar}) => {

  const router = useRouter();
  const { username, profileName, getInfo} = useContext(AuthContext);
  const { "token1": token1 } = parseCookies();
  const { "contas": contas } = parseCookies();
  const [contasArray, setContasArray] = useState([]);
  const [showAccount, setShowAccount] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  function changeModule(type){
     let url;
     let redirect; 
     switch(type){
        case "admin":
          url = Constantes.urlFrontAdmin;
          redirect =  Constantes.urlFrontAdmin + "admin";
        break;
        case "routes":
          url = Constantes.urlFrontRoutes;
          redirect = Constantes.urlFrontRoutes + "rotas";
        break;
        case "stock":
          url = Constantes.urlFrontStock;
          redirect = Constantes.urlFrontStock + "estoque";
        break;
        case "patrimony":
          url = Constantes.urlFrontPatrimony;
          redirect = Constantes.urlFrontPatrimony + "patrimonio";
        break;
        case "costs":
          url = Constantes.urlFrontCosts;
          redirect = Constantes.urlFrontCosts + "custos";
        break;
     }

     fetch(url + "api/module", {method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Module": "ADMINISTRATION",
              "Authorization": token1,
          },
        })
        .then((response) => response.status) 
        .then((status) => {
             switch(status){
                 case 200:
                   window.open(redirect, "_self");
                 break;
                 case 500:
                   console.log("Erro de Autenticação")
                 break;
             }
        })
        .catch((error) => {
           console.log(error);
        }) 
  }
  
  function logout(){
    destroyCookie(undefined,"token1",{path:"/"});
    destroyCookie(undefined,"token2",{path:"/"});
    destroyCookie(undefined,"contas",{path:"/"});
    router.push("/login");
  }

  async function changeAccount(id) {
     await getInfo(token1,id);
     window.location.reload();
  }

  useEffect(() => {
    if(contas != undefined){
      let contasParse = JSON.parse(contas);
      setContasArray(contasParse);
    }
  },[]);

  return (
      <div className={`${styles.navbar} ${showSidebar ? styles.expanded : ''}`}>
          <ul className={styles.navbarList}>
              <li className={styles.navbarItem}>
                  <FaBell size={15}/>
              </li>
              <li className={styles.navbarItem} onClick={() => { setShowModal2(!showModal2)}}>
                  <BsGrid3X3GapFill/>
              </li>
              <li className={styles.navbarItem1} onClick={() => { setShowModal(!showModal)}}>
                  <div className={styles.letter}>
                      <h3>{username}</h3>
                      <p>{profileName}</p> 
                  </div>
                  <FaUserAlt size={25} />
              </li>
          </ul>

          {showModal && <div className={`${styles.modalContainer} ${showAccount ? styles.containerExpanded : ''}`}>
             <div className={styles.modalText} onClick={() => { setShowAccount(!showAccount)}}>Trocar Conta</div>
             {showAccount && contasArray.map((conta,index) => 
                <a className={styles.modalText2} key={index} onClick={() => changeAccount(conta.id)}>{conta.name}</a>
             )}
             <div className={styles.modalText} onClick={() => { logout()}}>Sair</div>       
          </div>}

          {showModal2 && <div className={styles.modalContainer2}>
              <Button outline style={{width:"150px"}} onClick={() => changeModule("admin")}><FcFolder size={40}/><br/>Administração</Button>
              <Button outline style={{width:"150px"}} onClick={() => changeModule("routes")}><FaRoute size={40} color={"#d41400"}/><br/>Rotas</Button>
              <Button outline style={{width:"150px"}} onClick={() => changeModule("stock")}><TbBuildingWarehouse size={40} color={"#1400D4"}/><br/>Estoque</Button>
              <Button outline style={{width:"150px"}} onClick={() => changeModule("patrimony")}><FaCar size={40} color={"#d45f00"}/><br/>Patrimônio</Button>
              <Button outline style={{width:"150px"}} onClick={() => changeModule("costs")}><FaHandHoldingUsd size={40} color={"#00d41d"}/><br/>Custos</Button>
          </div>}
          
      </div>
   );
};

export default Navbar;