import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, Fragment, useState } from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { AuthContextProvider } from '~/components/Contexts/AuthContext';

export const ThemeContext = createContext();

function App() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(() => {
        if (defaultDark) {
            localStorage.setItem('theme', 'dark');
            return 'dark';
        } else {
            localStorage.setItem('theme', 'light');
            return 'light';
        }
    });

    const switchTheme = () => {
        const themeVariable = localStorage.getItem('theme');
        const newTheme = themeVariable === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <Router>
            <AuthContextProvider>
                <ThemeContext.Provider value={{ switchTheme, theme }}>
                    <div className="App" data-theme={theme}>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                const Page = route.component;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            route.props ? (
                                                <Layout {...route.props}>
                                                    <Page {...route.props} />
                                                </Layout>
                                            ) : (
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            )
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </ThemeContext.Provider>
            </AuthContextProvider>
        </Router>
    );
}

export default App;
