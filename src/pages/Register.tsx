import { useForm, type SubmitHandler } from "react-hook-form"
import { Input } from "@components/forms";
import { type TRegisterType, signUpSchema } from "@validations/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from '@components/common';
import { Row, Col, Button, Form } from 'react-bootstrap'




const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<TRegisterType>({
        mode: "onBlur",
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit: SubmitHandler<TRegisterType> = (data) => {
        console.log(data);
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
                            error={errors.email?.message as string}
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

                        <Button variant="info" type="submit" style={{ color: 'white' }}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Register
