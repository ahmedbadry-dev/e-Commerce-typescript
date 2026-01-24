import { Form } from "react-bootstrap"
import type { Path, FieldValues, UseFormRegister } from "react-hook-form"

type TInpotProps<T extends FieldValues> = {
    label: string,
    type?: string,
    name: Path<T>,
    register: UseFormRegister<T>,
    error: string
}
const Input = <T extends FieldValues>({
    label,
    error,
    name,
    register,
    type = 'text'
}: TInpotProps<T>) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name)}
                autoComplete={name}
                isInvalid={error ? true : false}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    )
}

export default Input