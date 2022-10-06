/* eslint-disable react-hooks/exhaustive-deps */
import HomeLayout from 'Layout/HomeLayout';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { publicRoutes } from 'routes/routes';
import AppPage from './AppPage';

function HomePage() {
    const logged = localStorage.getItem('logged');

    const navigate = useNavigate();

    useEffect(() => {
        if (!logged) {
            navigate('/');
        } else {
            navigate('/app');
        }
    }, [!!logged]);

    return (
        <div>
            <Routes>
                {logged ? (
                    <Route path="/app" element={<AppPage />} />
                ) : (
                    publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <HomeLayout>
                                        <Page login={route.login} />
                                    </HomeLayout>
                                }
                            />
                        );
                    })
                )}

                <Route />
            </Routes>
        </div>
    );
}

export default HomePage;
