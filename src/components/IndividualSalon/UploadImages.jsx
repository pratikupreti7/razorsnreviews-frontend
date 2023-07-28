import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const expandedImageStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '9999',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const expandedImageInnerStyles = {
  maxWidth: '90%',
  maxHeight: '90%',
}

const UploadImages = ({ existingImages, salonId }) => {
  const [images, setImages] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [imageUrls, setImageUrls] = useState([])
  const authTokens = useSelector((state) => state?.user?.userInfo?.token) || ''

  useEffect(() => {
    if (existingImages.length > 0) {
      setImages(existingImages)
      setImageUrls(existingImages)
    }
  }, [existingImages])

  const handleImageUpload = async (event) => {
    const fileList = event.target.files
    const maxImages = 6

    if (imageUrls.length + fileList.length > maxImages) {
      setErrorMessage(`You can only upload up to ${maxImages} images.`)
      return
    }

    setErrorMessage('')

    const uploadedImages = []
    const uploadPromises = []

    for (let i = 0; i < fileList.length; i++) {
      const image = fileList[i]
      try {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'razorNreviews')
        formData.append('cloud_name', 'razornreviews')

        const uploadPromise = axios
          .post(
            'https://api.cloudinary.com/v1_1/razornreviews/image/upload',
            formData,
          )
          .then((response) => {
            const imageUrl = response.data.secure_url
            uploadedImages.push(imageUrl)
          })
          .catch((error) => {
            console.error('Error uploading image:', error)
            // Handle the error if the image upload fails
          })

        uploadPromises.push(uploadPromise)
      } catch (error) {
        console.error('Error uploading image:', error)
        // Handle the error if the image upload fails
      }
    }

    Promise.all(uploadPromises).then(() => {
      setImages((prevImages) => [...prevImages, ...fileList])
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedImages])

      if (imageUrls.length + uploadedImages.length >= maxImages) {
        document.getElementById('upload').disabled = true
      }
    })
  }

  const handleImageRemove = (index, event) => {
    event.stopPropagation()
    setImages((prevImages) => {
      const newImages = [...prevImages]
      newImages.splice(index, 1)
      return newImages
    })

    setImageUrls((prevUrls) => {
      const newUrls = [...prevUrls]
      newUrls.splice(index, 1)
      return newUrls
    })

    if (images.length === 6) {
      document.getElementById('upload').disabled = false
    }
  }

  const handleUploadAll = () => {
    if (imageUrls.length > 0) {
      const authToken = authTokens
      console.log(authTokens)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      }

      axios
        .put(`/api/salon/${salonId}/add-image`, { imageUrls }, config)
        .then((response) => {
          toast.success('Images added successfully')
          setTimeout(() => {
            window.location.reload()
          }, 5000)

          // Perform any additional actions or updates after successful image upload
        })
        .catch((error) => {
          toast.error('Failed to add images')
          console.error('Error uploading images:', error)

          // Handle the error if the image upload fails
        })
    } else {
      console.log('No images to upload')
    }
  }

  const expandImage = (index, event) => {
    const imageUrl = imageUrls[index]

    // Check if the click target is the delete button
    if (event.target.classList.contains('delete-button')) {
      return
    }

    const expandedImage = document.createElement('div')
    Object.assign(expandedImage.style, expandedImageStyles)

    const imageElement = document.createElement('img')
    imageElement.src = imageUrl
    imageElement.alt = ''
    Object.assign(imageElement.style, expandedImageInnerStyles)
    expandedImage.appendChild(imageElement)

    document.body.appendChild(expandedImage)
    document.body.classList.add('overflow-hidden')

    expandedImage.addEventListener('click', () => {
      document.body.removeChild(expandedImage)
      document.body.classList.remove('overflow-hidden')
    })
  }
  //   const [addSuccessImage, setaddSuccessImage] = useState(false)
  //   useEffect(() => {
  //     if (addSuccessImage) {
  //       const timer = setTimeout(() => {
  //         window.location.reload() // Reload the page after 3 seconds
  //       }, 5000)
  //       setaddSuccessImage(false)
  //       return () => clearTimeout(timer) // Clean up the timer on unmounting
  //     }
  //   }, [addSuccessImage])
  useEffect(() => {
    setImages(existingImages)
    setImageUrls(existingImages)
  }, [existingImages, salonId])

  return (
    <div className="container mx-auto py-10 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-lily">
          Upload Images of Your Salon
        </h2>
        <p className="text-gray-500">
          Show off your beautiful salon! Upload some cool images.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <label
          htmlFor="upload"
          className={`px-4 py-2 text-white ${
            images.length === 6
              ? 'bg-gray-400 cursor-not-allowed '
              : 'bg-blue-500'
          } rounded cursor-pointer hover:bg-blue-600 transition-colors duration-200`}
        >
          {images.length > 0 ? 'Add More Images' : 'Choose Images'}
          <input
            id="upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            disabled={images.length === 6}
          />
        </label>
        {images.length > 0 && (
          <button
            className="px-4 py-2 ml-4 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-200"
            onClick={handleUploadAll}
          >
            Upload Selected Images
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-shadow duration-200"
            onClick={(event) => expandImage(index, event)}
          >
            <img
              src={imageUrl}
              alt=""
              className="object-cover w-full h-40 md:h-28"
            />
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={(event) => handleImageRemove(index, event)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.35 14.35a1 1 0 01-1.42 0L10 11.41l-2.93 2.93a1 1 0 01-1.42-1.42L8.59 10 5.66 7.07a1 1 0 011.42-1.42L10 8.59l2.93-2.93a1 1 0 011.42 1.42L11.41 10l2.93 2.93a1 1 0 010 1.42z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}

        {images.length < 6 && (
          <label
            htmlFor="upload"
            className={`relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer ${
              images.length === 6
                ? 'bg-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
          >
            <input
              id="upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={images.length === 6}
            />
            <div className="flex items-center justify-center  h-40 md:h-28">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a7 7 0 017 7v4a1 1 0 01-1 1h-1.586l-.707-.707A5.965 5.965 0 0010 15a5.965 5.965 0 00-4.707 2.293L4.586 18H3a1 1 0 01-1-1v-4a7 7 0 017-7zm-1 8a3 3 0 110-6 3 3 0 010 6zm1-9a8 8 0 100 16 8 8 0 000-16z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="block mt-2 text-sm text-gray-500">
                Add Image
              </span>
            </div>
          </label>
        )}
      </div>

      {images.length === 6 && (
        <div className="text-center mt-4 text-gray-500">
          Maximum number of images reached.
        </div>
      )}
    </div>
  )
}

export default UploadImages
