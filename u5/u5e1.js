// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

export class ClipboardApi{
    #clipboard;

    constructor(clipboard = undefined){
        this.#clipboard = clipboard ?? window.navigator.clipboard;
    }

    async copy(text){
        const result = await this.#clipboard.writeText(text);
        return result;
    }

    async read(){
        const result = await this.#clipboard.readText();
        return result;
    }
}