import { setModule } from "@/redux";
import { post } from "@helpers";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment/moment";
import { useLayoutEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function MitraPage() {
   const { module, init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridWrapper = useRef(null);
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: JSON.parse(decodeURIComponent(json)) }));
      navigate("/mitra/forms");
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
            const res = await post("/mitra/hapus", { id }, { headers: { ...init.token } });
            processDeleteResponse(res);
         }
      });
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
         return `Masih Berjalan`;
      }

      const awal = moment(row.tanggal_mulai);
      const akhir = moment(row.tanggal_berakhir);

      const diff = akhir.diff(awal, "days");
      if (diff < 0) {
         return `Sudah Berakhir`;
      } else if (diff <= 30) {
         return `Akan Berakhir ${diff} Hari Lagi`;
      } else {
         return `Masih Berjalan`;
      }
   };

   const renderNomor = (row) => {
      return `
         ${row.nomor_dokumen}
         ${
            row.nama_dokumen
               ? `<br /><a href="https://drive.google.com/file/d/${row.id_dokumen}/view?usp=drive_link" target="_blank" style="font-size: 12px;">${row.nama_dokumen}</a>`
               : ""
         }
         `;
   };

   useLayoutEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/mitra/forms",
            },
         })
      );

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
               data: (row) => html(renderNomor(row)),
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
            url: `${window.apiUrl}/mitra/getdata`,
            then: (data) => data.result,
            total: (data) => data.total,
            headers: { ...init.token },
         },
         search: {
            server: {
               url: (prev, keyword) => {
                  const separator = prev.includes("?") ? "&" : "?";
                  return `${prev}${separator}search=${keyword}`;
               },
               headers: { ...init.token },
            },
         },
         pagination: {
            limit: 10,
            server: {
               url: (prev, page, limit) => {
                  const separator = prev.includes("?") ? "&" : "?";
                  return `${prev}${separator}limit=${limit}&offset=${page * limit}`;
               },
               headers: { ...init.token },
            },
         },
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
