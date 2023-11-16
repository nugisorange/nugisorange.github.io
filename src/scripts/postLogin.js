import { postWithToken } from "./api.js";
import { setInner,getValue } from "./element.js";
import { setCookieWithExpireHour } from "./cookie.js";

export default function Login(){
    let target_url = "";
    let tokenkey = "token";
    let tokenvalue = "";
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }

    postWithToken(target_url,tokenkey,tokenvalue,datainjson,responseData);

}

function responseData(result) {
    setInner("pesan", result.message);
    setCookieWithExpireHour("token", result.token, 2);
    setCookieWithExpireHour("username", getValue("username"), 2);
    if (result.message == "Password Salah") {
        alert("Password Salah");
    }
    if (result.message == "Selamat Datang") {
        window.location.href = "../chap01/";
    }
}