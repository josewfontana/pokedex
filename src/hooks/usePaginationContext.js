import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if(!context){
    console.log("Context o não encontrado")
  }

  return context
}