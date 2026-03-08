import "./layout.css";

export default function AdminLayout({
    children,
}:{
    children: React.ReactNode;
}){
    return(
        <>
            {/* slide-bar */}
            <h1>Admin layout là trang này</h1>
            {/* top-bar */}

            {/* main-content */}
            <main>
                {children}
            </main>
        </>
    )
}