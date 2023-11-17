import Login from "./postLogin.js";
import Registrasi from "./postRegister.js";
import checkCookie from "./checkKie.js";
import Logout from "./postLogout.js";

//chap
import { get } from "https://jscroot.github.io/api/croot.js";
import { URLGeoJson } from "./chap/template/template.js";
import { MakeGeojsonFromAPI, responseData, AddLayerToMAP } from "./chap/controller/controller.js";
import {map} from './chap/config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './chap/controller/popup.js';
import {onClick} from './element.js';
import {getAllCoordinates} from './chap/controller/cog.js';

window.Login = Login;
window.Registrasi = Registrasi;
window.Logout = Logout;
window.checkCookie = checkCookie;

//chap
onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
    
get(URLGeoJson,data => {
    responseData(data)
    let link = MakeGeojsonFromAPI(data)
    // console.log(link)
    // console.log(geojson)
    AddLayerToMAP(link)
}); 