import { useAppDispatch, useAppSelector } from '@store/hooks';
import { thunkAuthLogin, resetUI } from '@store/auth/authSlice';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, type SubmitHandler } from "react-hook-form"
import { loginSchema, type TSignInType } from '@validations/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';


const Login = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(s => s.auth)

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const { register, handleSubmit, formState: { errors } } = useForm<TSignInType>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur'
    })


    const onSubmit: SubmitHandler<TSignInType> = (formData) => {
        if (searchParams.get('message')) {
            setSearchParams('')
        }
        dispatch(thunkAuthLogin(formData))
            .unwrap()
            .then(() => navigate('/'))
    }


    useEffect(() => {
        return () => {
            dispatch(resetUI())
        }
    }, [dispatch])
    return (
        <>
            <Heading title='User Login' />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {searchParams.get('message') === "account_created" && (
                        <Alert variant='success'>
                            Your account successfully created, pleas login
                        </Alert>
                    )}
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
                            {loading === 'pending' ? (
                                <>
                                    <Spinner animation="border" size="sm" /> loading...
                                </>
                            ) : 'Submit'}
                        </Button>
                        {error && (
                            <p style={{ color: '#dc3545', marginTop: '10px' }}>{error}</p>
                        )}
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login