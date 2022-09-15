const setServiceType = (service) => {
    return {
        type: 'SET_SERVICETYPE',
        payload: service
    }
}

const setService = (service) => {
    return {
        type: 'SET_SERVICE',
        payload: service
    }
}

export {setServiceType, setService}