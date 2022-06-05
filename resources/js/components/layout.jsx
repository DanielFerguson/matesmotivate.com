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

            <div className="relative bg-indigo-600 hidden sm:block">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="pr-16 sm:text-center sm:px-16">
                        <p className="font-medium text-white">
                            We're still building the desktop UI. <br />
                            For the best experience, use your mobile.
                        </p>
                    </div>
                </div>
            </div>

            <NavBar />

            <main className="grid gap-6 p-6">{children}</main>
        </>
    );
};

export default Layout;
