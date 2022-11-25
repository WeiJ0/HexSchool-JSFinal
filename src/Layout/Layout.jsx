import Header from "./Header";
import Footer from "./Footer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../Reducer";

import { loadState, saveState } from "../store/store";

const Layout = ({ children }) => {

    const store = createStore(reducer, loadState());

    store.subscribe(() => {
        const state = store.getState();
        saveState(state);
    })

    return (
        <Provider store={store}>
            <Header />
            <main>{children}</main>
            <Footer />
        </Provider>
    )
}

export default Layout;