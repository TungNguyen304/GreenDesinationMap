export const setIsDraging = (drag) => {
    return {
        type: 'SET_ISDRAGING',
        payload: {
            type: drag.type,
            position: drag.position
        }
    }
}
