import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import Navbar from "./component/header/Navbar";
import HeaderOrder from "./component/header/HeaderOrder";
import HeaderFilter from "./component/header/HeaderFilter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./component/hero/Hero";
import Footer from "./component/footer/footer";
import ScrollToTop from "./component/scroll/ScrollToTop";
import ViewProduct from "./component/main/ViewProduct";
import AddProduct from "./component/main/AddProduct";
import EditProduct from "./component/main/EditProduct";

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Link to="/"> {/* Ajoutez ce composant Link autour de votre Typography */}
                        <Navbar />
                    </Link>
                    <HeaderOrder />
                    <HeaderFilter />

                    <Box bgcolor={theme.palette.bg.main}>
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/edit-product" element={<EditProduct />} />
                        </Routes>

                    </Box>
                    <Routes>
                        <Route path="/" element={<ViewProduct />} />
                    </Routes>
                    <Footer />
                    <ScrollToTop />
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;
