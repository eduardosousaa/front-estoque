'use client';
import React, { useState } from 'react';
import styles from "../styles/Sidebar.module.css";
import Image from 'next/image';
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FaBuildingUser, FaUsersGear, FaClipboardUser, FaBuildingCircleArrowRight, FaGear, FaGears, FaUser, FaPlus } from "react-icons/fa6";
import { FaHome, FaProjectDiagram, FaChartBar, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

import { BiSolidUserAccount, BiSolidBuildingHouse } from "react-icons/bi";
import { HiArrowLongRight, HiOutlineArrowTurnRightDown } from "react-icons/hi2";
import { useRouter } from 'next/navigation';



const SideBar = ({ showSidebar, setShowSidebar }) => {
  const [showConfigMenu, setShowConfigMenu] = useState(false);

  const router = useRouter();

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.expanded : ''}`}>
      <Image src="/logo.svg" alt="Logo" width={40} height={40} className={styles.images} />
      {showSidebar && <span className={styles.menuText}> Sistema de Estoque</span>}
      <ul className={styles.sidebarList}>
        
        <li className={styles.sidebarItem} onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <BsArrowBarLeft size={30} /> : <BsArrowBarRight size={30} />}
        </li>

        <li className={styles.sidebarItem} onClick={() => { router.push("/estoque/inicio"); setShowSidebar(false); }}>
          <FaHome size={30} />
          {showSidebar && <span className={styles.menuText}> Início </span>}
        </li>

        <li className={styles.sidebarItem} onClick={() => { router.push("/estoque/fluxo/entrada"); setShowSidebar(false); }}>
          <FaProjectDiagram size={30} />
          {showSidebar && <span className={styles.menuText}> Fluxo</span>}
        </li>

        <li className={styles.sidebarItem} onClick={() => { router.push("/estoque/relatorio");setShowSidebar(false); }}>
          <FaChartBar size={30} />
          {showSidebar && <span className={styles.menuText}> Relatórios</span>}
        </li>

        <li className={styles.sidebarItem} onClick={() => console.log('Fornecedores')}>
          <FaTruck size={30} />
          {showSidebar && <span className={styles.menuText}> Fornecedores </span>}
        </li>

        <li className={styles.sidebarItem} onClick={() => console.log('Localização')}>
          <FaMapMarkerAlt size={30} />
          {showSidebar && <span className={styles.menuText}> Localização </span>}
        </li>


        <li className={showConfigMenu ? styles.sidebarItem : styles.sidebarplus} onClick={() => setShowConfigMenu(!showConfigMenu)}>
          <FaGears size={30} />
          {showSidebar && (
            <span className={styles.menuText}>
              Configurações {showConfigMenu ? <HiOutlineArrowTurnRightDown /> : <HiArrowLongRight />}
            </span>
          )}
        </li>
        {/* 
        <ul style={{ paddingLeft: showSidebar ? "40px" : "0px" }} className={styles.sidebarList}>
          {showConfigMenu && (
            <>
              <li className={styles.sidebarplus} onClick={() => console.log('Cargos')}>
                <BiSolidUserAccount size={30} />
                {showSidebar && <span className={styles.menuText}>Cargos</span>}
              </li>
              <li className={styles.sidebarplus} onClick={() => console.log('Materiais')}>
                <MdOutlineLibraryAdd size={30} />
                {showSidebar && <span className={styles.menuText}>Materiais</span>}
              </li>
              <li className={styles.sidebarplus} onClick={() => console.log('Serviços')}>
                <FaGear size={27} />
                {showSidebar && <span className={styles.menuText}>Serviços</span>}
              </li>
            </>
          )}
        </ul> */}
      </ul>
    </div>
  );
};

export default SideBar;
