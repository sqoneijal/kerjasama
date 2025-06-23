import { setModule } from "@/redux";
import { decodeJWT, post } from "@helpers";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";
import { useLayoutEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
moment.locale("id");

export default function Page() {
   const { module, init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridWrapper = useRef(null);
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: decodeJWT(json) }));
      navigate("/implementasi/forms");
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
            const res = await post("/implementasi/hapus", { id }, { headers: { ...init.token } });
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

   useLayoutEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/implementasi/forms",
            },
         })
      );

      const grid = new Grid({
         columns: [
            {
               name: "Kegiatan",
               data: (row) => {
                  return html(
                     `<strong>${row.judul_kegiatan}</strong>
                     <div class="row-actions">
                        <span class="edit"><a href="" id="edit" data-json="${row.jwt}">Edit</a> | </span>
                        <span class="trash"><a href="" id="hapus" data-id="${row.id}">Hapus</a></span>
                     </div>`
                  );
               },
            },
            {
               name: "Mitra",
               data: (row) => {
                  return html(
                     `${row.nama}<br/>${row.nomor_dokumen}<br/><a href="https://drive.google.com/file/d/${row.id_dokumen}/view?usp=drive_link" target="_blank" style="font-size: 12px;">thunder-file_da3e7a72.json</a>`
                  );
               },
            },
            {
               name: "Tanggal Pelaksanaan",
               data: (row) => moment(row.tgl_pelaksanaan).format("DD MMMM YYYY"),
            },
            {
               name: "Status Evaluasi",
               data: (row) => {
                  const statusEvaluasi = {
                     sudah: "Sudah Evaluasi",
                     belum: "Belum Evaluasi",
                  };
                  return statusEvaluasi[row.status_evaluasi];
               },
            },
         ],
         server: {
            url: `${window.apiUrl}/implementasi/getdata`,
            then: (data) => data.results,
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
