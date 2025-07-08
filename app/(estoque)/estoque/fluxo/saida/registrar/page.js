'use client';
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {
  Form, Row, Col, Button, CardHeader, CardBody,
  Alert
} from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../../..//inicio/inicio.module.css';

import Constantes from '@/Constantes';
import { parseCookies } from 'nookies';

export default function RegistrarSaida() {

  const { "token2": token2 } = parseCookies();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const router = useRouter();
  const [etapa, setEtapa] = useState("informacoes");

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const [productEntries, setProductEntries] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchProductEntries = async () => {
    try {
      const response = await fetch(Constantes.url + `product_registration/input_product?page=0&size=100`, {
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
        const entries = Array.isArray(data) ? data : data.content || [];
        setProductEntries(entries);
      } else {
        console.error("Erro ao buscar entradas de produtos:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar entradas de produtos:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch(Constantes.urlAdmin + `stock?typeLocation=LOCATION`, {
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
        setLocations(Array.isArray(data) ? data : data.content || []);
      } else {
        console.error("Erro ao buscar localizações:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar localizações:', err);
    }
  };

  useEffect(() => {
    if (token2) {
      fetchProductEntries();
      fetchLocations();
    }
  }, [token2]);

  const createOutputProductObject = (data) => {
    const parseTime = (timeString) => {
      if (!timeString) return "00:00:00";
      const [hours, minutes, seconds = '00'] = timeString.split(':');
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return {
      inputProductId: data.entrada_selecionada,
      hour: parseTime(data.hora),
      quantity: parseInt(data.quantidade),
      date: data.data_solicitacao,
      locationId: data.setor_destino,
      responsible: data.responsavel_retirada,
    };
  };

  const validateRequiredFields = (data) => {
    const requiredFields = [
      { field: 'entrada_selecionada', name: 'Entrada do Produto' },
      { field: 'data_solicitacao', name: 'Data da solicitação' },
      { field: 'quantidade', name: 'Quantidade' },
      { field: 'responsavel_retirada', name: 'Responsável pela retirada' },
      { field: 'setor_destino', name: 'Setor de destino' },
      { field: 'hora', name: 'Hora' },
    ];

    const missingFields = requiredFields.filter(req => !data[req.field] || String(data[req.field]).trim() === '');

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(f => f.name).join(', ');
      throw new Error(`Campos obrigatórios não preenchidos: ${fieldNames}`);
    }

    return true;
  };

  async function submit(data) {
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    try {
      validateRequiredFields(data);

      const outputProductObject = createOutputProductObject(data);

      console.log('Dados de saída sendo enviados (JSON):', JSON.stringify(outputProductObject, null, 2));

      const response = await fetch(Constantes.url + `product_registration/output_product`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outputProductObject)
      });

      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`;
        const errorText = await response.text();
        console.error("Raw error response text (Saída):", errorText);
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = JSON.parse(errorText);
            if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            }
          } else {
            errorMessage = `Erro ${response.status}: ${response.statusText}. Resposta: ${errorText}`;
          }
        } catch (parseError) {
          console.error("Erro ao parsear resposta de erro como JSON/Texto:", parseError);
          errorMessage = `Erro ${response.status}: ${response.statusText}. Resposta ilegível.`;
        }
        throw new Error(errorMessage);
      }

      const successResponseText = await response.text();
      console.log("Raw success response text (Saída):", successResponseText);

      let result;
      try {
        if (successResponseText.trim() !== '') { 
          result = JSON.parse(successResponseText);
        } else {
          result = { message: 'Sucesso, mas resposta vazia da API.' };
        }
      } catch (parseError) {
        console.error("Erro ao parsear resposta de sucesso como JSON/Texto (Saída):", parseError);
        result = { message: 'Sucesso, mas resposta ilegível da API.' };
      }
      
      setApiSuccess(result.message || 'Registro de saída criado com sucesso!');

      console.log('Registro de saída criado:', result);

      setTimeout(() => {
        router.push('/estoque/fluxo/saida');
      }, 2000);

    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      setApiError(error.message || 'Erro ao registrar saída na API');
    } finally {
      setLoading(false);
    }
  }

  return (<>
    <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <IoArrowBackCircleSharp style={{ width: "3%", height: "70px", color: "#009E8B" }}
        onClick={() => { router.back() }} />
      <h1 className={styles.header_h1}>Registrar Saída</h1>
    </CardHeader>

    {apiError && (
      <Alert color="danger" className="mx-3">
        <strong>Erro:</strong> {apiError}
      </Alert>
    )}

    {apiSuccess && (
      <Alert color="success" className="mx-3">
        <strong>Sucesso:</strong> {apiSuccess}
      </Alert>
    )}

    <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
      {etapa == "informacoes" && <>
        <Row className="d-flex mt-3">
          <Col sm="12">
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="entrada_selecionada"
                  name="entrada_selecionada"
                  label="Entrada do Produto *"
                  placeholder="Selecione uma entrada de produto"
                  register={register}
                  required={true}
                  type="select"
                  options={productEntries.map(entry => ({
                    id: entry.id,
                    name: `${entry.description || 'Produto sem descrição'} (ID: ${entry.id.substring(0, 8)}) - Qtd: ${entry.quantity || 0}`
                  }))}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="data_solicitacao"
                  name="data_solicitacao"
                  label="Data da solicitação *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="date"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="hora"
                  name="hora"
                  label="Hora *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="time"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="quantidade"
                  name="quantidade"
                  label="Quantidade *"
                  placeholder="0"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="responsavel_retirada"
                  name="responsavel_retirada"
                  label="Responsável pela retirada *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="setor_destino"
                  name="setor_destino"
                  label="Setor de destino *"
                  placeholder="Selecione um setor"
                  register={register}
                  required={true}
                  type="select"
                  options={locations.map(loc => ({ id: loc.id, name: loc.name || loc.description }))}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="12">
                <p style={{ color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}>
                  <img src="/icon-doc.svg" alt="" style={{ width: '16px', marginRight: '5px' }} />
                  Imprimir documento de protocolo
                </p>
              </Col>
            </Row>

            <Row className="d-flex mt-4 justify-content-end">
              <Col sm="auto">
                <Button
                  color="secondary"
                  outline
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
              </Col>
              <Col sm="auto">
                <Button
                  color="success"
                  onClick={handleSubmit(submit)}
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrar'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>}
    </CardBody>
  </>);
}