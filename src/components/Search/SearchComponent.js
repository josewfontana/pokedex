import React from 'react'

function SearchComponent({next, prev, current, total}) {
  return (
    <div>
      {total}
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
      {current}
    </div>
  )
}

export default SearchComponent