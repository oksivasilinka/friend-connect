import React, {ChangeEvent, ReactNode} from "react";
import s from './FormControls.module.css'

type MetaType = {
    touched: boolean;
    error: string;
}

type InputType = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

type PropsType = {
    input: InputType;
    meta: MetaType;
    placeholder?: string;
    children: ReactNode;
}

export const FormControl = ({meta, children, ...props}: PropsType) => {

    const hasError  = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
                {hasError && <span>{meta.error}'</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: PropsType) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}


export const Input = (props: PropsType) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}