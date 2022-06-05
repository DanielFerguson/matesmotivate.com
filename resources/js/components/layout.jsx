import { Head } from "@inertiajs/inertia-react";
import NavBar from "./nav-bar";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>

            <NavBar />

            <main className="grid gap-6 p-6">{children}</main>
        </>
    );
};

export default Layout;
