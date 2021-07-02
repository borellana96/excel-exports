

export class ArrayConectService {
    static connectionArray: any = [];
    constructor() { }
    static searchConection(conectionUrl): any {
        const connectExist: any = this.connectionArray.find((element) => {
            return element.urlConnect === conectionUrl;
        });
        return connectExist;
    }
    static addConection(conectionUrl, connectDB): any {
        const objConect: any = {};
        objConect.urlConnect = conectionUrl;
        objConect.conection = connectDB;
        this.connectionArray.push(objConect);
        return '';
    }
}
