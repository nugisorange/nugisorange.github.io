import { deleteCookie } from "./kie";

export default function Logout() {
    deleteCookie();
    window.location.href = "../login";
}