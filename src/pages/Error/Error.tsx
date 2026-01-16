import { Container } from "react-bootstrap"
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom"


import styles from './styles.module.css'

const { notfound } = styles
const Error = () => {

    const error = useRouteError()

    let errorStatus: number;
    let errorStatusText: string;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status
        errorStatusText = error.statusText
    } else {
        errorStatus = 404;
        errorStatusText = "Page Not Found"
    }

    return (
        <Container>
            <div className={notfound}>
                <h1>{errorStatus}</h1>
                <p>{errorStatusText} </p>
                <p>
                    How about going back to safety? Back to <Link to={'/'} replace={true}> Home </Link> page
                </p>
            </div>
        </Container>
    )
}

export default Error