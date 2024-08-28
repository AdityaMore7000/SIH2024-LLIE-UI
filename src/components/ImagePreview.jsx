import axios from 'axios';
import filePreview from '../assets/file_preview.svg'
const ImagePreview = () => {

  async function downloadImage(){
    try{
      const response = await axios.get("http://localhost:8000/image-processing/download/output_image.jpg", {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'image.jpeg')
      document.body.appendChild(link)
      link.click()
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
    {/* <div className="w-1/2 h-[80%] bg-slate-500 rounded-lg relative flex items-center justify-center">
      <div className=''>
      <img src={filePreview} alt="image preview" className='w-fit m-auto'/>
      <h3 className='text-lg text-center'>Your preview will appear here</h3>
      </div>
    </div>
     */}
    {/* <button className='text-white bg-black p-2 m-2 rounded-lg absolute' onClick={downloadImage}>Download</button> */}
    </>
  )
}

export default ImagePreview