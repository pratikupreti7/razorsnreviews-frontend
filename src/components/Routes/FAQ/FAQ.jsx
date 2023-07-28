import React, { useState } from 'react'

function FAQ() {
  const [activeButton, setActiveButton] = useState(null)

  const toggleCollapsible = (buttonId) => {
    if (buttonId === activeButton) {
      setActiveButton(null)
    } else {
      setActiveButton(buttonId)
    }
  }

  const isButtonActive = (buttonId) => {
    return buttonId === activeButton
  }

  return (
    <section className="py-10 m-1">
      <div className="container mx-auto ">
        <h2 className="text-4xl font-lily font-bold text-center mb-2 my-2 ">
          Frequently Asked Questions
        </h2>
        <h3 className="text-lg font-lexend font-semibold text-gray-700 mb-8 text-center">
          Some of the most common questions asked about Razor N' Reviews Website
        </h3>
        <div className="max-w-2xl mx-auto ">
          <div className="my-6">
            <button
              className="w-full font-lexend flex justify-between bg-white rounded shadow-md border text-gray-700 border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 p-4 text-left font-semibold"
              onClick={() => toggleCollapsible('button1')}
            >
              <h2>What is the Purpose of this application ?</h2>
              <h2>➕ </h2>
            </button>

            <div
              className={
                isButtonActive('button1')
                  ? 'faq-content overflow-hidden max-h-full transition-all duration-500'
                  : 'faq-content overflow-hidden max-h-0 transition-all duration-500'
              }
            >
              <p className="mt-4 font-lexend">
                Purpose of this application is to make customers get to know the
                services that they are not familiar with. This application is
                used to determine covid safety in new normal with new rules.
                Other than normal ratings, there will a covid questionnaire and
                ratings. Users will be able to provide reviews as well as look
                at the reviews given by other customers.
              </p>
            </div>
          </div>
          <div className="my-6">
            <button
              className="w-full font-lexend flex justify-between  bg-white rounded shadow-md text-gray-700 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 p-4 text-left font-semibold"
              onClick={() => toggleCollapsible('button2')}
            >
              Who can use our application ?<h2>➕ </h2>
            </button>
            <div
              className={
                isButtonActive('button2')
                  ? 'faq-content overflow-hidden max-h-full transition-all duration-500'
                  : 'faq-content overflow-hidden max-h-0 transition-all duration-500'
              }
            >
              <p className="mt-4 font-lexend">
                This application can be used by the following groups:
              </p>
              <ul className="list-disc pl-6 mt-2 font-lexend">
                <li>
                  Salon Providers Owners who want to publicize their salon.
                </li>
                <li>Influencers</li>
                <li>Millennials</li>
                <li>Special occasions</li>
              </ul>
            </div>
          </div>
          <div className="my-6">
            <button
              className="w-full  flex justify-between bg-white text-gray-700 rounded shadow-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 p-4 text-left font-semibold"
              onClick={() => toggleCollapsible('button3')}
            >
              <h2 className="font-lexend">
                What are some of features provided by the website ?
              </h2>
              <h2>➕ </h2>
            </button>
            <div
              className={
                isButtonActive('button3')
                  ? 'faq-content overflow-hidden max-h-full transition-all duration-500'
                  : 'faq-content overflow-hidden max-h-0 transition-all duration-500'
              }
            >
              <ul className="list-disc pl-6 mt-4 font-lexend">
                <li>Home Page will have list of services provided</li>
                <li>User can create a user profile</li>
                <li>
                  Reviews: Covid questionnaire will be given to the to the user,
                  system generated rating will be calculated
                </li>
                <li className="mb-2">
                  Covid Rating Questionnaire: System generated questionnaire for
                  covid rating will have a checklist of all protocols that salon
                  should follow
                </li>
                <li className="mb-2">
                  Search for specific salon based on keywords
                </li>
                <li className="mb-2">
                  Users can comment on certain reviews they find interesting
                </li>
              </ul>
            </div>
            <div className="my-6">
              <button
                className="w-full flex justify-between font-lexend text-gray-700 bg-white rounded shadow-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 p-4 text-left font-semibold"
                onClick={() => toggleCollapsible('button4')}
              >
                What are the assets of the application ? <h2>➕ </h2>
              </button>

              <div
                className={
                  isButtonActive('button4')
                    ? 'faq-content overflow-hidden max-h-full transition-all duration-500'
                    : 'faq-content overflow-hidden max-h-0 transition-all duration-500'
                }
              >
                <ul className="list-disc pl-6 mt-4  font-lexend">
                  <li className="mb-2">View the services</li>
                  <li className="mb-2">Adding insights or comments</li>
                  <li className="mb-2">Promotion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}
export default FAQ
