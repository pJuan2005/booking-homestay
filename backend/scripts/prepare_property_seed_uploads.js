const fs = require("fs/promises");
const path = require("path");

const projectRoot = path.join(__dirname, "..", "..");
const sqlFilePath = path.join(projectRoot, "backend", "database", "seed_property_assets.sql");
const sourceAssetDir = path.join(projectRoot, "property-asset");
const uploadRootDir = path.join(projectRoot, "backend", "uploads", "properties");

function getSeedImageTargets(sqlContent) {
  const matches = sqlContent.matchAll(
    /\/uploads\/properties\/(\d+)\/(cover|details)\/([^'\s,)]+)/g,
  );
  const uniqueTargets = new Map();

  for (const match of matches) {
    const [, propertyId, imageType, fileName] = match;
    const key = `${propertyId}/${imageType}/${fileName}`;

    if (!uniqueTargets.has(key)) {
      uniqueTargets.set(key, {
        propertyId,
        imageType,
        fileName,
      });
    }
  }

  return [...uniqueTargets.values()];
}

async function copySeedImages(targets) {
  await fs.rm(uploadRootDir, { recursive: true, force: true });

  for (const target of targets) {
    const sourcePath = path.join(sourceAssetDir, target.fileName);
    const destinationPath = path.join(
      uploadRootDir,
      target.propertyId,
      target.imageType,
      target.fileName,
    );

    try {
      await fs.access(sourcePath);
    } catch (_error) {
      throw new Error(`Missing source image: ${target.fileName}`);
    }

    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.copyFile(sourcePath, destinationPath);
  }
}

async function main() {
  const sqlContent = await fs.readFile(sqlFilePath, "utf8");
  const targets = getSeedImageTargets(sqlContent);

  if (targets.length === 0) {
    throw new Error("No upload image targets were found in seed_property_assets.sql.");
  }

  await copySeedImages(targets);

  const coverCount = targets.filter((item) => item.imageType === "cover").length;
  const detailCount = targets.filter((item) => item.imageType === "details").length;

  console.log(`Prepared ${targets.length} property seed images.`);
  console.log(`Cover images: ${coverCount}`);
  console.log(`Detail images: ${detailCount}`);
  console.log(`Output directory: ${uploadRootDir}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
