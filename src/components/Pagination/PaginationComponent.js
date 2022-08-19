import { useEffect, useState } from "react";
import { usePaginationContext } from "../../hooks/usePaginationContext";
import styles from "./Pagination.module.css";

const PaginationComponent = () => {
  const {currentPage, totalPages, setCurrentPage} = usePaginationContext();
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const pageNumberLimit = 4;

  useEffect(() => {
    setCurrentPage(currentPage);
    setMinPageLimit(currentPage - 1);
    setMaxPageLimit(currentPage + pageNumberLimit);
  }, [currentPage])

  const handleSetPage = (page) => {
    setMinPageLimit(page - 1);
    setMaxPageLimit(page + pageNumberLimit);
    setCurrentPage(page);
  }
  
  let pagesArr = [];
  for(let i = 1; i <= totalPages; i++){
    pagesArr.push(i);
  }

  const pageNumbers = pagesArr.map((page) => {
    if(page <= maxPageLimit && page > minPageLimit) {
        return (
          <li key={page}>
            <button onClick={() => {handleSetPage(page)}}>{page}</button>
          </li>
        )
    }else{
      return null
    }
  })

  let pageIncrementEllipses = null;
  if(pagesArr.length > maxPageLimit){
      pageIncrementEllipses = <li onClick={() => {console.log("next")}}>&hellip;</li>
  }
  let pageDecremenEllipses = null;
  if(minPageLimit >=1){
      pageDecremenEllipses = <li onClick={() => {console.log("prev")}}>&hellip;</li> 
  }

  return (
    <div className={styles.paginationContainer}>
      <ul>
        {currentPage > 1 && 
          <li>
            <button onClick={() => {handleSetPage(currentPage - 1)}}>Prev</button>
          </li>
        }
        {pageDecremenEllipses}
          {pageNumbers}
        {pageIncrementEllipses}
        {currentPage !== totalPages && 
          <li>
            <button onClick={() => {handleSetPage(currentPage + 1)}}>Next</button>
          </li>
        }
      </ul>
    </div>
  )
}

export default PaginationComponent