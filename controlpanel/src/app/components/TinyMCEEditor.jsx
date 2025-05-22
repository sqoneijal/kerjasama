"use client";

import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor({ ...props }) {
   return (
      <Editor
         {...props}
         tinymceScriptSrc="/tinymce/tinymce.min.js"
         licenseKey="gpl"
         init={{
            height: 550,
            menubar: false,
            plugins: [
               "advlist",
               "anchor",
               "autolink",
               "autosave",
               "charmap",
               "code",
               "codesample",
               "directionality",
               "emoticons",
               "fullscreen",
               "help",
               "image",
               "importcss",
               "insertdatetime",
               "link",
               "lists",
               "media",
               "nonbreaking",
               "pagebreak",
               "preview",
               "print",
               "quickbars",
               "save",
               "searchreplace",
               "table",
               "visualblocks",
               "visualchars",
               "wordcount",
            ],
            toolbar:
               "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough |" +
               "forecolor backcolor | alignleft aligncenter alignright alignjustify |" +
               "outdent indent | numlist bullist checklist |" +
               "link image media table | code codesample |" +
               "ltr rtl | blockquote subscript superscript |" +
               "insertdatetime charmap emoticons |" +
               "preview print fullscreen | visualblocks visualchars |" +
               "removeformat formatpainter searchreplace |" +
               "pagebreak anchor | help",
            content_style: 'body { font-family:"Segoe UI", sans-serif; font-size:14px; font-weight:400; }',
         }}
      />
   );
}
