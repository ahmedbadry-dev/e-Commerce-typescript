import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap"
import { Header, Footer } from "@components/common";
import { Suspense } from "react";
import { LottieHandler } from "@components/feedback";

import styles from './styles.module.css'



const { container, wrapper } = styles;

const MainLayout = () => {
    return (
        <Container className={container}>
            <Header />
            <div className={wrapper}>
                <Suspense fallback={
                    <div>
                        <LottieHandler type="loading" message="loading please wait..." />
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </Container>
    )
}

export default MainLayout