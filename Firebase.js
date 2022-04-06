import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue, child, push, get } from "firebase/database";
import { getStorage, ref as imageRef } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAuBPMVcxpuTmvC9uTIk56cgi4eqfPHzKw",
    authDomain: "resturantpos-4ae78.firebaseapp.com",
    databaseURL: "https://resturantpos-4ae78.firebaseio.com",
    projectId: "resturantpos-4ae78",
    storageBucket: "resturantpos-4ae78.appspot.com",
    messagingSenderId: "237852581808",
    appId: "1:237852581808:web:0bf1237852a157bb834075",
    measurementId: "G-EFYDVGR3XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { getDatabase, ref, onValue, child, push, get, getStorage, imageRef };


