import { postBiasa } from "./apisal.js";
import { setInner,getValue } from "./asset.js";

export default function Register(){
    let target_url = "";
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }
    postBiasa(target_url,datainjson,responseData);
}

function responseData(result) {
    setInner("pesan", result.message);
    if (result.message == "Username telah dipakai") {
        alert("Username telah dipakai");
    }
    if (result.message == "Gagal Hash Password") {
        alert("Gagal Hash Password");
    }
    if (result.message == "Berhasil Input data") {
        window.location.href = "../login";
    }
}