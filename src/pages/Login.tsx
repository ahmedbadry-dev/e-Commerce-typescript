import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap'
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import { useForm, type SubmitHandler } from "react-hook-form"
import { loginSchema, type TSignInType } from '@validations/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<TSignInType>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<TSignInType> = (data) => {
        console.log(data);
    }
    return (
        <>
            <Heading title='User Login' />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label='Email address'
                            name='email'
                            register={register}
                            error={errors.email?.message as string}
                        />
                        <Input
                            label='Password'
                            name='password'
                            type='password'
                            register={register}
                            error={errors.password?.message as string}
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

export default Login