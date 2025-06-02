import { setModule } from "@/redux";
import { post } from "@helpers";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useLayoutEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Page() {
   const { module, init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridWrapper = useRef(null);
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: JSON.parse(decodeURIComponent(json)) }));
      navigate("/referensi/layanan/forms");
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
            const res = await post("/referensi/layanan/hapus", { id }, { headers: { ...init.token } });
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
               href: "/referensi/layanan/forms",
            },
         })
      );

      const grid = new Grid({
         columns: [
            {
               name: "Nama Layanan",
               data: (row) => {
                  return html(
                     `<strong>${row.nama}</strong>
                     <div class="row-actions">
                        <span class="edit"><a href="" id="edit" data-json='${encodeURIComponent(JSON.stringify(row))}'>Edit</a> | </span>
                        <span class="trash"><a href="" id="hapus" data-id="${row.id}">Hapus</a></span>
                     </div>`
                  );
               },
            },
            {
               name: "Keterangan",
               data: (row) => row.keterangan,
            },
         ],
         server: {
            url: `${window.apiUrl}/referensi/layanan/getdata`,
            then: (data) => data,
            handle: async (res) => {
               if (res.status === 404) return { data: [] };

               const text = await res.text();

               if (text.trim().startsWith("<")) {
                  return { data: [] };
               }

               return JSON.parse(text);
            },
            headers: { ...init.token },
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
