import { bigBoxContext } from "../App"
import { menuMobileContext } from "../App"
import { useContext } from "react"

export const useValueContext = () => {
    return useContext(bigBoxContext)
}

export const useMenuMobileContext = () => {
    return useContext(menuMobileContext)
}