import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_FIREBASE_URI}/cartItems.json`
            );
            const data = await res.json();
            return data;
        };
        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Sending Request Failed",
                    type: "error",
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                open: true,
                message: "Sending Request To Database!",
                type: "warning",
            })
        );
        const sendRequest = async () => {
            // Send state as Sending request
            const res = await fetch(`${process.env.REACT_APP_FIREBASE_URI}/cartItems.json`, {
                method: "PUT",
                body: JSON.stringify(cart),
            });
            // eslint-disable-next-line
            const data = await res.json();
            // Send state as Request is successful
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Request Sent Successfully!!",
                    type: "success",
                })
            );
        };
        try {
            await sendRequest();
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Sending Request Failed",
                    type: "error",
                })
            );
        }
    };
};
