'use client';

import React, { useState, useMemo } from 'react';
import styles from '@/styles/entrada.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FiSearch, FiPackage } from 'react-icons/fi';
import InputForm from '@/components/ElementsUI/InputForm';

export default function EntradaPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    reset,
    watch
  } = useForm({
    defaultValues: {
      busca: '',
      dataInicio: '',
      dataFim: ''
    }
  });

  const busca = watch('busca');
  const dataInicio = watch('dataInicio');
  const dataFim = watch('dataFim');

  const onSubmit = (data) => {
    console.log('Busca realizada:', data);
  };

  const limparFiltros = () => {
    reset({
      busca: '',
      dataInicio: '',
      dataFim: ''
    });
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
              Pesquisar <FiSearch/>
            </Button>
          </Row>
        </Form>
      </CardBody>

      <CardBody style={{ width: "90%" }}>
        <div className={styles.emptyState}>
          <FiPackage size={48} color="#999" />
          <p>Nenhuma entrada encontrada</p>
          <span>Tente ajustar os filtros ou registrar novas entradas</span>
        </div>
      </CardBody>
    </>
  );
}