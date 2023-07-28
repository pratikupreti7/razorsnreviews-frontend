import React from 'react'

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center py-10 px-5 ">
      <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-lily font-bold text-center mb-2 my-2">
          Welcome to Razors N' Reviews
        </h1>
        <p className="mb-4 text-gray-700 font-lexend text-center">
          The pioneer in incorporating Covid reviews within a salon review
          system!
        </p>
        <hr className="border-t border-gray-400 my-6" />
        <h3 className="text-xl font-bold font-lexend text-gray-700 mb-4">
          Our Story
        </h3>
        <p className="text-gray-700 font-lexend mb-6">
          Established in 2021, Razors N' Reviews operates from New Jersey with a
          vision to ensure that beauty services are not just about luxury, but
          also about safety and hygiene.
        </p>
        <p className="text-gray-700 font-lexend mb-6">
          We provide a platform that helps users discover high-quality beauty
          treatments, massages, haircuts, and more while ensuring the highest
          standard of hygiene.
        </p>
        <hr className="border-t border-gray-400 my-6" />
        <h3 className="text-xl font-bold font-lexend text-gray-700 mb-4">
          Our Approach
        </h3>
        <p className="text-gray-700 font-lexend mb-6">
          We're not just another review system. We're a community committed to
          making beauty services safe and enjoyable for everyone. After availing
          any service from the listed providers, users get the opportunity to
          share their experience and feedback.
        </p>
        <p className="text-gray-700 font-lexend mb-6">
          Our unique system-generated questionnaire for covid rating offers a
          checklist of hygiene protocols, enabling users to make informed
          decisions based on their specific requirements.
        </p>
        <hr className="border-t  border-gray-400 my-6" />
        <p className="text-gray-700 font-lexend mb-6">
          With a myriad of salons and spas offering a variety of services, it
          can be challenging to find one that meets your specific needs and
          safety standards. Razors N' Reviews is here to guide you through this
          process, helping you make the best choice.
        </p>
        <hr className="border-t border-gray-400 my-6" />
      </div>
    </main>
  )
}

export default About
