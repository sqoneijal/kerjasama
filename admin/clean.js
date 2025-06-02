const fs = require("fs");
const path = require("path");

const bundlePath = path.resolve(__dirname, "bundle");
const exclude = ["tinymce"];

// Cek apakah folder bundle ada
if (!fs.existsSync(bundlePath)) {
   console.log("Folder 'bundle' belum ada, tidak ada yang perlu dihapus.");
   process.exit(0);
}

// Hapus semua isi dalam folder bundle, kecuali folder yang di-exclude
fs.readdirSync(bundlePath).forEach((file) => {
   if (!exclude.includes(file)) {
      const target = path.join(bundlePath, file);
      fs.rmSync(target, { recursive: true, force: true });
      console.log(`Deleted: ${target}`);
   }
});
