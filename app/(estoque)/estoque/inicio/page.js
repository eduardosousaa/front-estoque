'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from './inicio.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FiSearch, FiPlus, FiPackage } from 'react-icons/fi';
import { FaPlus } from "react-icons/fa6";
import InputForm from '@/components/ElementsUI/InputForm';
import TableStyle from '@/components/ElementsUI/TableStyle';
import PaginationStyle from '@/components/ElementsUI/PaginationStyle';

import Constantes from '../../../../src/Constantes';
import { parseCookies } from 'nookies';


export default function HomePage() {
  const { "token2": token2 } = parseCookies();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      categoryId: ''
    }
  });

  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState('');

  const [number, setNumber] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAllProductTypes = async () => {
    try {
      const response = await fetch(Constantes.url + `product/product_type`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAllProductTypes(Array.isArray(data) ? data : data.content || []);
      } else {
        console.error("Erro ao buscar todos os tipos de produto:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar todos os tipos de produto:', err);
    }
  };


  const fetchProdutos = async (page = 0, pageSize = 5, filters = {}) => {
    setLoading(true);
    setRequestError('');
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
      });

      if (filters.name && filters.name.trim()) {
        params.append('name', filters.name.trim());
      }

      if (filters.categoryId && filters.categoryId.trim()) {
        params.append('productTypeId', filters.categoryId.trim());
      }

      const response = await fetch(Constantes.url + `product?${params}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Dados completos retornados pelo endpoint GET de produtos:', data);

      if (data.content) {
        setProdutos(data.content);
        setTotalElements(data.totalElements || 0);
        setTotalPages(data.totalPages || 0);
      } else if (Array.isArray(data)) {
        setProdutos(data);
        setTotalElements(data.length);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        setProdutos([]);
        setTotalElements(0);
        setTotalPages(0);
      }

    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setRequestError('Erro ao carregar produtos. Tente novamente.');
      setProdutos([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token2) {
      fetchProdutos(0, size);
      fetchAllProductTypes();
    }
  }, [token2]);

  const onSubmit = (data) => {
    const filters = {
      name: busca,
      categoryId: tipoSelecionado
    };

    setNumber(0);
    fetchProdutos(0, size, filters);
  };

  const limpar = () => {
    setBusca('');
    setTipoSelecionado('');
    setValue('name', '');
    setValue('categoryId', '');
    setNumber(0);
    fetchProdutos(0, size);
  };

  const handlePageChange = (newPage) => {
    setNumber(newPage);
    const filters = {
      name: busca,
      categoryId: tipoSelecionado
    };
    fetchProdutos(newPage, size, filters);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setNumber(0);
    const filters = {
      name: busca,
      categoryId: tipoSelecionado
    };
    fetchProdutos(0, newSize, filters);
  };

  const categoriasOptions = useMemo(() => {
    return [
      { value: '', label: '--Todas as categorias--' },
      ...allProductTypes.map(type => ({
        value: type.id,
        label: type.name
      }))
    ];
  }, [allProductTypes]);

  return (
    <>
      <CardHeader className={styles.header}>
        <h1 className={styles.header_h1}>Produtos</h1>
        <div className={styles.header_buttons}>
          <Button
            className={styles.header_button}
            onClick={() => router.push("/estoque/inicio/adicionar_produto")}
          >
            Adicionar Produto <FaPlus />
          </Button>
        </div>
      </CardHeader>

      <CardBody style={{ width: "90%" }}>
        {requestError && (
          <div className="alert alert-danger" role="alert">
            {requestError}
          </div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="d-flex mt-3">
            <Col sm="8">
              <div className={styles.inputWrapper}>
                <FiSearch className={styles.iconeBusca} />
                <input
                  type="text"
                  placeholder="Buscar produtos por nome, código ou fornecedor..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </Col>
            <Col sm="4">
              <InputForm
                id="categoryId"
                name="categoryId"
                label=""
                placeholder="--Todas as categorias--"
                type="select"
                register={register}
                options={categoriasOptions}
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              />
            </Col>
          </Row>

          <Row style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button
              type="submit"
              style={{ backgroundColor: "#009E8B", width: "20%", marginRight: "10px" }}
              disabled={loading}
            >
              {loading ? 'Pesquisando...' : 'Pesquisar'} <FiSearch />
            </Button>

            <Button
              type="button"
              onClick={limpar}
              style={{ backgroundColor: "#6c757d", width: "15%" }}
              disabled={loading}
            >
              Limpar
            </Button>
          </Row>
        </Form>
      </CardBody>

      <CardBody style={{ width: "90%" }}>
        {loading ? (
          <div className="text-center p-4">
            <p>Carregando produtos...</p>
          </div>
        ) : produtos.length > 0 ? (
          <TableStyle
            columnNames={["Nº", "Descrição", "SKU", "Categoria", "Estoque"]}
            data={produtos.map((produto, index) => {
              const categoryName = produto.categoryName || "N/A";

              return {
                Nº: (number * size + index + 1).toString().padStart(2, '0'),
                Descrição: produto.description || "N/A",
                SKU: produto.sku || "N/A",
                Categoria: categoryName,
                Estoque: produto.quantityStock !== undefined ? produto.quantityStock : "N/A",
              };
            })}
          />
        ) : (
          <div className="text-center p-4">
            <FiPackage size={48} className="text-muted mb-3" />
            <p className="text-muted">Nenhum produto encontrado</p>
          </div>
        )}
      </CardBody>

      <CardFooter style={{ width: "90%", backgroundColor: "transparent" }}>
        <PaginationStyle
          number={number}
          setNumber={handlePageChange}
          size={size}
          setSize={handleSizeChange}
          pageElements={produtos.length}
          totalElements={totalElements}
          totalPages={totalPages}
        />
      </CardFooter>
    </>
  );
}