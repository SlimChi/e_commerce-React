import Navbar from "./component/header/Navbar";
import HeaderOrder from "./component/header/HeaderOrder";
import HeaderFilter from "./component/header/HeaderFilter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


function App() {
    const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar/>
            <HeaderOrder/>
            <HeaderFilter/>

        </ThemeProvider>


      </ColorModeContext.Provider>

  )
}

export default App;