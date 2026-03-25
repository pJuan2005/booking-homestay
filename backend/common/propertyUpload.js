const fs = require("fs/promises");
const path = require("path");

const ROOT_UPLOAD_DIR = path.join(__dirname, "..", "uploads", "properties");
const URL_PREFIX = "/uploads/properties";

function getFileExtension(originalName) {
  const extension = path.extname(originalName || "").toLowerCase();
  if (extension) {
    return extension;
  }

  return ".jpg";
}

function buildFileName(prefix, originalName) {
  const extension = getFileExtension(originalName);
  const timestamp = Date.now();
  const randomNumber = Math.round(Math.random() * 1e9);
  return `${prefix}-${timestamp}-${randomNumber}${extension}`;
}

function buildDirectoryPath(propertyId, imageType) {
  return path.join(ROOT_UPLOAD_DIR, String(propertyId), imageType);
}

function buildUrlPath(propertyId, imageType, fileName) {
  return path.posix.join(URL_PREFIX, String(propertyId), imageType, fileName);
}

async function saveImageFile(file, propertyId, imageType, prefix) {
  const directoryPath = buildDirectoryPath(propertyId, imageType);
  const fileName = buildFileName(prefix, file.originalname);
  const filePath = path.join(directoryPath, fileName);

  await fs.mkdir(directoryPath, { recursive: true });
  await fs.writeFile(filePath, file.buffer);

  return buildUrlPath(propertyId, imageType, fileName);
}

async function saveFileList(files, propertyId, imageType, prefix) {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const results = [];
  for (const file of files) {
    const url = await saveImageFile(file, propertyId, imageType, prefix);
    results.push(url);
  }

  return results;
}

function isUploadPath(filePath) {
  return typeof filePath === "string" && filePath.startsWith("/uploads/");
}

async function removeManagedFile(filePath) {
  if (!isUploadPath(filePath)) {
    return;
  }

  const relativePath = filePath.replace(/^\/uploads\//, "");
  const absolutePath = path.join(__dirname, "..", relativePath);

  await fs.rm(absolutePath, { force: true });
}

module.exports = {
  saveImageFile,
  saveFileList,
  removeManagedFile,
  isUploadPath,
};
