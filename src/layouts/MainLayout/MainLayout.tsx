import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap"
import { Header, Footer } from "@components/common";
import { Suspense } from "react";

import styles from './styles.module.css'



const { container, wrapper } = styles;

const MainLayout = () => {
    return (
        <Container className={container}>
            <Header />
            <div className={wrapper}>
                <Suspense fallback={<p className="text-center mt-4">Loading...</p>}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </Container>
    )
}

export default MainLayout