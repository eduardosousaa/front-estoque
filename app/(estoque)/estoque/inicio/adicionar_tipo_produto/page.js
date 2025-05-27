'use client';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, CardHeader, CardBody, Row, Col } from "reactstrap";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import InputForm from "@/components/ElementsUI/InputForm";
import styles from '../inicio.module.css';

export default function CreateTipoProduto() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <CardHeader className={styles.header} style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <IoArrowBackCircleSharp style={{ width: "3%", height: "70px", color: "#009E8B" }}
          onClick={() => router.back()} />
        <h1 className={styles.header_h1}>Cadastrar Tipo de Produto</h1>
      </CardHeader>

      <CardBody style={{ width: "90%", backgroundColor: "#fff" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="d-flex mt-3">
            <Col sm="12">
              <InputForm
                id="nome_tipo_produto"
                name="nome_tipo_produto"
                label="Nome do Tipo de Produto"
                placeholder="Digite o nome do tipo de produto"
                register={register}
                required={true}
                type="text"
              />
            </Col>
          </Row>

          <Row className="d-flex mt-3">
            <Col sm="12">
              <InputForm
                id="categoria"
                name="categoria"
                label="Categoria"
                placeholder="Selecione uma categoria"
                register={register}
                required={true}
                type="select"
                options={[]}
              />
            </Col>
          </Row>

          <Row className="d-flex mt-3">
            <Col sm="12">
              <InputForm
                id="ncm"
                name="ncm"
                label="NCM (códigos de 6 a 8 dígitos)"
                placeholder="Selecione uma categoria primeiro"
                register={register}
                required={false}
                type="text"
              />
            </Col>
          </Row>

          <Row className="d-flex mt-3">
            <Col sm="12">
              <InputForm
                id="catmat"
                name="catmat"
                label="CATMAT (códigos de 6 a 8 dígitos)"
                placeholder="Selecione uma categoria primeiro"
                register={register}
                required={false}
                type="text"
              />
            </Col>
          </Row>

          <Row className="d-flex mt-3">
            <Col sm="4">
              <InputForm
                id="quantidade_estoque"
                name="quantidade_estoque"
                label="Quant. em Estoque"
                placeholder="0"
                register={register}
                required={false}
                type="number"
              />
            </Col>
            <Col sm="4">
              <InputForm
                id="estoque_minimo"
                name="estoque_minimo"
                label="Estoque Mínimo"
                placeholder="0"
                register={register}
                required={false}
                type="number"
              />
            </Col>
            <Col sm="4">
              <InputForm
                id="estoque_maximo"
                name="estoque_maximo"
                label="Estoque Máximo"
                placeholder="0"
                register={register}
                required={false}
                type="number"
              />
            </Col>
          </Row>

          <Row className="d-flex mt-4">
            <Col sm="12" className="d-flex justify-content-end gap-2">
              <Button color="secondary" type="button" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button color="success" type="submit">
                Salvar
              </Button>
            </Col>
          </Row>
        </form>
      </CardBody>
    </>
  );
}
