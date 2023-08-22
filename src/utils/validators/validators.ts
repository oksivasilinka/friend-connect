export const requiredField = (value: any) => {
    if (!!value) {
        return undefined
    } else {
        return 'Field is required'
    }
}

export const maxLengthCreator = (maxLength: number) => (value: any) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
}

