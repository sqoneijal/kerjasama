import { Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function FormTypeaheadMultiple({ ...config }) {
   const { label, col, name, errors } = config;

   return (
      <Col xs={12} {...col} className="mb-2">
         <Form.Label htmlFor={normalizeText(label)} className="fst-normal">
            {label}
         </Form.Label>
         <Typeahead id={normalizeText(label)} placeholder="Ketikkan disini..." {...config} isInvalid={checkIsInvalid(name, errors)} />
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
