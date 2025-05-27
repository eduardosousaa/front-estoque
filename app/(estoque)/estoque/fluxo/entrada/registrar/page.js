"use client"
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {
  Input, Form, Row, Col, Button, CardHeader, CardBody,
  Nav, NavItem, NavLink, Label, FormGroup
} from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FiUpload } from 'react-icons/fi';
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../../..//inicio/inicio.module.css';
import styles2 from '@/styles/ModalAdicionarProduto.module.css'

export default function RegistrarEntrada() {

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
  const [nomeArquivoNota, setNomeArquivoNota] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImagem(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleNotaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNomeArquivoNota(file.name);
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

  function submit(data) {
    console.log(data);
  }

  return (<>
    <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <IoArrowBackCircleSharp style={{ width: "3%", height: "70px", color: "#009E8B" }}
        onClick={() => { router.back() }} />
      <h1 className={styles.header_h1}>Registrar Entrada</h1>
    </CardHeader>

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
                  label="Produto"
                  placeholder="Selecione um produto"
                  register={register}
                  required={false}
                  type="select"
                  options={[]}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="numero_nota_fiscal"
                  name="numero_nota_fiscal"
                  label="Número da Nota Fiscal"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="data_emissao"
                  name="data_emissao"
                  label="Data de emissão"
                  placeholder=""
                  register={register}
                  required={false}
                  type="date"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="valor_item"
                  name="valor_item"
                  label="Valor do Item"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="quantidade"
                  name="quantidade"
                  label="Quantidade"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="fornecedor"
                  name="fornecedor"
                  label="Fornecedor"
                  placeholder="Selecione um fornecedor"
                  register={register}
                  required={false}
                  type="select"
                  options={[]}
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="cnpj_fornecedor"
                  name="cnpj_fornecedor"
                  label="CNPJ do fornecedor"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="12">
                <FormGroup>
                  <Label>
                    <Input
                      type="checkbox"
                      checked={pessoaJuridica}
                      onChange={(e) => setPessoaJuridica(e.target.checked)}
                    />
                    {' '}Pessoa Jurídica
                  </Label>
                </FormGroup>
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="link_nota_fiscal"
                  name="link_nota_fiscal"
                  label="Inserir link da nota fiscal"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                />
                <div className="mt-2">
                  <SeletorNotaFiscal />
                </div>
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="descricao"
                  name="descricao"
                  label="Descrição"
                  placeholder=""
                  register={register}
                  required={false}
                  type="textarea"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-4">
              <Col sm="12">
                <h5>Condição do Produto</h5>
                <FormGroup>
                  <Label>
                    <Input
                      type="checkbox"
                      {...register("entregue_prazo")}
                    />
                    {' '}Entregue no Prazo
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="checkbox"
                      {...register("produto_boa_condicao")}
                    />
                    {' '}Produto em Boa condição
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="checkbox"
                      {...register("quantidade_conforme")}
                    />
                    {' '}Quantidade conferida e conforme o pedido
                  </Label>
                </FormGroup>
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
                >
                  Registrar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>}
    </CardBody>

  </>);
}