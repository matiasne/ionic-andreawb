import { Localizacion } from './localizacion';
import { UsuarioService } from '../Services/usuario.service';

export class Client{
    public id ="";
    public agentId="";
    public firstName = "";
    public lastName = "";
    public gender = "";
    public dateOfBirth = "";
    public marital_status ="";
    public us_citizen="";
    public type_document="";
    public an="";
    public card_number="";
    public expiration="";
    public category="";
    public  visa_description="";
    public place_work="";
    public income="";
    public work_description="";
    public familyMembersRef = []; //familiares
    public address: Localizacion;
    public phone = "";
    public altphone = "";
    public email = "";
    
    public usCitizen ="";
    public document ="";
    public maritalStatus = "";
 

	constructor(
		
		){
            this.address = new Localizacion();
    }
    
    public asignarValores(init?: Partial<Client>) {
        Object.assign(this, init);
    } 
}