import { FormGroup, Label, Input } from "reactstrap";

export default function InputForm({ id, name, label, register, required, placeholder, onChange, type, options, errors }) {

  const { ref, ...registerField } = register(`${name}`,
    {
      required: required || false,
      onChange: onChange || null
    })

  function checkSubErrors() {
    if (errors) {
      if (name.includes(".") && !name.includes("[") && !name.includes("]")) {
        let splitArray = name.split(".");
        let object = errors;
        for (let x = 0; x < splitArray.length; x++) {
          for (const [key, value] of Object.entries(object)) {
            if (key == splitArray[x]) {
              object = value;

              if (x == splitArray.length - 1) {
                return <><div style={{ color: "red", fontWeight: "300" }}>{object.message || "Campo Obrigatório"}</div><br /></>;
              }
              break;
            }
          }
        }
      } else if (name.includes("[") && name.includes("]")) {
        let name1 = name.split("[")[0];
        let index = (name.split("[")[1]).split("]")[0];
        let name2 = name.split(".")[1];

        if (errors?.[name1]?.[index]?.[name2])
          return <><div style={{ color: "red", fontWeight: "300" }}>{errors[name1][index][name2].message || "Campo Obrigatório"}</div><br /></>;
      }
    }
  }

  return (
    <FormGroup style={{ width: "100%" }}>
      {label ? <Label style={{ height: "25px", fontSize: "18px" }}
        for={id}>
        {label}
      </Label> : null}
      {type === "select" ? (
        <Input
          type="select"
          id={id}
          name={name}
          innerRef={ref}
          {...registerField}
          style={{ height: "50px" }}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Input>
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          innerRef={ref}
          {...registerField}
          style={{ height: "50px" }}
        />
      )}


      {name.includes(".") || (name.includes("[") && name.includes("]")) ?
        checkSubErrors() :
        errors?.[name] && <div style={{ color: "red", fontWeight: "300" }}>{errors[name].message || "Campo Obrigatório"}</div>}
    </FormGroup>
  )
}