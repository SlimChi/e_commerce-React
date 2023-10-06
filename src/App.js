import Navbar from "./component/header/Navbar";
import HeaderOrder from "./component/header/HeaderOrder";
import HeaderFilter from "./component/header/HeaderFilter";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./component/hero/Hero";
import Footer from "./component/footer/footer";
import ScrollToTop from "./component/scroll/ScrollToTop";
import ViewProduct from "./component/main/ViewProduct";


function App() {
    const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar/>
            <HeaderOrder/>
            <HeaderFilter/>

            <Box
                bgcolor={
                    // @ts-ignore
                    theme.palette.bg.main
                }
            >
                <Hero />
                <ViewProduct />
            </Box>
            <Footer />
            <ScrollToTop />
</ThemeProvider>


      </ColorModeContext.Provider>

  )
}

export default App;
