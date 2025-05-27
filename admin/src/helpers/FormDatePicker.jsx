import { FloatingLabel, Form } from "react-bootstrap";

export default function FormDatePicker({ ...config }) {
   const { label, errors, name, value, onChange } = config;

   return (
      <FloatingLabel label={label} className="mb-3" controlId={normalizeText(label)}>
         <Form.Control type="date" placeholder={label} isInvalid={checkIsInvalid(name, errors)} onChange={onChange} value={value} />
         <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </FloatingLabel>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
