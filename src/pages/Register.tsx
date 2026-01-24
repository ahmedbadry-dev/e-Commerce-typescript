import { useForm, type SubmitHandler } from "react-hook-form"
import { Input } from "@components/forms";
import { type TRegisterType, signUpSchema } from "@validations/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from '@components/common';
import { Row, Col, Button, Form } from 'react-bootstrap'
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";




const Register = () => {

    const {
        register,
        trigger,
        getFieldState,
        handleSubmit,
        formState: { errors }
    } = useForm<TRegisterType>({
        mode: "onBlur",
        resolver: zodResolver(signUpSchema)
    })

    const {
        emailAvailabilityStatus,
        enteredEmail,
        checkEmailAvailability,
        resetCheckEmailAvailability
    } = useCheckEmailAvailability()

    const onSubmit: SubmitHandler<TRegisterType> = (data) => {
        console.log(data);
    }

    const emailOneBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        /*
            => await trigger('email')
            Manually run validation for "email" before checking its state.
            Without trigger(), invalid / errors may be outdated or not updated yet.
            This ensures we only continue when the field is truly valid.
        */
        await trigger('email')
        const currentEmail = e.target.value
        const { isDirty, invalid } = getFieldState('email')
        if (isDirty && !invalid && enteredEmail !== currentEmail) {
            // check email 
            checkEmailAvailability(currentEmail)
        }

        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability()
        }
    }
    return (
        <>
            <Heading title='User Registration' />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="First Name"
                            name="firstName"
                            register={register}
                            error={errors.firstName?.message as string}
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            register={register}
                            error={errors.lastName?.message as string}
                        />

                        <Input
                            label="Email address"
                            name="email"
                            register={register}
                            onBlur={emailOneBlurHandler}
                            error={
                                errors.email?.message
                                    ? errors.email?.message
                                    : emailAvailabilityStatus === "notAvailable"
                                        ?
                                        "This email is already in use."
                                        : emailAvailabilityStatus === "failed"
                                            ? "Error from the server"
                                            : ""
                            }
                            formText={emailAvailabilityStatus === "checking"
                                ? "We're currently checking the availability of this email address. Please wait a moment."
                                : ""
                            }
                            success={emailAvailabilityStatus === 'available'
                                ? "This email is available for use."
                                : ""
                            }
                            disabled={emailAvailabilityStatus === 'checking' ? true : false}
                        />

                        <Input
                            label="Password"
                            type="Password"
                            name="password"
                            register={register}
                            error={errors.password?.message as string}
                        />

                        <Input
                            label="Confirm Password"
                            type="Password"
                            name="confirmPassword"
                            register={register}
                            error={errors.confirmPassword?.message as string}
                        />

                        <Button
                            variant="info"
                            type="submit"
                            style={{ color: 'white' }}
                            disabled={emailAvailabilityStatus === 'checking' ? true : false}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Register
