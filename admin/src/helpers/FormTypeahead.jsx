import { useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function FormTypeahead({ ...config }) {
   const typeaheadRef = useRef(null);
   const { label, errors, name, col } = config;

   return (
      <Col className="mb-2" {...col} xs={12}>
         <Form.Label htmlFor={normalizeText(label)}>{label}</Form.Label>
         <Typeahead
            ref={typeaheadRef}
            id={normalizeText(label)}
            placeholder="Ketikkan disini..."
            isInvalid={checkIsInvalid(name, errors)}
            {...config}
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
