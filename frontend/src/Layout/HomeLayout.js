function HomeLayout({ children }) {
    return (
        <div className="containerLogin">
            {children}
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 60,
                    left: 0,
                    textAlign: 'center',
                }}
            >
                Your account for everything Autodesk
            </div>
        </div>
    );
}

export default HomeLayout;
