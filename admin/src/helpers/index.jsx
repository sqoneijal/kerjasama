import DropzoneUpload from "./DropzoneUpload";
import { Each } from "./Each";
import FormDatePicker from "./FormDatePicker";
import FormSelect from "./FormSelect";
import FormText from "./FormText";
import FormTextarea from "./FormTextarea";
import FormTypeahead from "./FormTypeahead";
import FormTypeaheadMultiple from "./FormTypeaheadMultiple";
import { handleLogout, initKeycloak } from "./auth";
import { get, post } from "./request";

const decodeJWT = (token) => {
   const parts = token.split(".");
   if (parts.length !== 3) {
      throw new Error("Invalid JWT structure");
   }

   const payload = parts[1];
   const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
   return JSON.parse(decodedPayload);
};

export {
   decodeJWT,
   DropzoneUpload,
   Each,
   FormDatePicker,
   FormSelect,
   FormText,
   FormTextarea,
   FormTypeahead,
   FormTypeaheadMultiple,
   get,
   handleLogout,
   initKeycloak,
   post,
};
