'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import {
    Input, Form, Row, Col, Button, CardHeader, CardBody,
    Nav, NavItem, NavLink, Alert, Label, FormGroup
} from 'reactstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FiUpload } from 'react-icons/fi';
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../inicio.module.css';
import styles2 from '../../../../../src/styles/ModalAdicionarProduto.module.css'

/* IMPORTAR CONSTANTES E NOOKIES PARA PEGAR O TOKEN */
import Constantes from '@/Constantes';
import { parseCookies } from 'nookies';

export default function Create() {
    /* OBTÉM O TOKEN2 DOS COOKIES */
    const { "token2": token2 } = parseCookies();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            qtd_itens: 0,
        }
    });

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

    const [productTypes, setProductTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [locations, setLocations] = useState([]);

    const quantidadeItens = watch('qtd_itens');
    const isQuantityZeroOrNull = !quantidadeItens || parseFloat(String(quantidadeItens).replace(',', '.')) <= 0;

    const fetchProductTypes = async () => {
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
                setProductTypes(Array.isArray(data) ? data : data.content || []);
            } else {
                console.error("Erro ao buscar tipos de produto:", response.status, response.statusText);
            }
        } catch (err) {
            console.error('Erro ao buscar tipos de produto:', err);
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
            if (isQuantityZeroOrNull) {
            }
        } catch (err) {
            console.error('Erro ao buscar localizações:', err);
        }
    };

    useEffect(() => {
        if (token2) {
            fetchProductTypes();
            fetchSuppliers();
            fetchLocations();
        }
    }, [token2]);


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

        const product = {
            hour: "00:00:00",
            invoiceValue: parseFloat(String(data.valor_nota_fiscal).replace(',', '.')),
            productTypeId: data.tipo_produto,
            width: parseFloat(String(data.largura).replace(',', '.')),
            supplierId: data.fornecedor,
            invoiceLink: data.link_nota_fiscal || "",
            height: parseFloat(String(data.altura).replace(',', '.')),
            price: parseFloat(String(data.preco).replace(',', '.')),
            quantity: parseInt(data.qtd_itens),
            date: data.data_emissao,
            manufactureDate: data.data_fabricacao,
            locationId: data.localizacao,
            numberBatch: (data.number_batch_input || "").trim(),
            duration: String(parseFloat(String(data.duracao).replace(',', '.')) || 0),
            netWeight: parseFloat(String(data.peso_liquido).replace(',', '.')),
            imageLink: data.link_imagem || "",
            invoiceNumber: data.num_nota_fiscal,
            invoiceDate: data.data_emissao,
            grossWeight: parseFloat(String(data.peso_bruto).replace(',', '.')),
            description: (data.descricao || "").trim(),
            sku: (data.codigo_lote || "").trim(),
            expirationDate: data.data_validade,
            typeUnit: data.tipo_unidade,
        };

        console.log('product JSON:', JSON.stringify(product, null, 2));

        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

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
            // A localização e os campos abaixo serão validados condicionalmente
            // { field: 'localizacao', name: 'Localização', apiField: 'locationId' },
            // { field: 'preco', name: 'Preço', apiField: 'price' },
            // { field: 'qtd_itens', name: 'Quantidade', apiField: 'quantity' },
            // { field: 'codigo_lote', name: 'SKU', apiField: 'sku' },
            // { field: 'number_batch_input', name: 'Número do Lote de Fabricação', apiField: 'numberBatch' },
            // { field: 'data_fabricacao', name: 'Data de Fabricação', apiField: 'manufactureDate' },
            // { field: 'duracao', name: 'Duração', apiField: 'duration' },
            // { field: 'data_validade', name: 'Data de Validade', apiField: 'expirationDate' },
            { field: 'descricao', name: 'Descrição', apiField: 'description' },
            // { field: 'num_nota_fiscal', name: 'Número da Nota Fiscal', apiField: 'invoiceNumber' },
            // { field: 'valor_nota_fiscal', name: 'Valor da Nota Fiscal', apiField: 'invoiceValue' },
            // { field: 'data_emissao', name: 'Data de Emissão', apiField: 'invoiceDate' },
            { field: 'tipo_unidade', name: 'Tipo de Unidade', apiField: 'typeUnit' },
            { field: 'peso_liquido', name: 'Peso Líquido', apiField: 'netWeight' },
            { field: 'peso_bruto', name: 'Peso Bruto', apiField: 'grossWeight' },
            { field: 'altura', name: 'Altura', apiField: 'height' },
            { field: 'largura', name: 'Largura', apiField: 'width' },
        ];

        if (!isQuantityZeroOrNull) {
            requiredFields.push(
                { field: 'localizacao', name: 'Localização', apiField: 'locationId' },
                { field: 'preco', name: 'Preço', apiField: 'price' },
                { field: 'codigo_lote', name: 'SKU', apiField: 'sku' },
                { field: 'number_batch_input', name: 'Número do Lote de Fabricação', apiField: 'numberBatch' },
                { field: 'data_fabricacao', name: 'Data de Fabricação', apiField: 'manufactureDate' },
                { field: 'duracao', name: 'Duração', apiField: 'duration' },
                { field: 'data_validade', name: 'Data de Validade', apiField: 'expirationDate' },
                { field: 'num_nota_fiscal', name: 'Número da Nota Fiscal', apiField: 'invoiceNumber' },
                { field: 'valor_nota_fiscal', name: 'Valor da Nota Fiscal', apiField: 'invoiceValue' },
                { field: 'data_emissao', name: 'Data de Emissão', apiField: 'invoiceDate' },
            );
        }

        const missingFields = requiredFields.filter(req => !data[req.field] || String(data[req.field]).trim() === '');

        if (!imagemFile && !data.link_imagem) {
            throw new Error('É necessário enviar uma imagem do produto ou fornecer um link');
        }

        if (!isQuantityZeroOrNull) {
            if (opcaoSelecionada === 'pdf' && !pdfFile && !data.link_nota_fiscal) {
                throw new Error('Por favor, selecione um arquivo PDF ou forneça um link da nota fiscal');
            }
            if (opcaoSelecionada === 'jpg' && !jpgFile && !data.link_nota_fiscal) {
                throw new Error('Por favor, selecione um arquivo JPG ou forneça um link da nota fiscal');
            }
            if (opcaoSelecionada === 'link' && !data.link_nota_fiscal) {
                throw new Error('Por favor, forneça o link da nota fiscal');
            }
        }

        if (isQuantityZeroOrNull) {
            setValue('codigo_lote', '');
            setValue('preco', '');
            setValue('data_fabricacao', '');
            setValue('duracao', '');
            setValue('data_validade', '');
            setValue('localizacao', '');
            setValue('num_nota_fiscal', '');
            setValue('valor_nota_fiscal', '');
            setValue('data_emissao', '');
            setValue('link_nota_fiscal', '');
            setPdfFile(null);
            setJpgFile(null);
            setNomeArquivoPdf('');
            setNomeArquivoJpg('');
            setOpcaoSelecionada('');
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

            console.log('Dados sendo enviados (FormData):');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const endpointUrl = Constantes.url + '/product';
            console.log('Endpoint da API para criação de produto:', endpointUrl);

            const response = await fetch(endpointUrl, {
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

            setApiSuccess(result.message || 'Produto criado com sucesso!');

            console.log('Produto criado:', result);

            setTimeout(() => {
                router.push('/estoque/inicio');
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
                    className={styles.navlink}
                    disabled={isQuantityZeroOrNull}
                >Dados Fiscais</NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={etapa == "peso"} onClick={() => { setEtapa("peso") }}
                    className={styles.navlink}
                    disabled={isQuantityZeroOrNull}
                >Peso e dimensões</NavLink>
            </NavItem>
        </Nav>

        <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
            {etapa === "informacoes" && <>
                <Row className="d-flex mt-3">
                    <Col sm="4">
                        <SeletorImagem />
                    </Col>
                    <Col sm="8">
                        {/* Primeira linha - 3 inputs */}
                        <Row className="d-flex mt-3">
                            <Col sm="4">
                                <InputForm
                                    id="tipo_produto"
                                    name="tipo_produto"
                                    label="Tipo de Produto *"
                                    placeholder=""
                                    register={register}
                                    required={true}
                                    type="select"
                                    options={productTypes.map(type => ({ id: type.id, name: type.name }))}
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
                                    type="select"
                                    options={suppliers.map(supplier => ({ id: supplier.id, name: supplier.name }))}
                                />
                            </Col>
                            <Col sm="4">
                                <InputForm
                                    id="codigo_lote"
                                    name="codigo_lote"
                                    label="SKU *"
                                    placeholder=""
                                    register={register}
                                    required={true}
                                    type="text"
                                    disabled={isQuantityZeroOrNull}
                                />
                            </Col>
                        </Row>

                        {/* Segunda linha - 3 inputs */}
                        <Row className="d-flex mt-3">
                            <Col sm="4">
                                <InputForm
                                    id="number_batch_input"
                                    name="number_batch_input"
                                    label="Número do Lote de Fabricação *"
                                    placeholder=""
                                    register={register}
                                    required={true}
                                    type="text"
                                    disabled={isQuantityZeroOrNull}
                                />
                            </Col>
                            <Col sm="4">
                                <InputForm
                                    id="qtd_itens"
                                    name="qtd_itens"
                                    label="Quantidade de Itens *"
                                    placeholder=""
                                    register={register}
                                    required={true}
                                    type="number"
                                    onChange={(e) => {
                                        setValue('qtd_itens', e.target.value);
                                    }}
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
                                    disabled={isQuantityZeroOrNull}
                                />
                            </Col>
                        </Row>

                        {/* Terceira linha - NCM, CATMAT, Localização */}
                        <Row className="d-flex mt-3">
                            <Col sm="4">
                                <InputForm
                                    id="ncm"
                                    name="ncm"
                                    label="NCM"
                                    placeholder=""
                                    register={register}
                                    required={false}
                                    type="text"
                                />
                            </Col>
                            <Col sm="4">
                                <InputForm
                                    id="catmat"
                                    name="catmat"
                                    label="CATMAT"
                                    placeholder=""
                                    register={register}
                                    required={false}
                                    type="text"
                                />
                            </Col>
                            <Col sm="4">
                                <InputForm
                                    id="localizacao"
                                    name="localizacao"
                                    label="Localização *"
                                    placeholder=""
                                    register={register}
                                    required={true}
                                    type="select"
                                    options={locations.map(loc => ({ id: loc.id, name: loc.name }))}
                                    disabled={isQuantityZeroOrNull}
                                />
                            </Col>
                        </Row>

                        {/* Quarta linha - Datas e Duração */}
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
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
                                />
                            </Col>
                        </Row>

                        {/* Quinta linha - Descrição */}
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

                        {/* Sexta linha - Link da imagem */}
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
                                        disabled={isQuantityZeroOrNull}
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
                                        disabled={isQuantityZeroOrNull}
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
                                        disabled={isQuantityZeroOrNull}
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
                                                disabled={isQuantityZeroOrNull}
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
                                                disabled={isQuantityZeroOrNull}
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
                                                disabled={isQuantityZeroOrNull}
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
                                                    disabled={isQuantityZeroOrNull}
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
                                                        disabled={isQuantityZeroOrNull}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-light d-flex align-items-center"
                                                        onClick={() => fileInputPdfRef.current?.click()}
                                                        disabled={isQuantityZeroOrNull}
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
                                                        disabled={isQuantityZeroOrNull}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-light d-flex align-items-center"
                                                        onClick={() => fileInputJpgRef.current?.click()}
                                                        disabled={isQuantityZeroOrNull}
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
            {etapa === "peso" && <>
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
                                        { id: "UNIT", name: "Unidade(Un)" },
                                        { id: "NET_WEIGHT", name: "Peso Líquido(Kg)" },
                                        { id: "HEIGHT", name: "Altura(Cm)" }
                                    ]}
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
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
                                    disabled={isQuantityZeroOrNull}
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
                            disabled={loading || isQuantityZeroOrNull}
                        >
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Button>

                    </Col>
                </Row>
            </>}
        </CardBody>

    </>);
}