import React from "react";
import ReactDOM from "react-dom";
import NotificationSnackbar from "../Controls/NotificationSnackbar";

const MsgImages = {
    ClientError: "../icons/ClientError.jpg",
    ClientOk: "../icons/ClientOk.jpg",
    ServerError: "../icons/ServerError.jpg",
    ServerOk: "../icons/ServerOk.jpg"
}

window.notifications = [];
export default class NotificationService {
    static addNotification(messageText, actionFunc, isServer, wasSuccessful) {
        const today = new Date();
        const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + " " + time;

        const imgName = wasSuccessful
            ? (isServer ? MsgImages.ServerOk : MsgImages.ClientOk)
            : (isServer ? MsgImages.ServerError : MsgImages.ClientError);

        if (messageText !== "" && messageText !== undefined) {
            window.notifications.push({
                message: messageText,
                page: document.title,
                dateTime: dateTime,
                img: imgName
            });

            if (window.notificationListChanged !== undefined) {
                window.notificationListChanged(false);
            }

            const myNode = document.getElementById("notifications");
            myNode.innerHTML = "";
            const element = <NotificationSnackbar id="notificationBar"
                open={true} message={messageText}
                actionFunc={actionFunc}
                actionText={model.main.buttons.close} autoHideDuration={3000} />;
            ReactDOM.render(
                element,
                document.getElementById("notifications"));
        }
    }
}