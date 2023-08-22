export const requiredField = (value: string | null) => {
    if (!!value) {
        return undefined
    } else {
        return 'Field is required'
    }
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
}

