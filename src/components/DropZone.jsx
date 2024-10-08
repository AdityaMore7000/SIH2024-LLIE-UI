import axios from "axios";
import { useState, useRef, useEffect } from "react";

function DropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Cleanup object URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
      console.log(images)
    };
  }, [images]);

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(file =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      alert("Please select only image files.");
      return;
    }

    const imagePreviews = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prevImages => [...prevImages, ...imagePreviews]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    handleFiles(event.target.files);
  };

  const uploadImage = async () => {
    if (images.length === 0) {
      alert("No images selected for upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", images[0].file);  // Append the file with the key "file"
  
    try {
      const response = await axios.post("http://localhost:8000/image-processing/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure the header is set for file uploads
        },
      });
      alert("Image uploaded successfully!");
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };
  
  return (
    <div className=" w-[50vw] mx-auto px-2">
      <div
        className={`relative w-full h-[80%] border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
          ${isDragging ? 'bg-blue-500 border-blue-400' : 'bg-[#212121] border-gray-500'}
          ${images.length > 0 ? 'bg-gray-800' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center h-full text-center">
          <img
            src="upload_logo.svg"
            alt="Upload"
            className="w-16 h-16 mb-4"
          />
          <p className="text-gray-300 text-lg">
            {isDragging
              ? "Release to upload your image"
              : "Drag & drop an image here or click to browse"}
          </p>
        </div>
      </div>

      {/* {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group h-48">
              <img
                src={image.preview}
                alt={`Upload Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() =>
                  setImages(images.filter((_, i) => i !== index))
                }
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-lg transition-colors duration-200"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )} */}
      <div className="flex gap-2 justify-center flex-row">
      <button className="text-white bg-black p-2 rounded-lg m-2" onClick={uploadImage}>Upload</button>
      <button className='text-white bg-black p-2 m-2 rounded-lg' onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}

export default DropZone;
