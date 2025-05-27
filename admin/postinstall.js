import fse from "fs-extra";
import path from "path";
const topDir = import.meta.dirname;
fse.emptyDirSync(path.join(topDir, "bundle", "tinymce"));
fse.copySync(path.join(topDir, "node_modules", "tinymce"), path.join(topDir, "bundle", "tinymce"), { overwrite: true });
