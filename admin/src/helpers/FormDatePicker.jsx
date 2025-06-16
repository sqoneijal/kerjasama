import { Col, Form } from "react-bootstrap";

export default function FormDatePicker({ ...config }) {
   const { label, errors, name, value, onChange, col } = config;

   return (
      <Col xs={12} className="mb-2" {...col}>
         <Form.Label htmlFor={normalizeText(label)}>{label}</Form.Label>
         <Form.Control
            type="date"
            placeholder={label}
            isInvalid={checkIsInvalid(name, errors)}
            onChange={onChange}
            value={value}
            id={normalizeText(label)}
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
