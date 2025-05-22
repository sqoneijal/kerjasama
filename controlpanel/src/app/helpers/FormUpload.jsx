import { FloatingLabel, Form } from "react-bootstrap";

export default function FormUpload({ ...config }) {
   const { label } = config;

   return (
      <FloatingLabel label={label} className="mb-3" controlId={normalizeText(config.name)}>
         <Form.Control
            type="file"
            placeholder={label}
            isInvalid={checkIsInvalid(config.name, config.errors)}
            onChange={config.onChange}
            value={config.value}
         />
         <Form.Control.Feedback type="invalid">{config.errors[config.name]}</Form.Control.Feedback>
      </FloatingLabel>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
