import {getCookie} from "https://jscroot.github.io/cookie/croot.js";

export let URLGeoJson = "https://us-central1-gis-project-401902.cloudfunctions.net/GIS-Project";
export let urlPostGCF = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/PostCoordinate-GIS";
export let UrlLogin = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/LoginGeo"
export let UrlRegister = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/RegisterGeo"
export let tableTag="tr";
export let tableRowClass="content is-small";
export let token = "cihuy"
export let cookie = getCookie("Login")
export let tableTemplate=`
<td>#NAME#</td>
<td >#KORDINAT#</td>
<td>#TYPE#</td>
`
export const clickpopup = `
Long : #LONG#<br>
Lat  : #LAT#<br>
X   : #X#<br>
Y   : #Y#<br>
HDMS : #HDMS#<br>
`