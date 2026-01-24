
import { Form } from "react-bootstrap"
import type { Path, FieldValues, UseFormRegister } from "react-hook-form"

type TInpotProps<T extends FieldValues> = {
    label: string,
    type?: string,
    name: Path<T>,
    register: UseFormRegister<T>,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    error: string,
    formText?: string,
    success?: string
    disabled?: boolean
}
const Input = <T extends FieldValues>({
    label,
    error,
    name,
    register,
    onBlur,
    type = 'text',
    formText,
    success,
    disabled
}: TInpotProps<T>) => {

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e)
            register(name).onBlur(e)
        } else {
            register(name).onBlur(e)
        }
    }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name)}
                onBlur={onBlurHandler}
                autoComplete={name}
                isInvalid={error ? true : false}
                isValid={success ? true : false}
                disabled={disabled}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>{/* handle error and failed status email checking*/}
            <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>{/* handle available*/}
            {formText && <Form.Text muted>{formText}</Form.Text>} {/* handle checking*/}
        </Form.Group>
    )
}

export default Input