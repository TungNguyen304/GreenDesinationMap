import { bigBoxContext } from "../App"
import { useContext } from "react"

export const useValueContext = () => {
    return useContext(bigBoxContext)
}