import React, { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import styles from "./InfoDetail.module.scss"
import missingCover from "../../assets/NoCover.png"

function InfoDetail() {
  const { state } = useContext(AppContext)
  const { info } = state.bookDetail

  return (
    <React.Fragment>
      {state.bookDetail ? (
        <>
          <h1 className={styles.header}>{info.title}</h1>
          {info.authors ? (
            <h2 className={styles.author}>By {info.authors.join(", ")}</h2>
          ) : null}

          <a href={info.infoLink}>
            {" "}
            <img
              src={info.imageLinks ? info.imageLinks.thumbnail : missingCover}
              alt="Book cover"
              style={{ width: "max-content" }}
            />
          </a>
          <h4 className={styles.data}>
            {info.publisher ? info.publisher : null}
            {info.publishedDate ? `, ${info.publishedDate.slice(0, 4)}` : null}
            {info.pageCount ? (
              <>
                <br />
                {info.pageCount} pages
              </>
            ) : null}
          </h4>
          <p className={styles.description}>{info.description}</p>
        </>
      ) : null}
    </React.Fragment>
  )
}

export default InfoDetail
