export class CommissionFile{
    public id ="";
    public company="";
    public url = "";

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<CommissionFile>) {
        Object.assign(this, init);
    }
}