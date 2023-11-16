import Login from "./postLogin.js";
import Registrasi from "./postRegister.js";
import checkCookie from "./checkKie.js";
import Logout from "./postLogout.js";

//gis
import { get } from "https://jscroot.github.io/api/croot.js";
import { URLGeoJson } from "./gis/template/template.js";
import { MakeGeojsonFromAPI, responseData, AddLayerToMAP } from "./gis/controller/controller.js";
import {map} from './gis/config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './gis/controller/popup.js';
import {onClick} from './element.js';
import {getAllCoordinates} from './gis/controller/cog.js';

window.Login = Login;
window.Registrasi = Registrasi;
window.Logout = Logout;
window.checkCookie = checkCookie;

//gis
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