import React from 'react'
import { Formik, Form, Field } from 'formik'
import './slider.css'
const Filters = ({
  filterValues,
  handleChange,
  handleSliderChange,
  clearFilter,
}) => {
  return (
    <div className="rounded-lg p-4 bg-white h-fit mt-2 mr-2 md:flex-col">
      <h3 className="text-3xl font-semibold mb-2 text-gray-700 font-lily space-x-2">
        Filters
      </h3>
      <Formik
        initialValues={filterValues}
        onSubmit={(values) => {
          // Update parent state with filter values
          for (const [filterName, filterValue] of Object.entries(values)) {
            handleChange(filterName, filterValue)
          }
        }}
      >
        {({ values, handleSubmit, resetForm, dirty }) => (
          <Form onSubmit={handleSubmit}>
            {/* Rest of the code */}
            <div>
              <h4 className="text-gray-700 font-semibold font-lexend mb-2">
                Services
              </h4>
              <ul className="text-white space-y-1">
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="haircut"
                      className="mr-2"
                    />
                    Haircut
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="coloring"
                      className="mr-2"
                    />
                    Coloring
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="styling"
                      className="mr-2"
                    />
                    Styling
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="spa"
                      className="mr-2"
                    />
                    Spa
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="Massage"
                      className="mr-2"
                    />
                    Massage
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="services"
                      value="Facials"
                      className="mr-2"
                    />
                    Facials
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-lexend text-gray-700 mb-2">
                Rating
              </h4>
              <ul className="text-white space-y-1">
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="5"
                      className="mr-2"
                    />
                    5 stars
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="4"
                      className="mr-2"
                    />
                    4 stars & up
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="3"
                      className="mr-2"
                    />
                    3 stars & up
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="2"
                      className="mr-2"
                    />
                    2 stars & up
                  </label>
                </li>
                <li>
                  <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="1"
                      className="mr-2"
                    />
                    1 star & up
                  </label>
                </li>
                <li>
                  {/* <label className="font-lexend text-gray-700">
                    <Field
                      type="checkbox"
                      name="ratings"
                      value="not-rated"
                      className="mr-2"
                    />
                    Not Yet Rated
                  </label> */}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold font-lexend text-gray-700 mb-2">
                Price Range
              </h4>
              <div className="flex  space-x-2">
                <Field
                  type="number"
                  name="price.min"
                  placeholder="Min"
                  className="border-gray-600 h-8 text-center text-gray-700 border-2 font-lexend focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm"
                />
                <span className="text-gray-600">to</span>
                <Field
                  type="number"
                  name="price.max"
                  placeholder="Max"
                  className="border-gray-600 border-2 text-center text-gray-600 font-lexend focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm"
                />
              </div>
            </div>

            <button
              className=" border mt-2 w-48 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
              type="submit"
            >
              Apply Filters
            </button>
            {dirty && (
              <button
                onClick={() => {
                  clearFilter()
                  resetForm()
                }}
                className="border w-48 md:ml-2 space-x-4 h-8 border-[#ff967068] mt-2 bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                type="button" // Set the type to "button" to prevent form submission
              >
                Clear Filters
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Filters
