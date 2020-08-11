export class Commission{
    public id ="";
    public broker_id = "";
    public client_id = "";
    public state ="";
    public rate = "";
    public number_of_members ="";
    public effective_date = "";
    public commision_date = "";    
    public statement_date = "";
    public commission_amount ="";
    public policy_number ="";

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Commission>) {
        Object.assign(this, init);
    }
}