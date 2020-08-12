import { Localizacion } from './localizacion';

export class Client{
    
    public id = "";
    public name = "";
    public gender = "";
    public date_of_birth = "";
    public address: Localizacion;
    public phone = "";
    public altphone = "";
    public email = "";
    public status = "";

	constructor(
		
		){
    }
    
    public asignarValores(init?: Partial<Client>) {
        Object.assign(this, init);
    } 
}