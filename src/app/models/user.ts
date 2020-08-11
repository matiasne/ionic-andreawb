export class User{
    
    public id = "";
    public email = "";
    public foto = "";
    public nombre = "";
    public token = "";
    public address = "";

	constructor(
		
		){
    }
    
    public asignarValores(init?: Partial<User>) {
        Object.assign(this, init);
    }
}