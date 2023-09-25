import React from 'react'
import s from './FormControls.module.css'
import { WrappedFieldProps } from 'redux-form'


export const FormControl:React.FC<WrappedFieldProps> = ({meta, children}) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
                {hasError && <span>{meta.error}'</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}