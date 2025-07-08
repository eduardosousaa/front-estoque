'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from '@/styles/entrada.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FiSearch, FiPackage } from 'react-icons/fi';
import InputForm from '@/components/ElementsUI/InputForm';

// IMPORTANTE: Importando Constantes e parseCookies para acesso à API
import Constantes from '@/Constantes';
import { parseCookies } from 'nookies';
import TableStyle from '@/components/ElementsUI/TableStyle';
import PaginationStyle from '@/components/ElementsUI/PaginationStyle';


export default function EntradaPage() {
  const router = useRouter();

  // Obtém o token2 dos cookies para autenticação
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
      dataFim: ''
    }
  });

  const [entradas, setEntradas] = useState([]);
  const [loadingEntradas, setLoadingEntradas] = useState(true);
  const [requestErrorEntradas, setRequestErrorEntradas] = useState(null);

  const [number, setNumber] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filters = watch();

  const fetchEntradas = async (page = 0, pageSize = size, currentFilters = {}) => {
    setLoadingEntradas(true);
    setRequestErrorEntradas(null);
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

      console.log("Endpoint da API de entradas:", Constantes.url + `product_registration/input_product?${params}`);

      const response = await fetch(Constantes.url + `product_registration/input_product?${params}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response text (Entradas):", errorText);
        let errorMessage = `Erro na requisição: ${response.status} - ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Se a resposta não for JSON, usa a mensagem padrão
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Dados de entrada recebidos da API:", data);

      if (data.content) {
        setEntradas(data.content);
        setTotalElements(data.totalElements || 0);
        setTotalPages(data.totalPages || 0);
      } else if (Array.isArray(data)) {
        setEntradas(data);
        setTotalElements(data.length);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        setEntradas([]);
        setTotalElements(0);
        setTotalPages(0);
      }

    } catch (err) {
      console.error('Erro ao buscar entradas:', err);
      setRequestErrorEntradas(err.message || 'Erro ao carregar registros de entrada. Tente novamente.');
      setEntradas([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoadingEntradas(false);
    }
  };


  useEffect(() => {
    if (token2) {
      fetchEntradas(number, size, {
        busca: filters.busca,
        dataInicio: filters.dataInicio,
        dataFim: filters.dataFim
      });
    }
  }, [number, size, token2, filters.busca, filters.dataInicio, filters.dataFim]);


  const onSubmit = (data) => {
    setNumber(0);
  };

  const limparFiltros = () => {
    reset({
      busca: '',
      dataInicio: '',
      dataFim: '',
    });
    setNumber(0);
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
          <div className={styles.tabActive}>Entrada</div>
          <div
            className={styles.tab}
            onClick={() => router.push('/estoque/fluxo/saida')}
          >
            Saída
          </div>
        </div>

        <Button
          className={styles.registrarButton}
          onClick={() => router.push('/estoque/fluxo/entrada/registrar')}
        >
          Registrar entrada
        </Button>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-4">
            <Col sm="8">
              <div className={styles.inputWrapper}>
                <FiSearch className={styles.iconeBusca} />
                <input
                  type="text"
                  placeholder="Pesquisar entrada de produto"
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
        {loadingEntradas ? (
          <div className="text-center p-4">
            <p>Carregando registros de entrada...</p>
          </div>
        ) : requestErrorEntradas ? (
          <div className="alert alert-danger" role="alert">
            {requestErrorEntradas}
          </div>
        ) : entradas.length > 0 ? (
          <TableStyle
            columnNames={["Nº", "Descrição do Produto", "ID do Produto", "ID da Localização", "ID do Fornecedor"]}
            data={entradas.map((entrada, index) => ({
              Nº: (number * size + index + 1),
              "Descrição do Produto": entrada.description || 'N/A',
              "ID do Produto": entrada.productId || 'N/A',
              "ID da Localização": entrada.locationId || 'N/A',
              "ID do Fornecedor": entrada.supplierId || 'N/A',
            }))}
          />
        ) : (
          <div className="text-center p-4">
            <FiPackage size={48} color="#999" />
            <p>Nenhuma entrada encontrada</p>
            <span>Tente ajustar os filtros ou registrar novas entradas</span>
          </div>
        )}
      </CardBody>

      <CardFooter style={{ width: "90%", backgroundColor: "transparent" }}>
        <PaginationStyle
          number={number}
          setNumber={handlePageChange}
          size={size}
          setSize={handleSizeChange}
          pageElements={entradas.length}
          totalElements={totalElements}
          totalPages={totalPages}
        />
      </CardFooter>
    </>
  );
}