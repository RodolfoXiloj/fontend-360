import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "tu-bucket-en-google-cloud";
const BASE_URL = `https://storage.googleapis.com/${BUCKET_NAME}`;

export const uploadImageToCloud = async (file: File): Promise<string> => {
  const filename = `${uuidv4()}-${file.name}`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", filename);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  return `${BASE_URL}/${filename}`;
};
