import { Col, Form } from "react-bootstrap";
import { Each } from "./Each";

export default function FormSelect({ ...config }) {
   const { label, options, name, errors, onChange, value, col } = config;

   return (
      <Col xs={12} className="mb-2" {...col}>
         <Form.Label htmlFor={normalizeText(label)}>{label}</Form.Label>
         <Form.Select aria-label={label} isInvalid={checkIsInvalid(name, errors)} onChange={onChange} value={value} id={normalizeText(label)}>
            <option value="">--pilih--</option>
            {typeof options !== "undefined" && (
               <Each
                  of={options}
                  render={(row, index) => (
                     <option key={index} value={row.value}>
                        {row.label}
                     </option>
                  )}
               />
            )}
         </Form.Select>
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
