import logo from '../logo.svg';
import Layout from './layout/layout';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Kumbh Sans',
        'sans-serif',
      ].join(','),
    },});
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Layout>
      </Layout>
    </div>
    </ThemeProvider>
  );
}

export default App;
