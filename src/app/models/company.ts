export class Company{
    public id: string = "";
    public foto:string="";
    public name: string = "";
    public plans: string[] = [];
 

	constructor(){ }
    
    public asignarValores(init?: Partial<Company>) {
        Object.assign(this, init);
    } 
}