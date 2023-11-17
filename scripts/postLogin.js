import { postWithToken } from "./api.js";
import { setInner,getValue } from "./element.js";
import { setCookieWithExpireHour } from "./cookie.js";

export default function Login(){
    let target_url = "https://asia-southeast2-project3-403614.cloudfunctions.net/loginGis";
    let tokenkey = "token";
    let tokenvalue = "689add118162cfeb40c5bc42f4c8cdf0ff56741727d9a48b457c7b8108983fcbe45f87c87d4197674d0ad380ca1";
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