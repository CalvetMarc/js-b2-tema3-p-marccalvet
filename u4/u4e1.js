
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

export class CookieApi{
    static EXPIRING_DAYS = 365;
    #document;

    constructor(document = undefined){
        this.#document = document ? document : window.document;
    }

    static expirationDate(nDays){
        const now = new Date();
        now.setUTCDate(now.getUTCDate() + nDays);
        return "; expires=" + now.toUTCString();
    }

    setCookie(key, value, nDays = CookieApi.EXPIRING_DAYS){
        this.#document.cookie = key + "=" + JSON.stringify(value) + CookieApi.expirationDate(nDays) + "; path=/";
    }

    getCookie(key){
        key += "=";
        const cookies = this.#document.cookie.split(";");
        for(let cookie of cookies){
            cookie = cookie.trim();
            if(cookie.startsWith(key)){
                return JSON.parse(cookie.substring(key.length));
            }
        }

        return null;
    }

    removeCookie(key){
        const value = this.getCookie(key);

        if (value === null) {
            return null;
        }

        this.#document.cookie = `${key}=${JSON.stringify("")}; expires=0; path=/`;

        return value;
    }
}