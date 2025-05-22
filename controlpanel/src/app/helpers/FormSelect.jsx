import { Each } from "@/app/Each";
import { FloatingLabel, Form } from "react-bootstrap";

export default function FormSelect({ ...config }) {
   const { label, options, name, errors, onChange, value } = config;

   return (
      <FloatingLabel controlId={normalizeText(label)} label={label} className="mb-3">
         <Form.Select aria-label={label} isInvalid={checkIsInvalid(name, errors)} onChange={onChange} value={value}>
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
      </FloatingLabel>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
