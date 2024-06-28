const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce");

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await dataResponse.json();
  console.log(data);
  return data;
};

export default uploadImage;
