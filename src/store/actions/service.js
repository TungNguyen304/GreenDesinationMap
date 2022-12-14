const setServiceType = (type) => {
    return {
        type: 'SET_SERVICE_TYPE',
        payload: type
    }
}

const setService = (service) => {
    return {
        type: 'SET_SERVICE',
        payload: service
    }
}

const setServiceRegisterType = (type) => {
    return {
        type: 'SET_SERVICE_REGISTER_TYPE',
        payload: type
    }
}

const setServiceIdInterest = (service) => {
    return {
        type: 'SET_SERVICE_ID_INTEREST',
        payload: service
    }
}

export {setServiceType, setService, setServiceRegisterType, setServiceIdInterest}