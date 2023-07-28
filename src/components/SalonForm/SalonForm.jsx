import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SalonForm = ({
  salon,
  handleInputChange,
  handleSubmit,
  handleCancel,
  initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData)
  const error = useSelector((state) => state.salon.error)

  useEffect(() => {
    setFormData(initialFormData)
  }, [initialFormData])

  const servicesList = [
    'haircut',
    'coloring',
    'styling',
    'spa',
    'facial',
    'massage',
  ]

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target
    let newArray = [...formData[name]]

    if (checked) {
      newArray.push(value)
    } else {
      newArray = newArray.filter((service) => service !== value)
    }

    // Call handleInputChange function passed from SalonItem component
    handleInputChange({
      target: {
        name,
        value: newArray,
      },
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit(formData)
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        Description:
        <input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label className="flex flex-col">
        Services:
        <div className="flex flex-wrap px-1 mx-1">
          {servicesList.map((service) => (
            <div key={service}>
              <label>
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  className="mx-2"
                  onChange={handleCheckboxChange}
                />
                {service}
              </label>
            </div>
          ))}
        </div>
      </label>
      <label>
        Website:
        <input
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        Phone:
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        Address:
        <input
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        City:
        <input
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        State:
        <input
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>
      <label>
        Zip:
        <input
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
          className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
        />
      </label>

      {/* Rest of the form fields */}
      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        // onClick={handleSubmit}
        className="border space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
      >
        Submit
      </button>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

export default SalonForm
