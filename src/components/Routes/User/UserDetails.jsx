import React, { useState } from 'react'
const UserDetails = ({
  userInfo,
  isEditMode,
  editValues,
  handleChange,
  handleSave,
  handleCancel,
  handleEdit,
  handleProfile,
  imageUploaded,
  picMessage,
  error,
  postDetails,
  handleImageClick,
  closeModal,
  isModalOpen
}) => {
  

  return (
    <div className="flex justify-center">
      {userInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
          <div className="flex justify-center items-center">
            <img
              src={userInfo?.pic}
              alt="Profile"
              className="w-64 h-64 md:rounded-full object-cover cursor-pointer"
              onClick={handleImageClick}
            />
            {isModalOpen && (
              <div
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <img
                        src={userInfo?.pic}
                        alt="Profile"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="pic " className="font-lexend ">
                        <span className="text-gray-700">Profile Picture:</span>
                      </label>
                      <input
                        type="file"
                        id="pic"
                        name="pic"
                        onChange={(e) => postDetails(e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor="pic"
                        className="border border-[#ff7476] bg-[#ff7476] cursor-pointer font-lexend hover:bg-[]-700 text-white py-1 px-2 m-2 rounded focus:outline-none focus:border-2  focus:border-[#ff7476]"
                      >
                        {imageUploaded
                          ? 'Photo Uploaded Successfully'
                          : 'Choose Photo'}{' '}
                      </label>
                      {picMessage && (
                        <div className="text-red-500 font-lexend">
                          {picMessage}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      {imageUploaded && (
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-700 border mt-2 space-x-4 h-8 text-white font-lexend  font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                          onClick={handleProfile}
                        >
                          Upload Photo
                        </button>
                      )}
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 border mt-2 space-x-4 h-8 text-white font-lexend  font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {isEditMode ? (
              <div>
                {/* Form for editing user info */}
                {/* Name */}
                <div className="mb-4">
                  <label
                    className="block font-lexend text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow font-lexend appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={editValues.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label
                    className="block font-lexend  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow font-lexend  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    value={editValues.email}
                    onChange={handleChange}
                  />
                </div>
                {/* Password */}
                <div className="mb-4">
                  <label
                    className="block font-lexend text-gray-700 text-sm font-bold mb-2"
                    htmlFor="currrentpassword"
                  >
                    Current Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="currentpassword"
                    type="password"
                    value={editValues.currentpassword}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label
                    className="block font-lexend text-gray-700 text-sm font-bold mb-2"
                    htmlFor="newpassword"
                  >
                    New Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="newpassword"
                    type="password"
                    value={editValues.newpassword}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <div className="text-red-500 font-lexend">
                    {error.message || error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 border mt-2 space-x-4 h-8 text-white font-lexend  font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 border mt-2 space-x-4 h-8 text-white font-lexend  font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <p>{userInfo?.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <p>{userInfo?.email}</p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 border mt-2 space-x-4 h-8 text-white font-lexend  font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  type="button"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}

export default UserDetails
