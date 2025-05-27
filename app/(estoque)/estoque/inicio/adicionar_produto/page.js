"use client"
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {
  Input, Form, Row, Col, Button, CardHeader, CardBody,
  Nav, NavItem, NavLink, Alert
} from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FiUpload } from 'react-icons/fi';
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../inicio.module.css';
import styles2 from '../../../../../src/styles/ModalAdicionarProduto.module.css'

export default function Create() {

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
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const fileInputRef = useRef(null);
  const fileInputPdfRef = useRef(null);
  const fileInputJpgRef = useRef(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [imagemFile, setImagemFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [jpgFile, setJpgFile] = useState(null);
  const [nomeArquivoPdf, setNomeArquivoPdf] = useState('');
  const [nomeArquivoJpg, setNomeArquivoJpg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImagem(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setNomeArquivoPdf(file.name);
    }
  };

  const handleJpgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJpgFile(file);
      setNomeArquivoJpg(file.name);
    }
  };

  const abrirSeletorArquivo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOpcaoChange = (e) => {
    setOpcaoSelecionada(e.target.value);
  };

  const createFormData = (data) => {
    const formData = new FormData();

    formData.append('productTypeId', data.tipo_produto);
    formData.append('supplierId', data.fornecedor);
    formData.append('locationId', data.localizacao);
    formData.append('price', parseFloat(data.preco.replace(',', '.')));
    formData.append('quantity', parseInt(data.qtd_itens));
    formData.append('sku', data.codigo_lote);
    formData.append('manufactureDate', data.data_fabricacao);
    formData.append('duration', parseFloat(data.duracao.replace(',', '.')));
    formData.append('expirationDate', data.data_validade);
    formData.append('description', data.descricao);

    formData.append('invoiceNumber', data.num_nota_fiscal);
    formData.append('invoiceValue', data.valor_nota_fiscal);
    formData.append('invoiceDate', data.data_emissao);

    formData.append('typeUnit', data.tipo_unidade);
    formData.append('netWeight', parseFloat(data.peso_liquido.replace(',', '.')));
    formData.append('grossWeight', parseFloat(data.peso_bruto.replace(',', '.')));
    formData.append('height', parseFloat(data.altura.replace(',', '.')));
    formData.append('width', parseFloat(data.largura.replace(',', '.')));

    if (data.link_imagem) formData.append('imageLink', data.link_imagem);
    if (data.link_nota_fiscal) formData.append('invoiceLink', data.link_nota_fiscal);

    if (data.data_emissao) formData.append('date', data.data_emissao);

    const hourObject = {
      hour: "00",
      minute: "00"
    };
    formData.append('hour', JSON.stringify(hourObject));

    if (imagemFile) {
      formData.append('productImage', imagemFile);
    }

    if (opcaoSelecionada === 'pdf' && pdfFile) {
      formData.append('invoicePdf', pdfFile);
    }

    if (opcaoSelecionada === 'jpg' && jpgFile) {
      formData.append('invoiceImage', jpgFile);
    }

    return formData;
  };

  const validateRequiredFields = (data) => {
    const requiredFields = [
      { field: 'tipo_produto', name: 'Tipo de Produto', apiField: 'productTypeId' },
      { field: 'fornecedor', name: 'Fornecedor', apiField: 'supplierId' },
      { field: 'localizacao', name: 'Localização', apiField: 'locationId' },
      { field: 'preco', name: 'Preço', apiField: 'price' },
      { field: 'qtd_itens', name: 'Quantidade', apiField: 'quantity' },
      { field: 'codigo_lote', name: 'SKU/Código do Lote', apiField: 'sku' },
      { field: 'data_fabricacao', name: 'Data de Fabricação', apiField: 'manufactureDate' },
      { field: 'duracao', name: 'Duração', apiField: 'duration' },
      { field: 'data_validade', name: 'Data de Validade', apiField: 'expirationDate' },
      { field: 'descricao', name: 'Descrição', apiField: 'description' },
      { field: 'num_nota_fiscal', name: 'Número da Nota Fiscal', apiField: 'invoiceNumber' },
      { field: 'valor_nota_fiscal', name: 'Valor da Nota Fiscal', apiField: 'invoiceValue' },
      { field: 'data_emissao', name: 'Data de Emissão', apiField: 'invoiceDate' },
      { field: 'tipo_unidade', name: 'Tipo de Unidade', apiField: 'typeUnit' },
      { field: 'peso_liquido', name: 'Peso Líquido', apiField: 'netWeight' },
      { field: 'peso_bruto', name: 'Peso Bruto', apiField: 'grossWeight' },
      { field: 'altura', name: 'Altura', apiField: 'height' },
      { field: 'largura', name: 'Largura', apiField: 'width' },
    ];

    const missingFields = requiredFields.filter(req => !data[req.field] || data[req.field].trim() === '');

    if (!imagemFile && !data.link_imagem) {
      throw new Error('É necessário enviar uma imagem do produto ou fornecer um link');
    }

    if (opcaoSelecionada === 'pdf' && !pdfFile) {
      throw new Error('Por favor, selecione um arquivo PDF');
    }

    if (opcaoSelecionada === 'jpg' && !jpgFile) {
      throw new Error('Por favor, selecione um arquivo JPG');
    }

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(f => f.name).join(', ');
      throw new Error(`Campos obrigatórios não preenchidos: ${fieldNames}`);
    }
  };

  async function submit(data) {
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    try {
      validateRequiredFields(data);

      const formData = createFormData(data);

      console.log('Dados sendo enviados:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch('/api/produtos', {
        method: 'POST',
        body: formData
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setApiSuccess('Produto criado com sucesso!');

      console.log('Produto criado:', result);

      setTimeout(() => {
        router.push('/produtos');
      }, 2000);

    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setApiError(error.message || 'Erro ao enviar dados para a API');
    } finally {
      setLoading(false);
    }
  }
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
        <span>Selecionar imagem</span>
      </div>
    </>
  );

  return (<>
    <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <IoArrowBackCircleSharp style={{ width: "3%", height: "70px", color: "#009E8B" }}
        onClick={() => { router.back() }} />
      <h1 className={styles.header_h1}>Adicionar Produto</h1>
    </CardHeader>

    {/* Alertas de feedback da API */}
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

    <Nav tabs className={styles.navbar}>
      <NavItem>
        <NavLink active={etapa == "informacoes"} onClick={() => { setEtapa("informacoes") }}
          className={styles.navlink}>Informações Gerais</NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={etapa == "fiscais"} onClick={() => { setEtapa("fiscais") }}
          className={styles.navlink}>Dados Fiscais</NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={etapa == "peso"} onClick={() => { setEtapa("peso") }}
          className={styles.navlink}>Peso e dimensões</NavLink>
      </NavItem>
    </Nav>

    <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
      {etapa == "informacoes" && <>
        <Row className="d-flex mt-3">
          <Col sm="4">
            <SeletorImagem />
          </Col>
          <Col sm="8">
            {/* Primeira linha - 3 inputs */}
            <Row className="d-flex mt-3">
              <Col sm="4">
                <InputForm
                  id="categoria"
                  name="categoria"
                  label="Categoria"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                // options={[]}
                />
              </Col>
              <Col sm="4">
                <InputForm
                  id="tipo_produto"
                  name="tipo_produto"
                  label="Tipo de Produto *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                // options={[]}
                />
              </Col>
              <Col sm="4">
                <InputForm
                  id="codigo_lote"
                  name="codigo_lote"
                  label="SKU/Código do Lote *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
            </Row>

            {/* Segunda linha - 3 inputs */}
            <Row className="d-flex mt-3">
              <Col sm="4">
                <InputForm
                  id="qtd_itens"
                  name="qtd_itens"
                  label="Quantidade de Itens *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="number"
                />
              </Col>
              <Col sm="4">
                <InputForm
                  id="fornecedor"
                  name="fornecedor"
                  label="Fornecedor *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                // options={[]}
                />
              </Col>
              <Col sm="4">
                <InputForm
                  id="preco"
                  name="preco"
                  label="Preço *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
            </Row>

            {/* Terceira linha - 2 inputs */}
            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="ncm"
                  name="ncm"
                  label="NCM"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                  options={[]}
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="catmap"
                  name="catmap"
                  label="CATMAP"
                  placeholder=""
                  register={register}
                  required={false}
                  type="text"
                  options={[]}
                />
              </Col>
            </Row>

            {/* Quarta linha - Localização */}
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="localizacao"
                  name="localizacao"
                  label="Localização *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="text"
                // options={[]}
                />
              </Col>
            </Row>

            {/* Quinta linha - 3 inputs */}
            <Row className="d-flex mt-3">
              <Col sm="4">
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
              <Col sm="4">
                <InputForm
                  id="duracao"
                  name="duracao"
                  label="Duração *"
                  placeholder="Em dias"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              <Col sm="4">
                <InputForm
                  id="data_validade"
                  name="data_validade"
                  label="Data de validade *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="date"
                />
              </Col>
            </Row>

            {/* Sexta linha - Descrição */}
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="descricao"
                  name="descricao"
                  label="Descrição *"
                  placeholder=""
                  register={register}
                  required={true}
                  type="textarea"
                />
              </Col>
            </Row>

            {/* Sétima linha - Link da imagem */}
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="link_imagem"
                  name="link_imagem"
                  label="Ou insira o link da imagem"
                  placeholder="https://"
                  register={register}
                  required={false}
                  type="text"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </>}
    </CardBody>

    <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
      {etapa === "fiscais" && (
        <>
          <Row className="d-flex mt-3">
            <Col sm="4">
              <SeletorImagem />
            </Col>
            <Col sm="8">
              {/* Primeira linha - 3 inputs */}
              <Row className="d-flex mt-3">
                <Col sm="4">
                  <InputForm
                    id="num_nota_fiscal"
                    name="num_nota_fiscal"
                    label="Número da Nota Fiscal *"
                    register={register}
                    required={true}
                    type="text"
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="valor_nota_fiscal"
                    name="valor_nota_fiscal"
                    label="Valor Total da Nota Fiscal *"
                    register={register}
                    required={true}
                    type="text"
                    placeholder="0,00"
                  />
                </Col>
                <Col sm="4">
                  <InputForm
                    id="data_emissao"
                    name="data_emissao"
                    label="Data da Emissão *"
                    placeholder=""
                    register={register}
                    required={true}
                    type="date"
                  />
                </Col>
              </Row>

              {/* Segunda linha - Opções de upload */}
              <Row className="d-flex mt-4">
                <Col sm="12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="informar_link_nf"
                        name="opcao_nf"
                        value="link"
                        className="me-2"
                        onChange={handleOpcaoChange}
                        checked={opcaoSelecionada === 'link'}
                      />
                      <label htmlFor="informar_link_nf" className="mb-0">
                        Informar o Link da Nota Fiscal
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="upload_pdf"
                        name="opcao_nf"
                        value="pdf"
                        className="me-2"
                        onChange={handleOpcaoChange}
                        checked={opcaoSelecionada === 'pdf'}
                      />
                      <label htmlFor="upload_pdf" className="mb-0">
                        Fazer Upload em PDF
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="upload_jpg"
                        name="opcao_nf"
                        value="jpg"
                        className="me-2"
                        onChange={handleOpcaoChange}
                        checked={opcaoSelecionada === 'jpg'}
                      />
                      <label htmlFor="upload_jpg" className="mb-0">
                        Fazer Upload em JPG
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Campos condicionais baseados na opção selecionada */}
              {opcaoSelecionada && (
                <Row className="d-flex mt-4">
                  <Col sm="12">
                    {opcaoSelecionada === 'link' && (
                      <div className="mt-3">
                        <label htmlFor="link_nota_fiscal" className="mb-2">
                          Link da Nota Fiscal
                        </label>
                        <input
                          type="text"
                          id="link_nota_fiscal"
                          name="link_nota_fiscal"
                          className="form-control"
                          placeholder="Cole aqui o link da nota fiscal"
                          {...register('link_nota_fiscal')}
                        />
                      </div>
                    )}

                    {opcaoSelecionada === 'pdf' && (
                      <div className="mt-3">
                        <label htmlFor="arquivo_pdf" className="mb-2">
                          Selecionar arquivo PDF
                        </label>
                        <div>
                          <input
                            type="file"
                            ref={fileInputPdfRef}
                            id="arquivo_pdf"
                            name="arquivo_pdf"
                            accept=".pdf"
                            className="form-control d-none"
                            onChange={handlePdfChange}
                          />
                          <button
                            type="button"
                            className="btn btn-light d-flex align-items-center"
                            onClick={() => fileInputPdfRef.current?.click()}
                          >
                            <span className="me-2">📄</span>
                            <span>Clique para selecionar o arquivo</span>
                          </button>
                          {nomeArquivoPdf && (
                            <p className="mt-2 text-muted">Arquivo selecionado: {nomeArquivoPdf}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {opcaoSelecionada === 'jpg' && (
                      <div className="mt-3">
                        <label htmlFor="arquivo_jpg" className="mb-2">
                          Selecionar arquivo JPG
                        </label>
                        <div>
                          <input
                            type="file"
                            ref={fileInputJpgRef}
                            id="arquivo_jpg"
                            name="arquivo_jpg"
                            accept=".jpg,.jpeg"
                            className="form-control d-none"
                            onChange={handleJpgChange}
                          />
                          <button
                            type="button"
                            className="btn btn-light d-flex align-items-center"
                            onClick={() => fileInputJpgRef.current?.click()}
                          >
                            <span className="me-2">📄</span>
                            <span>Clique para selecionar o arquivo</span>
                          </button>
                          {nomeArquivoJpg && (
                            <p className="mt-2 text-muted">Arquivo selecionado: {nomeArquivoJpg}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </>
      )}
    </CardBody>

    <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
      {etapa == "peso" && <>
        <Row className="d-flex mt-3">
          <Col sm="4">
            <SeletorImagem />
          </Col>
          <Col sm="8">
            {/* Primeira linha - Tipo de Unidade */}
            <Row className="d-flex mt-3">
              <Col sm="12">
                <InputForm
                  id="tipo_unidade"
                  name="tipo_unidade"
                  label="Tipo de Unidade *"
                  placeholder="Unidade(Un)"
                  register={register}
                  required={true}
                  type="select"
                  options={[
                    { id: "un", name: "Unidade(Un)" },
                    { id: "kg", name: "Peso Líquido(Kg)" },
                    { id: "cm", name: "Altura(Cm)" }
                  ]}
                />
              </Col>
            </Row>

            {/* Segunda linha - Peso Líquido e Peso Bruto */}
            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="peso_liquido"
                  name="peso_liquido"
                  label="Peso Líquido(KG) *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="peso_bruto"
                  name="peso_bruto"
                  label="Peso Bruto(KG) *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
            </Row>

            {/* Terceira linha - Altura e Largura */}
            <Row className="d-flex mt-3">
              <Col sm="6">
                <InputForm
                  id="altura"
                  name="altura"
                  label="Altura(cm) *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
              <Col sm="6">
                <InputForm
                  id="largura"
                  name="largura"
                  label="Largura(cm) *"
                  placeholder="0,00"
                  register={register}
                  required={true}
                  type="text"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="d-flex mt-4">
          <Col sm="12" className="d-flex justify-content-end">
            <Button
              color="success"
              size="lg"
              onClick={handleSubmit(submit)}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>

            <Button
              color="primary"
              onClick={async () => {
                try {
                  const response = await fetch('http://frota-api.smartdatasolutions.com.br/product', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      productTypeId: "5a6b7c8d-1234-4fgh-90ij-klmnopqrstuv",
                      supplierId: "7b8c9d0e-5678-4abc-defg-hijklmnopqrst",
                      locationId: "9f0a1b2c-3456-4xyz-abcd-efghijklmnop",
                      price: 199.99,
                      quantity: 50,
                      sku: "SKU-TESTE-001",
                      manufactureDate: "2024-12-01",
                      duration: 365,
                      expirationDate: "2025-12-01",
                      description: "Teste simples via JSON",
                      invoiceNumber: "NF123456",
                      invoiceValue: "199.99",
                      invoiceDate: "2024-12-01",
                      typeUnit: "un",
                      netWeight: 5.0,
                      grossWeight: 5.5,
                      height: 20.0,
                      width: 10.0,
                      invoiceLink: "https://exemplo.com/nf.pdf",
                      imageLink: "https://exemplo.com/imagem.jpg",
                      date: "2024-12-01"
                    })
                  });

                  const result = await response.json();
                  console.log("Produto criado com sucesso:", result);
                } catch (err) {
                  console.error("Erro ao enviar JSON:", err);
                }
              }}
            >
              Testar envio JSON
            </Button>


          </Col>
        </Row>
      </>}
    </CardBody>

  </>);
}