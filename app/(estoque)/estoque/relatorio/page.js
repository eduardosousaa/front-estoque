"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Input, Button, CardHeader, CardBody,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { FiBarChart2 } from 'react-icons/fi';
import styles from '../inicio/inicio.module.css';

export default function Relatorio() {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('');
  const [relatorioCarregado, setRelatorioCarregado] = useState(false);

  const [dropdownExportarAberto, setDropdownExportarAberto] = useState(false);
  const [dropdownImpressoraAberto, setDropdownImpressoraAberto] = useState(false);
  const [dropdownRelatorioAberto, setDropdownRelatorioAberto] = useState(false);

  const tiposRelatorios = [
    "Relatório de Estoque",
    "Relatório de Entradas",
    "Relatório de Saídas",
    "Relatório de Fornecedores",
    "Relatório de Produtos"
  ];

  const opcoesExportacao = [
    "Exportar para PDF",
    "Exportar para Excel",
    "Exportar para CSV"
  ];

  const opcoesImpressora = [
    "Impressora Principal",
    "Impressora Secundária",
    "Impressora de Rede"
  ];

  const handleDataChange = (e) => setDataSelecionada(e.target.value);
  const handleRelatorioChange = (relatorio) => {
    setRelatorioSelecionado(relatorio);
    setDropdownRelatorioAberto(false);
  };

  const handleExportar = () => {
    console.log("Exportando relatório...");
  };

  const handleGerarRelatorio = () => {
    if (relatorioSelecionado) {
      setRelatorioCarregado(true);
      console.log(`Gerando relatório: ${relatorioSelecionado}`);
    }
  };

  return (
    <>
      <CardHeader className={styles.header}>
        <h1 className={styles.header_h1}>Relatório</h1>
      </CardHeader>

      <CardBody style={{ width: "90%" }}>
        {/* Primeira linha: Relatório + Data */}
        <div className="d-flex flex-wrap gap-3 mb-2">
          <div style={{ flex: 1, minWidth: "250px" }}>
            <Dropdown isOpen={dropdownRelatorioAberto} toggle={() => setDropdownRelatorioAberto(!dropdownRelatorioAberto)}>
              <DropdownToggle caret color="light" style={{ width: "100%", textAlign: "left", borderColor: "#ced4da" }}>
                {relatorioSelecionado || "Selecione o relatório"}
              </DropdownToggle>
              <DropdownMenu style={{ width: "100%" }}>
                {tiposRelatorios.map((relatorio, index) => (
                  <DropdownItem key={index} onClick={() => handleRelatorioChange(relatorio)}>
                    {relatorio}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div style={{ flex: 1, minWidth: "250px" }}>
            <Input
              type="date"
              value={dataSelecionada}
              onChange={handleDataChange}
              style={{ height: "38px", width: "100%" }}
            />
          </div>
        </div>

        {/* Segunda linha: Exportar, Impressora, Botões */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div style={{ minWidth: "180px" }}>
            <Dropdown isOpen={dropdownExportarAberto} toggle={() => setDropdownExportarAberto(!dropdownExportarAberto)}>
              <DropdownToggle caret color="light" style={{ width: "100%", textAlign: "left", borderColor: "#ced4da" }}>
                Exportar para PDF
              </DropdownToggle>
              <DropdownMenu style={{ width: "100%" }}>
                {opcoesExportacao.map((opcao, index) => (
                  <DropdownItem key={index}>{opcao}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div style={{ minWidth: "180px" }}>
            <Dropdown isOpen={dropdownImpressoraAberto} toggle={() => setDropdownImpressoraAberto(!dropdownImpressoraAberto)}>
              <DropdownToggle caret color="light" style={{ width: "100%", textAlign: "left", borderColor: "#ced4da" }}>
                Selecionar Impressora
              </DropdownToggle>
              <DropdownMenu style={{ width: "100%" }}>
                {opcoesImpressora.map((impressora, index) => (
                  <DropdownItem key={index}>{impressora}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <Button
            color="info"
            style={{
              backgroundColor: "#009E8B",
              border: "none",
              height: "38px",
              minWidth: "100px"
            }}
            onClick={handleExportar}
          >
            Exportar
          </Button>

          <Button
            color="info"
            style={{
              backgroundColor: "#009E8B",
              border: "none",
              height: "38px",
              minWidth: "130px"
            }}
            onClick={handleGerarRelatorio}
          >
            Gerar Relatório
          </Button>
        </div>

        {/* Conteúdo do Relatório */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            minHeight: "60vh",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {relatorioCarregado ? (
            <div className="w-100 p-4">
              <h3>{relatorioSelecionado}</h3>
              <p>Data: {dataSelecionada || new Date().toLocaleDateString()}</p>
              <div className="mt-4">
                <p>Conteúdo do relatório seria exibido aqui.</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FiBarChart2 size={48} color="#999" />
              <p style={{ marginTop: "10px", color: "#666" }}>Selecione um relatório para visualizar</p>
            </div>
          )}
        </div>
      </CardBody>
    </>
  );
}
