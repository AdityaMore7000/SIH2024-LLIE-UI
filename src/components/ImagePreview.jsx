import filePreview from '../assets/file_preview.svg'
const ImagePreview = () => {
  return (
    <div className="w-1/2 h-[80%] bg-slate-500 rounded-lg relative flex items-center justify-center">
      <div className=''>
      <img src={filePreview} alt="image preview" className='w-fit m-auto'/>
      <h3 className='text-lg text-center'>Your preview will appear here</h3>
      </div>
    </div>
  )
}

export default ImagePreview