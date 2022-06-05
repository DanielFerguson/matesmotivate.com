import NavBar from "./nav-bar";

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />

            <main className="grid gap-6 p-6">{children}</main>
        </>
    );
};

export default Layout;
