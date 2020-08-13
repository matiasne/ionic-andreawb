export class Commission{
    public id ="";
    public brokerId = "";
    public clientId = "";
    public state ="";
    public rate = "";
    public effectiveDate = "";
    public commisionDate = "";    
    public statementDate = "";
    public commissionAmount ="";
    public policyNumber ="";

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Commission>) {
        Object.assign(this, init);
    }
}