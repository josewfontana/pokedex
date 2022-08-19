import { createContext, useState, useEffect } from "react";

export const PaginationContext = createContext();

export const PaginationContextProvider = ({children}) => {
  const [limit, setLimit] = useState(24)
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countTotal, setCountTotal] = useState(0);
  
  useEffect(() => {
    setTotalPages(Math.floor(countTotal / limit));
  }, [countTotal])
  
  useEffect(() => {
    setOffset((currentPage - 1) * limit)
  }, [currentPage])

  return(
    <PaginationContext.Provider value={{limit, offset, currentPage, totalPages, setCountTotal, setCurrentPage}}>
      {children}
    </PaginationContext.Provider>
  )
}