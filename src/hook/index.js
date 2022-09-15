import { bigBoxContext } from "../pages/Home"
import { useContext } from "react"

export const useValueContext = () => {
    return useContext(bigBoxContext)
}