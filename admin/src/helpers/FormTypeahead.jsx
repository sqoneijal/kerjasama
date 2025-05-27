import { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Hint, Typeahead } from "react-bootstrap-typeahead";

export default function FormTypeahead({ ...config }) {
   const typeaheadRef = useRef(null);
   const { label, errors, name } = config;

   return (
      <Typeahead
         ref={typeaheadRef}
         id={normalizeText(label)}
         placeholder={label}
         renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
            const { placeholder, value, onChange } = inputProps;

            return (
               <Hint>
                  <FloatingLabel controlId={inputProps.id} label={inputProps.placeholder} className="form-label mb-3" style={{ width: "100%" }}>
                     <Form.Control
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        ref={(node) => {
                           inputRef(node);
                           referenceElementRef(node);
                        }}
                        isInvalid={checkIsInvalid(name, errors)}
                        onClick={() => typeaheadRef.current?.toggleMenu()}
                     />
                     <Form.Label htmlFor={inputProps.id}>{inputProps.placeholder}</Form.Label>
                     <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
                  </FloatingLabel>
               </Hint>
            );
         }}
         {...config}
      />
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
