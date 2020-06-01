import React from "react"

function BookCard(props) {
  const { item } = props
  return (
    <div>
      <img src={item.imageLinks ? item.imageLinks.thumbnail : null} />
      <p>{item.title}</p>
      <p>
        {item.authors && item.authors.length > 1
          ? item.authors.join(", ")
          : item.authors}
      </p>
    </div>
  )
}

export default BookCard
