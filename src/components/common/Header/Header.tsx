import { HeaderBasket } from "@components/eCommerce";
import {
    Badge,
    Navbar,
    Nav,
    Container
} from "react-bootstrap";


import styles from "./styles.module.css";

const { headerContainer, headerLogo } = styles

function Header() {
    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}>
                    <span>our</span> <Badge bg="info">Ecom</Badge>
                </h1>

                <HeaderBasket />
            </div>

            <Navbar
                expand="lg"
                className="bg-body-tertiary"
                bg="dark"
                data-bs-theme="dark"
            >
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#Categories">Categories</Nav.Link>
                            <Nav.Link href="#About">About</Nav.Link>
                        </Nav>
                        <Nav >
                            <Nav.Link href="#Login">Login</Nav.Link>
                            <Nav.Link href="#Register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
