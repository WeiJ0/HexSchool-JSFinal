import Header from "./Header";
import Footer from "./Footer";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from "../../Reducer";

const Layout = ({ children }) => {

    const store = createStore(reducer)

    return <Provider store={store}>
        <Header />
        <main>{children}</main>
        <Footer />
    </Provider>
}

export default Layout;