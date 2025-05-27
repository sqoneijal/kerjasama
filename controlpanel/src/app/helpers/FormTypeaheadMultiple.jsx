import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function FormTypeaheadMultiple({ ...config }) {
   const { label } = config;

   return <Typeahead id={normalizeText(label)} placeholder="Ketikkan sesuatu disini..." {...config} />;
}

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
