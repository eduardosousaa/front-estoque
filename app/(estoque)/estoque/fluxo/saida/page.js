'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from '@/styles/entrada.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FiSearch, FiPackage } from 'react-icons/fi';
import InputForm from '@/components/ElementsUI/InputForm';

import Constantes from '@/Constantes';
import { parseCookies } from 'nookies';
import TableStyle from '@/components/ElementsUI/TableStyle';
import PaginationStyle from '@/components/ElementsUI/PaginationStyle';


export default function SaidaPage() {
  const router = useRouter();

  const { "token2": token2 } = parseCookies();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      busca: '',
      dataInicio: '',
      dataFim: '',
      categoria: ''
    }
  });

  const [saidas, setSaidas] = useState([]);
  const [loadingSaidas, setLoadingSaidas] = useState(true);
  const [requestErrorSaidas, setRequestErrorSaidas] = useState(null);

  const [number, setNumber] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filters = watch();

  const fetchSaidas = async (page = 0, pageSize = size, currentFilters = {}) => {
    setLoadingSaidas(true);
    setRequestErrorSaidas(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        status: 'ACTIVE',
      });

      if (currentFilters.busca && currentFilters.busca.trim()) {
        params.append('description', currentFilters.busca.trim());
      }
      if (currentFilters.dataInicio && currentFilters.dataInicio.trim()) {
        params.append('startDate', currentFilters.dataInicio.trim());
      }
      if (currentFilters.dataFim && currentFilters.dataFim.trim()) {
        params.append('endDate', currentFilters.dataFim.trim());
      }

      console.log('URL da API de Saída:', Constantes.url + `product_registration/output_product?${params}`);

      const response = await fetch(Constantes.url + `product_registration/output_product?${params}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response text (Saídas):", errorText);
        let errorMessage = `Erro na requisição: ${response.status} - ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Se a resposta não for JSON
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Dados brutos da API de saída:', data);

      if (data.content) {
        setSaidas(data.content);
        setTotalElements(data.totalElements || 0);
        setTotalPages(data.totalPages || 0);
      } else if (Array.isArray(data)) {
        setSaidas(data);
        setTotalElements(data.length);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        setSaidas([]);
        setTotalElements(0);
        setTotalPages(0);
      }

    } catch (err) {
      console.error('Erro ao buscar saídas:', err);
      setRequestErrorSaidas('Erro ao carregar registros de saída. Tente novamente.');
      setSaidas([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoadingSaidas(false);
    }
  };

  useEffect(() => {
    if (token2) {
      fetchSaidas(number, size, {
        busca: filters.busca,
        dataInicio: filters.dataInicio,
        dataFim: filters.dataFim,
      });
    }
  }, [number, size, token2, filters.busca, filters.dataInicio, filters.dataFim]);

  const categoriasOptions = useMemo(() => {
    const mockData = [
      { id: 'venda', name: 'Venda' },
      { id: 'devolucao', name: 'Devolução' },
      { id: 'perda', name: 'Perda' },
      { id: 'transferencia', name: 'Transferência' }
    ];
    return [
      { value: '', label: '--Todas as categorias--' },
      ...mockData.map(cat => ({
        value: cat.id,
        label: cat.name
      }))
    ];
  }, []);

  const onSubmit = (data) => {
    setNumber(0);
    // O useEffect já irá disparar a busca com os filtros atualizados
  };

  const limparFiltros = () => {
    reset({
      busca: '',
      dataInicio: '',
      dataFim: '',
      categoria: ''
    });
    setNumber(0);
    // O useEffect já irá disparar a busca com os filtros limpos
  };

  const handlePageChange = (newPage) => {
    setNumber(newPage);
  };

  const handleSizeChange = (newSize) => {
    setSize(parseInt(newSize));
    setNumber(0);
  };


  return (
    <>
      <CardHeader className={styles.header}>
        <h1 className={styles.header_h1}>Gestão de entrada e Saída</h1>
      </CardHeader>

      <CardBody style={{ width: "90%" }}>
        <div className={styles.tabs}>
          <div
            className={styles.tab}
            onClick={() => router.push('/estoque/fluxo/entrada')}
          >
            Entrada
          </div>
          <div className={styles.tabActive}>Saída</div>
        </div>

        <Button
          className={styles.registrarButton}
          onClick={() => router.push('/estoque/fluxo/saida/registrar')}
        >
          Registrar saída
        </Button>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-4">
            <Col sm="6">
              <div className={styles.inputWrapper}>
                <FiSearch className={styles.iconeBusca} />
                <input
                  type="text"
                  placeholder="Pesquisar saída de produto por descrição"
                  {...register('busca')}
                />
              </div>
            </Col>
            <Col sm="2">
              <InputForm
                id="dataInicio"
                name="dataInicio"
                label=""
                placeholder="Data de início"
                type="date"
                register={register}
              />
            </Col>
            <Col sm="2">
              <InputForm
                id="dataFim"
                name="dataFim"
                label=""
                placeholder="Data de fim"
                type="date"
                register={register}
              />
            </Col>
            <Col sm="2">
              <InputForm
                id="categoria"
                name="categoria"
                label=""
                placeholder="--Todas as categorias--"
                type="select"
                register={register}
                options={categoriasOptions}
              />
            </Col>
          </Row>

          <Row style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <Button
              type="button"
              onClick={limparFiltros}
              style={{ backgroundColor: "#6c757d", width: "15%", marginRight: "10px" }}
            >
              Limpar
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#009E8B", width: "20%", marginRight: "10px" }}
            >
              Pesquisar <FiSearch />
            </Button>
          </Row>
        </Form>
      </CardBody>

      <CardBody style={{ width: "90%" }}>
        {loadingSaidas ? (
          <div className="text-center p-4">
            <p>Carregando registros de saída...</p>
          </div>
        ) : requestErrorSaidas ? (
          <div className="alert alert-danger" role="alert">
            {requestErrorSaidas}
          </div>
        ) : saidas.length > 0 ? (
          <TableStyle
            columnNames={["Nº", "Produto", "Descrição", "Data", "Quantidade", "Responsável", "Localização"]}
            data={saidas.map((saida, index) => ({
              Nº: (number * size + index + 1),
              "Produto": saida.productDescription || saida.productName || saida.productId || 'N/A',
              "Descrição": saida.description || 'N/A',
              "Data": saida.date || 'N/A',
              "Quantidade": saida.quantity !== undefined ? saida.quantity : 'N/A',
              "Responsável": saida.responsible || 'N/A',
              "Localização": saida.locationName || saida.locationId || 'N/A',
            }))}
          />
        ) : (
          <div className="text-center p-4">
            <FiPackage size={48} color="#999" />
            <p>Nenhuma saída encontrada</p>
            <span>Tente ajustar os filtros ou registrar novas saídas</span>
          </div>
        )}
      </CardBody>

      <CardFooter style={{ width: "90%", backgroundColor: "transparent" }}>
        <PaginationStyle
          number={number}
          setNumber={handlePageChange}
          size={size}
          setSize={handleSizeChange}
          pageElements={saidas.length}
          totalElements={totalElements}
          totalPages={totalPages}
        />
      </CardFooter>
    </>
  );
}