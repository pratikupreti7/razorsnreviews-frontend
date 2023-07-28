// import React from 'react'

// const Search = (props) => {
//   const value = props.value
//   const handleChange = props.handleChange
//   const clearBtn = props.clearBtn

//   return (
//     <div className="search-background relative ">
//       <div className="max-w-[390px] min-w-[350px]   mx-auto md:min-w-[560px] text-gray-700 font-lexend bg-white bg-opacity-70 rounded-lg p-2 flex searchbar-wrap">
//         {value ? (
//           <button
//             className="clear-btn w-7 h-7  mt-[2px] text-white bg-red-500 rounded-full font-bold"
//             onClick={clearBtn}
//           >
//             &times;
//           </button>
//         ) : (
//           <img
//             className="searchbar w-7 h-7 mr-2 mt-[2px]"
//             src={process.env.PUBLIC_URL + 'search-icon.png'}
//             alt="search-icon"
//           />
//         )}
//         <input
//           className="search flex-grow bg-transparent outline-none  focus:border-transparent text-base ml-2 mt-1"
//           type="text"
//           placeholder="Search your favourite salons !"
//           value={value}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   )
// }

// export default Search

import React from 'react'

const Search = ({
  value,
  handleChange,
  clearBtn,
  searchSuggestions,
  handleSuggestionClick,
}) => {
  return (
    <div className="search-background relative ">
      <div className="max-w-[390px] min-w-[350px]   mx-auto md:min-w-[560px] text-gray-700 font-lexend bg-white bg-opacity-70 rounded-lg p-2 flex searchbar-wrap">
        {value ? (
          <button
            className="clear-btn w-7 h-7  mt-[2px] text-white bg-red-500 rounded-full font-bold"
            onClick={clearBtn}
          >
            &times;
          </button>
        ) : (
          <img
            className="searchbar w-7 h-7 mr-2 mt-[2px]"
            src={process.env.PUBLIC_URL + 'search-icon.png'}
            alt="search-icon"
          />
        )}
        <input
          className="search flex-grow bg-transparent outline-none  focus:border-transparent text-base ml-2 mt-1"
          type="text"
          placeholder="Search your favourite salons !"
          value={value}
          onChange={handleChange}
        />
      </div>
      {searchSuggestions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
          {searchSuggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="p-4 border-b text-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
