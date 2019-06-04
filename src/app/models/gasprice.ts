export class GasPrice {
    public _id: string;
    public calle: string;
    public rfc: string;
    public date_insert: string;
    public regular: string;
    public colonia: string;
    public numeropermiso: string;
    public fechaaplicacion: string;
    public permisoid: string;
    public longitude: string;
    public latitude: string;
    public premium: string;
    public razonsocial: string;
    public codigopostal: string;
    public dieasel: string;

    constructor(data: any) {
        for (const key in data) {
            if (data[key]) {
                this[key] = data[key];
            }
        }
    }
}
