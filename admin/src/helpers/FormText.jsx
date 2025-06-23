import { Col, Form } from "react-bootstrap";

export default function FormText({ ...config }) {
   const { label, name, errors, value, onChange, col } = config;

   return (
      <Col xs={12} className="mb-2" {...col}>
         <Form.Label htmlFor={normalizeText(name)}>{label}</Form.Label>
         <Form.Control
            id={normalizeText(name)}
            type="text"
            placeholder="Ketikkan disini..."
            isInvalid={checkIsInvalid(name, errors)}
            onChange={onChange}
            value={value}
         />
         <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </Col>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
