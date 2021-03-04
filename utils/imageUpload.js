import axios from 'axios';

export const imageUpload = async ( images ) =>
{
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET);
    formData.append( "cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME );
    
    const response = await axios.post(process.env.NEXT_PUBLIC_CLOUD_API, formData);

    const data = await response.data;

    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
