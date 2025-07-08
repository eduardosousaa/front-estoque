'use client';
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {
  Input, Form, Row, Col, Button, CardHeader, CardBody,
  Nav, NavItem, NavLink, Label, FormGroup, Alert
} from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FiUpload } from 'react-icons/fi';
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../../../inicio/inicio.module.css';
import styles2 from '@/styles/ModalAdicionarProduto.module.css';

import Constantes from '@/Constantes';
import { parseCookies } from 'nookies';

export default function RegistrarEntrada() {
  const { "token2": token2 } = parseCookies();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const router = useRouter();
  const [etapa, setEtapa] = useState("informacoes");
  const [pessoaJuridica, setPessoaJuridica] = useState(true);

  const fileInputRef = useRef(null);
  const fileInputNotaRef = useRef(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [imagemNotaFile, setImagemNotaFile] = useState(null);
  const [nomeArquivoNota, setNomeArquivoNota] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(Constantes.url + `product`, {
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
        console.log("Produtos retornados pela API (RegistrarEntrada):", data);
        setProducts(Array.isArray(data) ? data : data.content || []);
      } else {
        console.error("Erro ao buscar produtos:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(Constantes.url + `product/supplier`, {
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
        setSuppliers(Array.isArray(data) ? data : data.content || []);
      } else {
        console.error("Erro ao buscar fornecedores:", response.status, response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar fornecedores:', err);
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
      fetchProducts();
      fetchSuppliers();
      fetchLocations();
    }
  }, [token2]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImagem(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      setImagemNotaFile(file);
    }
  };

  const handleNotaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNomeArquivoNota(file.name);
      setImagemNotaFile(file);
    }
  };

  const abrirSeletorArquivo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const abrirSeletorNota = () => {
    if (fileInputNotaRef.current) {
      fileInputNotaRef.current.click();
    }
  };

  const SeletorImagem = () => (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div
        className={styles2.seletorImagem}
        onClick={abrirSeletorArquivo}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles2.imagemPreview}>
          {previewImagem ? (
            <img
              src={previewImagem}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <FiUpload />
          )}
        </div>
        <span>Selecionar imagem da nota fiscal</span>
      </div>
    </>
  );

  const SeletorNotaFiscal = () => (
    <>
      <input
        type="file"
        ref={fileInputNotaRef}
        onChange={handleNotaFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
      />

      <Button
        color="secondary"
        outline
        onClick={abrirSeletorNota}
        style={{ width: '100%' }}
      >
        {nomeArquivoNota || 'Anexar nota fiscal'}
      </Button>
    </>
  );

  const createInputProductFormData = (data) => {
    const formData = new FormData();

    const parseTime = (timeString) => {
      if (!timeString) return "00:00:00";
      const [hours, minutes, seconds = '00'] = timeString.split(':');
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const inputProductObject = {
      hour: parseTime(data.hora),
      invoiceValue: parseFloat(String(data.valor_item).replace(',', '.')),
      supplierId: data.fornecedor,
      invoiceLink: data.link_nota_fiscal || "",
      price: parseFloat(String(data.valor_item).replace(',', '.')),
      productId: data.produto,
      quantity: parseInt(data.quantidade),
      date: data.data_emissao,
      invoiceNumber: data.numero_nota_fiscal,
      invoiceDate: data.data_emissao,
      locationId: data.localizacao,
      numberBatch: data.numero_lote,
      manufactureDate: data.data_fabricacao || null,
      duration: data.duracao ? parseInt(data.duracao) : 0,
      expirationDate: data.data_validade || null
    };

    console.log('inputProduct JSON:', JSON.stringify(inputProductObject, null, 2));

    formData.append('inputProduct', new Blob([JSON.stringify(inputProductObject)], { type: 'application/json' }));

    if (imagemNotaFile) {
      if (imagemNotaFile.type === 'application/pdf') {
        formData.append('invoicePdf', imagemNotaFile);
      } else if (imagemNotaFile.type.startsWith('image/')) {
        formData.append('invoiceImage', imagemNotaFile);
      }
    }

    return formData;
  };

  const validateRequiredFields = (data) => {
    const requiredFields = [
      { field: 'produto', name: 'Produto' },
      { field: 'numero_nota_fiscal', name: 'Número da Nota Fiscal' },
      { field: 'data_emissao', name: 'Data de Emissão' },
      { field: 'valor_item', name: 'Valor do Item' },
      { field: 'quantidade', name: 'Quantidade' },
      { field: 'fornecedor', name: 'Fornecedor' },
      { field: 'localizacao', name: 'Localização' },
      { field: 'numero_lote', name: 'Número do Lote' },
      { field: 'data_fabricacao', name: 'Data de Fabricação' },
      { field: 'duracao', name: 'Duração' },
      { field: 'data_validade', name: 'Data de Validade' },
      { field: 'hora', name: 'Hora' },
    ];

    const missingFields = requiredFields.filter(req => !data[req.field] || String(data[req.field]).trim() === '');

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(f => f.name).join(', ');
      throw new Error(`Campos obrigatórios não preenchidos: ${fieldNames}`);
    }
    if (!imagemNotaFile && !data.link_nota_fiscal) {
      throw new Error('É necessário anexar uma imagem/PDF da nota fiscal ou fornecer um link.');
    }
  };


  async function submit(data) {
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    try {
      validateRequiredFields(data);

      const formData = createInputProductFormData(data);

      console.log('Dados de entrada sendo enviados (FormData):');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(Constantes.url + `product_registration/input_product`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token2,
          "Module": "STOCK",
        },
        body: formData
      });

      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`;
        const errorText = await response.text();
        console.error("Raw error response text:", errorText);
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
      console.log("Raw success response text:", successResponseText);
      let result;
      try {
          if (successResponseText.trim() !== '') {
              result = JSON.parse(successResponseText);
          } else {
              result = { message: 'Sucesso, mas resposta vazia da API.' };
          }
      } catch (parseError) {
          console.error("Erro ao parsear resposta de sucesso como JSON/Texto:", parseError);
          result = { message: 'Sucesso, mas resposta ilegível da API.' };
      }
      
      setApiSuccess(result.message || 'Registro de entrada criado com sucesso!');

      console.log('Registro de entrada criado:', result);

      setTimeout(() => {
        router.push('/estoque/fluxo/entrada');
      }, 2000);

    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
      setApiError(error.message || 'Erro ao registrar entrada na API');
    } finally {
      setLoading(false);
    }
  }

  return (<>
    <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <IoArrowBackCircleSharp style={{ width: "3%", height: "70px", color: "#009E8B" }}
        onClick={() => { router.back() }} />
      <h1 className={styles.header_h1}>Registrar Entrada</h1>
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
          <Col sm="6">
            <SeletorImagem />
          </Col>
          <Col sm="6">
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="produto"
                  name="produto"
                  label="Produto *"
                  placeholder="Selecione um produto"
                  register={register}
                  required={true}
                  type="select"
                  options={products.map(p => ({
                    id: p.id,
                    name: p.productName || p.description || p.sku || 'Produto sem nome'
                  }))}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="numero_nota_fiscal"
                  name="numero_nota_fiscal"
                  label="Número da Nota Fiscal *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="data_emissao"
                  name="data_emissao"
                  label="Data de emissão *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="date"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="valor_item"
                  name="valor_item"
                  label="Valor do Item *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
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
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="fornecedor"
                  name="fornecedor"
                  label="Fornecedor *"
                  placeholder="Selecione um fornecedor"
                  register={register}
                  required={true}
                  type="select"
                  options={suppliers.map(s => ({ id: s.id, name: s.name }))}
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="localizacao"
                  name="localizacao"
                  label="Localização *"
                  placeholder="Selecione uma localização"
                  register={register}
                  required={true}
                  type="select"
                  options={locations.map(loc => ({ id: loc.id, name: loc.name }))}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="numero_lote"
                  name="numero_lote"
                  label="Número do Lote *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              {/* NOVO CAMPO: Data de Fabricação */}
              <Col sm="6">
                <InputForm
                  id="data_fabricacao"
                  name="data_fabricacao"
                  label="Data de Fabricação *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="date"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              {/* NOVO CAMPO: Duração */}
              <Col sm="6">
                <InputForm
                  id="duracao"
                  name="duracao"
                  label="Duração (em dias) *"
                  placeholder="0"
                  register={register}
                  required={true}
                  type="number"
                />
              </Col>
              {/* NOVO CAMPO: Data de Validade */}
              <Col sm="6">
                <InputForm
                  id="data_validade"
                  name="data_validade"
                  label="Data de Validade *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="date"
                />
              </Col>
            </Row>
            
            <Row className="d-flex mt-3">
                <Col sm="12">
                    <InputForm
                    id="hora"
                    name="hora"
                    label="Hora *"
                    placeholder="HH:MM"
                    register={register}
                    required={true}
                    type="time"
                    />
                </Col>
            </Row>


            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="link_nota_fiscal"
                  name="link_nota_fiscal"
                  label="Ou inserir link da nota fiscal"
                  placeholder="https://"
                  register={register}
                  required={false}
                  type="text"
                />
                <div className="mt-2">
                  <SeletorNotaFiscal />
                </div>
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