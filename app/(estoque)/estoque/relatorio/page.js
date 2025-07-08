'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import {
  Row, Col, Form, Button, CardHeader, CardBody,
  Alert
} from "reactstrap";
import { FiBarChart2, FiPackage, FiArrowLeftCircle } from 'react-icons/fi';
import InputForm from '@/components/ElementsUI/InputForm';
import TableStyle from '@/components/ElementsUI/TableStyle';
import styles from '../inicio/inicio.module.css';
import entradaStyles from '@/styles/entrada.module.css';

import Constantes from '../../../../src/Constantes';
import { parseCookies } from 'nookies';

export default function RelatorioPage() {
  const router = useRouter();
  const { "token2": token2 } = parseCookies();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      selectedReport: '',
      startDate: '',
      endDate: '',
      selectedLocation: '',
      selectedDepartment: '',
    }
  });

  const selectedReport = watch('selectedReport');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const selectedLocation = watch('selectedLocation');
  const selectedDepartment = watch('selectedDepartment');

  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);


  const [locations, setLocations] = useState([]);
  const [departmentsApi, setDepartmentsApi] = useState([]);


  const fetchLocationsAndDepartments = async () => {
    try {
      const params = new URLSearchParams();
      params.append('typeLocation', 'LOCATION');

      const response = await fetch(Constantes.urlAdmin + `stock?${params.toString()}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": "ADMINISTRATION",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados de localização/departamento retornados:", data);
        const fetchedLocations = Array.isArray(data) ? data : data.content || [];
        setLocations(fetchedLocations);
        setDepartmentsApi(fetchedLocations);
      } else {
        console.error("Erro ao buscar localizações/departamentos:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar localizações/departamentos:', err);
    }
  };

  useEffect(() => {
    if (token2) {
      fetchLocationsAndDepartments();
    }
  }, [token2]);

  const reportTypesMap = useMemo(() => ({
    'Relatório de Entrada e Saída': 'entradaSaida',
    'Relatório de Estoque Atualizado': 'estoqueAtualizado',
    'Relatório de Itens Próximo da Validade': 'proximoValidade',
    'Relatório de Itens Abaixo do Estoque Mínimo': 'abaixoMinimo',
    'Relatório de Consumo por Departamento': 'consumoDepartamento',
    'Relatório de Fornecedores Cadastrados': 'fornecedoresCadastrados',
  }), []);

  const reportTypeOptions = useMemo(() => [
    { id: '', name: 'Selecione o relatório' },
    ...Object.keys(reportTypesMap).map(key => ({
      id: reportTypesMap[key],
      name: key
    }))
  ], [reportTypesMap]);

  const locationOptions = useMemo(() => [
    { id: '', name: 'Todas as Localizações' },
    ...locations.map(loc => ({ id: loc.id, name: loc.name }))
  ], [locations]);

  const departmentOptions = useMemo(() => [
    { id: '', name: 'Todos os Departamentos' },
    ...departmentsApi.map(dept => ({ id: dept.id, name: dept.name }))
  ], [departmentsApi]);

  const getReportTableColumns = (type) => {
    switch (type) {
      case 'entradaSaida':
      case 'historicoDetalhado':
        return ["Tipo de Fluxo", "Nome da Categoria", "Nome do Tipo de Produto", "Descrição", "Quantidade", "Data", "Fornecedor/Responsável", "Nome do Local"];
      case 'estoqueAtualizado':
        return ["Código", "Descrição", "Nome da Categoria", "Nome do Tipo de Produto", "Localização", "Quantidade em Estoque", "Valor Total do Produto"];
      case 'proximoValidade':
        return ["Categoria", "Lote", "Quantidade", "Localização", "Data de validade", "Status"];
      case 'abaixoMinimo':
        return ["Código", "Descrição", "Nome da Categoria", "Nome do Tipo de Produto", "Quantidade em Estoque", "Quantidade Mínima em Estoque", "Diferença", "Localização"];
      case 'consumoDepartamento':
        return ["Setor", "Item Consumido", "Quantidade", "Custo Total"];
      case 'fornecedoresCadastrados':
        return ["Nome/Razão Social", "Tipo", "CPF/CNPJ", "Contato", "E-mail"];
      default:
        return [];
    }
  };

  const getReportDisplayData = (type, data) => {
    if (!data || data.length === 0) return [];

    switch (type) {
      case 'entradaSaida':
      case 'historicoDetalhado':
        return data.map(item => ({
          id: item.id,
          "Tipo de Fluxo": item.flowType || item.tipo || 'N/A',
          "Nome da Categoria": item.categoryName || item.categoria || 'N/A',
          "Nome do Tipo de Produto": item.productTypeName || item.tipoProduto || 'N/A',
          Descrição: item.description || item.descricao || 'N/A',
          Quantidade: item.quantity || item.quantidade || 0,
          Data: item.date || item.data || 'N/A',
          "Fornecedor/Responsável": item.responsible || item.supplierName || item.fornecedor || item.responsavelFornecedor,
          "Nome do Local": item.locationName || item.localizacao || 'N/A',
        }));
      case 'estoqueAtualizado':
        return data.map(item => ({
          id: item.id,
          Código: item.sku || item.codigo || 'N/A',
          Descrição: item.description || item.descricao || 'N/A',
          "Nome da Categoria": item.categoryName || item.categoria || 'N/A',
          "Nome do Tipo de Produto": item.productTypeName || item.tipoProduto || 'N/A',
          Localização: item.locationName || item.localizacao || 'N/A',
          "Quantidade em Estoque": item.currentStock || item.quantity || 0,
          "Valor Total do Produto": item.totalProductValue ? `R$ ${item.totalProductValue.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        }));
      case 'proximoValidade':
        return data.map(item => ({
          id: item.id,
          Categoria: item.categoryName || item.categoria || 'N/A',
          Lote: item.sku || item.lote || 'N/A',
          Quantidade: item.quantity || item.quantidade,
          Localização: item.locationName || item.localizacao || 'N/A',
          'Data de validade': item.expirationDate || item.dataValidade,
          Status: item.status,
        }));
      case 'abaixoMinimo':
        return data.map(item => ({
          id: item.id,
          Código: item.sku || item.codigo || 'N/A',
          Descrição: item.description || item.descricao || 'N/A',
          "Nome da Categoria": item.categoryName || item.categoria || 'N/A',
          "Nome do Tipo de Produto": item.productTypeName || item.tipoProduto || 'N/A',
          "Quantidade em Estoque": item.currentStock || item.quantity || 0,
          "Quantidade Mínima em Estoque": item.minStock || item.estoqueMinimo || 0,
          Diferença: item.difference || (item.currentStock - item.minStock) || 'N/A',
          Localização: item.locationName || item.localizacao || 'N/A'
        }));
      case 'consumoDepartamento':
        return data.map(item => ({
          id: item.id,
          Setor: item.sectorName || item.setor || 'N/A',
          "Item Consumido": item.productName || item.itemConsumido || item.description || 'N/A',
          Quantidade: item.quantity || item.quantidade || 0,
          "Custo Total": item.totalCost ? `R$ ${item.totalCost.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        }));
      case 'fornecedoresCadastrados':
        return data.map(item => ({
          id: item.id,
          "Nome/Razão Social": item.companyName || item.name || 'N/A',
          Tipo: item.type || 'N/A',
          "CPF/CNPJ": item.document || item.cpfCnpj || 'N/A',
          Contato: item.phone || item.contato || 'N/A',
          "E-mail": item.email || 'N/A',
        }));
      default:
        return [];
    }
  };

  const handleGenerateReport = handleSubmit(async (formData) => {
    if (!token2) {
      setErrorMessage('Token de autenticação não encontrado. Faça login novamente.');
      return;
    }
    if (!formData.selectedReport) {
      setErrorMessage('Por favor, selecione um tipo de relatório.');
      setReportData([]);
      setNoDataFound(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setReportData([]);
    setNoDataFound(false);

    try {
      let apiEndpoint = '';
      let params = new URLSearchParams();
      let apiModule = "STOCK";

      switch (formData.selectedReport) {
        case 'entradaSaida':
          apiEndpoint = Constantes.urlReports + 'report/report_input_output';
          if (!formData.startDate || !formData.endDate) throw new Error('Data Inicial e Data Final são obrigatórias.');
          params.append('start', formData.startDate);
          params.append('end', formData.endDate);
          params.append('input', 'true');
          params.append('output', 'true');
          if (formData.selectedLocation) {
            params.append('locationId', formData.selectedLocation);
          }
          break;
        case 'estoqueAtualizado':
          apiEndpoint = Constantes.urlReports + 'report/report_stock_update';
          if (!formData.startDate || !formData.endDate) throw new Error('Data Inicial e Data Final são obrigatórias para Estoque Atualizado.');
          params.append('start', formData.startDate);
          params.append('end', formData.endDate);
          if (formData.selectedLocation) {
            params.append('locationId', formData.selectedLocation);
          }
          break;
        case 'proximoValidade':
          apiEndpoint = Constantes.urlReports + 'report/report_expiration_date';
          if (!formData.endDate) throw new Error('Data de Validade Máxima é obrigatória.');
          params.append('date', formData.endDate);
          if (formData.selectedLocation) {
            params.append('locationId', formData.selectedLocation);
          }
          break;
        case 'abaixoMinimo':
          apiEndpoint = Constantes.urlReports + 'report/report_stock_minimum';
          break;
        case 'consumoDepartamento':
          apiEndpoint = Constantes.urlReports + 'report_consumption_sector';
          if (!formData.selectedDepartment || formData.selectedDepartment === '') throw new Error('O Departamento é obrigatório.');
          if (!formData.startDate || !formData.endDate) throw new Error('Período Inicial e Final são obrigatórios.');
          params.append('start', formData.startDate);
          params.append('end', formData.endDate);
          params.append('sector', formData.selectedDepartment);
          break;
        case 'fornecedoresCadastrados':
          apiEndpoint = Constantes.urlReports + 'report/report_supplie';
          apiModule = "ADMINISTRATION";
          break;
        default:
          setErrorMessage('Tipo de relatório não reconhecido.');
          setIsLoading(false);
          return;
      }

      const finalUrl = `${apiEndpoint}?${params.toString()}`;
      console.log('URL da API do relatório (AJUSTADA):', finalUrl);
      console.log('🚀 URL gerada (AJUSTADA):', finalUrl);

      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": apiModule,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response text (Relatório):", errorText);
        let msg = `Erro ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          msg = errorData.message || errorData.error || msg;
        } catch (e) {
          // Não é JSON, usa a resposta bruta
        }
        throw new Error(msg);
      }

      const data = await response.json();
      console.log('Dados do relatório recebidos da API:', data);

      let processedData = [];
      if (data.content && Array.isArray(data.content)) {
        processedData = data.content;
      } else if (Array.isArray(data)) {
        processedData = data;
      }

      setReportData(processedData);

      if (processedData.length === 0) {
        setNoDataFound(true);
      } else {
        setNoDataFound(false);
      }

    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      setErrorMessage(error.message || 'Erro ao carregar dados do relatório.');
      setNoDataFound(false);
    } finally {
      setIsLoading(false);
    }
  });

  const handleExportReport = () => {
    if (reportData.length === 0) {
      setErrorMessage('Não há dados para exportar. Gere o relatório primeiro.');
      return;
    }

    const reportTitle = reportTypeOptions.find(opt => opt.id === selectedReport)?.name || 'Relatório';
    const csvData = [];

    csvData.push(['Sistema de Estoque']);
    csvData.push([reportTitle]);
    csvData.push([]);

    const headers = getReportTableColumns(selectedReport);
    csvData.push(headers.map(h => String(h).replace(/<[^>]+>/g, '')));

    const displayData = getReportDisplayData(selectedReport, reportData);
    displayData.forEach(row => {
      const rowValues = headers.map(header => {
        return row[header] || '';
      });
      csvData.push(rowValues);
    });

    let csvString = '';
    csvData.forEach(row => {
      csvString += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });


    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${reportTitle.replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Seu navegador não suporta download automático de CSV. Salve o conteúdo manualmente.');
    }
  };


  return (
    <>
      <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <FiArrowLeftCircle style={{ width: "3%", height: "70px", color: "#009E8B" }}
          onClick={() => { router.back() }} />
        <h1 className={styles.header_h1}>Relatório</h1>
      </CardHeader>

      <CardBody style={{ width: "90%" }}>
        {errorMessage && !noDataFound && (
          <Alert color="danger" className="mb-3">
            <strong>Erro:</strong> {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleGenerateReport}>
          <Row className="mb-3 align-items-end">
            <Col sm="4">
              <InputForm
                id="selectedReport"
                name="selectedReport"
                label="Tipo de Relatório"
                type="select"
                register={register}
                options={reportTypeOptions}
                value={selectedReport}
                onChange={(e) => {
                  setValue('selectedReport', e.target.value);
                  reset({
                    startDate: '',
                    endDate: '',
                    selectedLocation: '',
                    selectedDepartment: '',
                    selectedReport: e.target.value
                  });
                  setReportData([]);
                  setErrorMessage(null);
                  setNoDataFound(false);
                }}
              />
            </Col>

            {selectedReport === 'entradaSaida' ? (
              <>
                <Col sm="4">
                  <InputForm
                    id="startDate"
                    name="startDate"
                    label="Data Inicial"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="endDate"
                    name="endDate"
                    label="Data Final"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="selectedLocation"
                    name="selectedLocation"
                    label="Localização"
                    type="select"
                    register={register}
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={(e) => setValue('selectedLocation', e.target.value)}
                  />
                </Col>
              </>
            ) : selectedReport === 'estoqueAtualizado' ? (
              <>
                <Col sm="4">
                  <InputForm
                    id="startDate"
                    name="startDate"
                    label="Data Inicial"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="endDate"
                    name="endDate"
                    label="Data Final"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="selectedLocation"
                    name="selectedLocation"
                    label="Localização"
                    type="select"
                    register={register}
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={(e) => setValue('selectedLocation', e.target.value)}
                  />
                </Col>
              </>
            ) : selectedReport === 'proximoValidade' ? (
              <>
                <Col sm="4">
                  <InputForm
                    id="endDate"
                    name="endDate"
                    label="Data de Validade Máxima"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="selectedLocation"
                    name="selectedLocation"
                    label="Localização"
                    type="select"
                    register={register}
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={(e) => setValue('selectedLocation', e.target.value)}
                  />
                </Col>
              </>
            ) : selectedReport === 'abaixoMinimo' || selectedReport === 'fornecedoresCadastrados' ? (
              <Col sm="8"></Col>
            ) : selectedReport === 'consumoDepartamento' ? (
              <>
                <Col sm="4">
                  <InputForm
                    id="selectedDepartment"
                    name="selectedDepartment"
                    label="Departamento"
                    type="select"
                    register={register}
                    options={departmentOptions}
                    value={selectedDepartment}
                    onChange={(e) => {
                      setValue('selectedDepartment', e.target.value);
                    }}
                    required={true}
                  />
                </Col>
                <Col sm="2">
                  <InputForm
                    id="startDate"
                    name="startDate"
                    label="Período Inicial"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
                <Col sm="2">
                  <InputForm
                    id="endDate"
                    name="endDate"
                    label="Período Final"
                    type="date"
                    register={register}
                    required={true}
                  />
                </Col>
              </>
            ) : (
              <Col sm="8"></Col>
            )}
          </Row>

          <Row className="mb-4">
            <Col sm="4">
              <InputForm
                id="exportOption"
                name="exportOption"
                label="Exportar para"
                type="select"
                register={register}
                options={[{ id: 'csv', name: 'Exportar para CSV' }]}
                value="csv"
                disabled={true}
              />
            </Col>

            <Col sm="8" className="d-flex justify-content-end align-items-end gap-2">
              <Button
                type="button"
                color="secondary"
                outline
                onClick={handleExportReport}
                disabled={isLoading || reportData.length === 0}
              >
                Exportar
              </Button>
              <Button
                type="submit"
                color="success"
                disabled={isLoading}
              >
                {isLoading ? 'Gerando...' : 'Gerar Relatório'} <FiBarChart2 />
              </Button>
            </Col>
          </Row>
        </Form>

        <div style={{ minHeight: "300px", marginTop: "20px" }}>
          {isLoading ? (
            <div className="text-center p-4">
              <p>Carregando dados do relatório...</p>
            </div>
          ) : noDataFound ? (
            <div className={entradaStyles.emptyState} style={{ backgroundColor: "#f8f9fa" }}>
              <FiBarChart2 size={64} color="#999" />
              <p style={{ marginTop: "16px", marginBottom: "8px", color: "#666" }}>
                Nenhum dado encontrado para o relatório selecionado e filtros aplicados.
              </p>
              <span style={{ fontSize: "14px", color: "#999" }}>
                Tente ajustar os filtros ou selecione outro tipo de relatório.
              </span>
            </div>
          ) : reportData.length > 0 ? (
            <TableStyle
              columnNames={getReportTableColumns(selectedReport)}
              data={getReportDisplayData(selectedReport, reportData)}
            />
          ) : (
            <div className={entradaStyles.emptyState} style={{ backgroundColor: "#f8f9fa" }}>
              <FiBarChart2 size={64} color="#999" />
              <p style={{ marginTop: "16px", marginBottom: "8px", color: "#666" }}>
                Selecione um relatório para visualizar.
              </p>
              <span style={{ fontSize: "14px", color: "#999" }}>
                Clique em Gerar Relatório após selecionar um tipo.
              </span>
            </div>
          )}
        </div>

      </CardBody>
    </>
  );
}