import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cartActions";
import "./App.css";

let isFirstRender = true;
const App = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    
    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <div className="App">
            {notification && (
                <Notification type={notification.type} message={notification.message} />
            )}
            {!isLoggedIn ? <Auth /> : <Layout />}
        </div>
    );
}

export default App;