import { Col, Form } from "react-bootstrap";

export default function FormTextarea({ ...config }) {
   const { label, name, errors, value, onChange, col } = config;

   return (
      <Col xs={12} className="mb-2" {...col}>
         <Form.Label htmlFor={normalizeText(name)}>{label}</Form.Label>
         <Form.Control
            as="textarea"
            style={{ height: 100 }}
            isInvalid={checkIsInvalid(name, errors)}
            onChange={onChange}
            value={value}
            placeholder="Ketikkan disini..."
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
