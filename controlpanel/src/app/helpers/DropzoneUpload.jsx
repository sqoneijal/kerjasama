"use client";
import { useRef, useState } from "react";

export default function DropzoneUpload({ onFileSelect }) {
   const fileInputRef = useRef(null);
   const [previewUrl, setPreviewUrl] = useState(null);
   const [fileName, setFileName] = useState("");
   const [fileType, setFileType] = useState("");

   const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) {
         return;
      }

      setFileName(file.name);
      setFileType(file.type);
      if (onFileSelect) onFileSelect(file);

      if (file.type.startsWith("image/")) {
         const reader = new FileReader();
         reader.onloadend = () => setPreviewUrl(reader.result);
         reader.readAsDataURL(file);
         return;
      }

      setPreviewUrl(null);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
         fileInputRef.current.files = e.dataTransfer.files;
         fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
   };

   const handleDragOver = (e) => e.preventDefault();

   const getFileIcon = () => {
      const ext = fileName.split(".").pop().toLowerCase();
      const icons = {
         pdf: "📄",
         doc: "📄",
         docx: "📄",
         zip: "🗜️",
         rar: "🗜️",
         xls: "📊",
         xlsx: "📊",
         txt: "📃",
         default: "📁",
      };
      return icons[ext] || icons.default;
   };

   const fileBox = (fileName) => {
      return (
         <div className="file-box">
            <div className="file-icon">{getFileIcon()}</div>
            <div className="file-label">{fileName}</div>
         </div>
      );
   };

   const dropZonePreview = (previewUrl, fileName) => {
      if (previewUrl) {
         return <img src={previewUrl} alt="Preview" className="img-preview" />;
      } else if (fileName) {
         return fileBox(fileName);
      } else {
         return <p>Klik atau seret file ke sini</p>;
      }
   };

   return (
      <div className="upload-wrapper">
         <input type="file" ref={fileInputRef} className="upload-input" onChange={handleFileChange} accept="*" />

         <div className="upload-dropzone" onClick={() => fileInputRef.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
            {dropZonePreview(previewUrl, fileName)}
            <div className="overlay">Klik untuk ganti file</div>
         </div>

         {fileName && (
            <div className="file-name">
               File: {fileName} ({fileType})
            </div>
         )}

         <style>{`
            .upload-wrapper {
               max-width: 100%;
               margin: 20px auto;
               text-align: center;
            }

            .upload-input {
               display: none;
            }

            .upload-dropzone {
               border: 2px dashed #007bff;
               border-radius: 10px;
               min-height: 250px;
               display: flex;
               align-items: center;
               justify-content: center;
               position: relative;
               cursor: pointer;
               padding: 10px;
               overflow: hidden;
               transition: background 0.3s;
               background-color: #fafafa;
            }

            .upload-dropzone:hover {
               background-color: #f1f9ff;
            }

            .upload-dropzone p {
               margin: 0;
               color: #555;
               font-size: 16px;
            }

            .img-preview {
               max-width: 100%;
               max-height: 100%;
               object-fit: contain;
               border-radius: 8px;
               padding: 5px;
            }

            .overlay {
               position: absolute;
               bottom: 0;
               width: 100%;
               background: rgba(0, 0, 0, 0.5);
               color: #fff;
               text-align: center;
               padding: 8px;
               font-size: 14px;
            }

            .file-box {
               display: flex;
               flex-direction: column;
               align-items: center;
               color: #333;
            }

            .file-icon {
               font-size: 50px;
               margin-bottom: 8px;
            }

            .file-label {
               font-size: 14px;
               word-break: break-all;
               max-width: 90%;
            }

            .file-name {
               margin-top: 10px;
               font-weight: bold;
               font-size: 14px;
               color: #333;
            }

            @media (max-width: 576px) {
               .upload-dropzone {
                  min-height: 200px;
               }
            }
         `}</style>
      </div>
   );
}
