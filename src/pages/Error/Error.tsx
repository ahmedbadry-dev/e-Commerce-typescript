import { LottieHandler } from "@components/feedback"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <Container>
            <div className='d-flex flex-column align-items-center'>
                <div style={{ marginTop: '5%' }}>
                    <LottieHandler type='notFound' />
                </div>
                <p>
                    How about going back to safety? Back to <Link to={'/'} replace={true}> Home </Link> page
                </p>
            </div>
        </Container>
    )
}

export default Error