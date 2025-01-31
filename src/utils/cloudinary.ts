export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mgsyemzd", "mgsyemzd"); // Change this to your Cloudinary preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/mgsyemzd/image/upload", // Change to your Cloudinary cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!data.secure_url) throw new Error("Image upload failed");
  return data.secure_url;
};
