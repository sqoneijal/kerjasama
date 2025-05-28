import { setModule } from "@/redux";
import { post } from "@helpers";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useLayoutEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Page() {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridWrapper = useRef(null);
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: JSON.parse(decodeURIComponent(json)) }));
      navigate("/berita/luarnegeri/forms");
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
               const res = await post("/berita/luarnegeri/hapus", { id });
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

   const renderKategori = (obj) => {
      if (obj) {
         const data = JSON.parse(obj);
         const html = [];
         if (data) {
            data.forEach((row) => {
               html.push(`<a href="/kategori/${row.slug}" target="_blank">${row.nama}</a>`);
            });
         }
         return html.join(", ");
      }
      return "";
   };

   const renderTags = (obj) => {
      if (obj) {
         const data = JSON.parse(obj);
         const html = [];
         if (data) {
            data.forEach((row) => {
               html.push(`<a href="/tags/${row.slug}" target="_blank">${row.nama}</a>`);
            });
         }
         return html.join(", ");
      }
      return "";
   };

   useLayoutEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/berita/luarnegeri/forms",
            },
         })
      );

      const grid = new Grid({
         columns: [
            {
               name: "Judul",
               data: (row) => {
                  const dataJson = row ? encodeURIComponent(JSON.stringify(row)) : "";

                  return html(
                     `<a href="/berita/read/${row.slug}" target="_blank"><strong>${row.judul}</strong></a>
                     <div class="row-actions">
                        <span class="edit"><a href="#" id="edit" data-json='${dataJson}'>Edit</a> | </span>
                        <span class="trash"><a href="#" id="hapus" data-id="${row.id}">Hapus</a></span>
                     </div>`
                  );
               },
            },
            {
               name: "Kategori",
               data: (row) => html(renderKategori(row.kategori)),
            },
            {
               name: "Tags",
               data: (row) => html(renderTags(row.tags)),
            },
         ],
         server: {
            url: `${window.apiUrl}/berita/luarnegeri/getdata`,
            then: (data) => data.results,
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
