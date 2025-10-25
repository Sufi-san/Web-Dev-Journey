import { Header, Footer } from "./components";
import { Outlet } from "react-router";

export default function App() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}