'use client';

import React, { useState, useEffect } from 'react';
import styles from './inicio.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FiSearch, FiPlus, FiPackage } from 'react-icons/fi';
import { FaPlus } from "react-icons/fa6";
import InputForm from '@/components/ElementsUI/InputForm';
import TableStyle from '@/components/ElementsUI/TableStyle';
import PaginationStyle from '@/components/ElementsUI/PaginationStyle';

/* IMPORTANTE: a variavel da url da api e a biblioteca de onde vem os cookies */
import Constantes from '../../../../src/Constantes';
import { parseCookies } from 'nookies';

const API_BASE_URL = 'http://frota-api.smartdatasolutions.com.br';

export default function HomePage() { 
  /*  IMPORTANTE: Aqui Salvo como cookie está o token2, da conta que vc recebe os dados   */
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
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState('');

  const [number, setNumber] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
        params.append('categoryId', filters.categoryId.trim());
      }

      /* const response = await fetch(`${API_BASE_URL}/product?${params}`, { */
      const response = await fetch(Constantes.url + `/product?${params}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          /* IMPORTANTE: Aqui vai no authentication o token2 e o modulo que vc vai utilizar o de estoque(STOCK) */
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

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

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias(Array.isArray(data) ? data : data.content || []);
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
    }
  };

  useEffect(() => {
    fetchProdutos(0, size);
    fetchCategorias();
  }, []);

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

  const categoriasOptions = categorias.map(cat => ({
    value: cat.id,
    label: cat.name || cat.nome || cat.description
  }));

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

          <Button
            className={styles.header_button}
            onClick={() => router.push("/estoque/inicio/adicionar_tipo_produto")}
          >
            Adicionar Tipo de Produto <FaPlus />
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
            <div className="spinner-border" role="status">
              <span className="sr-only">Carregando...</span>
            </div>
            <p>Carregando produtos...</p>
          </div>
        ) : produtos.length > 0 ? (
          <TableStyle
            columnNames={["Id", "Imagem", "Nome", "Tipo"]}
            data={produtos.map(produto => ({
              id: produto.id,
              imagem: produto.image || produto.imagem || "",
              nome: produto.name || produto.nome,
              tipo: produto.category?.name || produto.categoria?.nome || produto.tipo || "N/A"
            }))}
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
