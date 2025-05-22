"use client";

import { post } from "@/app/helpers";
import { setModule } from "@/app/store";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function MitraPage() {
   const { module } = useSelector((e) => e.store);
   const dispatch = useDispatch();
   const gridWrapper = useRef(null);
   const gridRef = useRef(null);
   const router = useRouter();

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: JSON.parse(decodeURIComponent(json)) }));
      router.push("/mitra/forms");
   };

   const reloadGrid = () => {
      if (gridRef.current) {
         gridRef.current.updateConfig({}).forceRender();
      }
   };

   const processDeleteResponse = async (res) => {
      const { data } = res;

      if (!data) {
         toast.error("Respon tidak valid dari server.");
         return;
      }

      if (data.status) {
         toast.success(data.message);
         reloadGrid();
      } else {
         toast.error(data.message);
      }
   };

   const handleDelete = async (id) => {
      try {
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
         }).then(async (result) => {
            if (result.isConfirmed) {
               const res = await post("/mitra/hapus", { id });
               processDeleteResponse(res);
            }
         });
      } catch (err) {
         toast.error(err.message);
      }
   };

   const handleClick = (e) => {
      if (e.target.matches("#edit")) {
         handleEdit(e);
      }

      if (!e.target.matches("#hapus")) {
         return;
      }

      e.preventDefault();
      const id = e.target.dataset.id;
      handleDelete(id);
   };

   const renderTanggalKerjasama = (row) => {
      return row.is_tak_terhingga === "t"
         ? `${moment(row.tanggal_mulai).format("DD/MM/YYYY")} - Tak Terbatas`
         : `${moment(row.tanggal_mulai).format("DD/MM/YYYY")} - ${moment(row.tanggal_berakhir).format("DD/MM/YYYY")}`;
   };

   const renderStatus = (row) => {
      if (row.is_tak_terhingga === "t") {
         return `<span class="badge badge-success">Aktif</span>`;
      }
      console.log(row);
   };

   useLayoutEffect(() => {
      dispatch(
         setModule({
            ...module,
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/mitra/forms",
            },
         })
      );

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const grid = new Grid({
         columns: [
            {
               name: "MoU",
               data: (row) => {
                  const dataJson = row ? encodeURIComponent(JSON.stringify(row)) : "";

                  return html(
                     `<strong>${row.mou}</strong>
                     <div class="row-actions">
                        <span class="edit"><a href="" id="edit" data-json='${dataJson}'>Edit</a> | </span>
                        <span class="trash"><a href="" id="hapus" data-id="${row.id}">Hapus</a></span>
                     </div>`
                  );
               },
            },
            {
               name: "Mitra",
               data: (row) => row.nama_mitra,
            },
            {
               name: "Nomor",
               data: (row) => row.nomor_dokumen,
            },
            {
               name: "Lembaga",
               data: (row) => row.nama_lembaga,
            },
            {
               name: "Tanggal Kerjasama",
               data: (row) => renderTanggalKerjasama(row),
            },
            {
               name: "Status",
               data: (row) => renderStatus(row),
            },
         ],
         server: {
            url: `${apiUrl}/mitra/getdata`,
            then: (data) => data,
            handle: async (res) => {
               if (res.status === 404) return { data: [] };

               const text = await res.text();

               if (text.trim().startsWith("<")) {
                  return { data: [] };
               }

               return JSON.parse(text);
            },
         },
         search: false,
      });

      if (gridWrapper.current) {
         grid.render(gridWrapper.current);
         gridRef.current = grid;
      }

      document.addEventListener("click", handleClick);
      return () => {
         document.removeEventListener("click", handleClick);
         grid.destroy();
      };
   }, []);

   return <div ref={gridWrapper} />;
}
