import { setModule } from "@/redux";
import { decodeJWT, post } from "@helpers";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Page = () => {
   const { init, module } = useSelector((e) => e.redux);
   const gridWrapper = useRef(null);
   const dispatch = useDispatch();
   const gridRef = useRef(null);
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/referensi/tindaklanjut/forms",
            },
         })
      );
      return () => {};
   }, []);

   const handleEdit = (e) => {
      e.preventDefault();
      const json = e.target.dataset.json;
      dispatch(setModule({ ...module, pageType: "update", dataUpdate: decodeJWT(json) }));
      navigate("/referensi/tindaklanjut/forms");
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
            const res = await post("/referensi/tindaklanjut/hapus", { id }, { headers: { ...init.token } });
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

   useEffect(() => {
      const grid = new Grid({
         columns: [
            {
               name: "Nama",
               data: (row) => {
                  return html(
                     `<strong>${row.nama}</strong>
                     <div class="row-actions">
                        <span class="edit"><a href="" id="edit" data-json="${row.jwt}">Edit</a> | </span>
                        <span class="trash"><a href="" id="hapus" data-id="${row.id}">Hapus</a></span>
                     </div>`
                  );
               },
            },
            { name: "Keterangan", data: (row) => row.keterangan },
         ],
         server: {
            url: `${window.apiUrl}/referensi/tindaklanjut/getdata`,
            then: (data) => data,
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
};
export default Page;
