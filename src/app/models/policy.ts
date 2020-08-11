class Comment {
    sender_id ="";
    text="";
    date="";
}

class File{
    
}

export class Policy{
    public id ="";
    public broker_id = "";
    public number = ""; 
    public client_id = ""; //responsable
    public clientes_members_id = []; //familiares
    public received_date = "";
    public effective_date = "";
    public policy_term_date = "";
    public paid_through_date ="";
    public state ="";
    public responsibility ="";
    public autoplay ="";
    public elegible_for_commission ="";
    public number_of_members ="";
    public payable_agent_id="";

    public comments:Comment[] = [];
    public files:File[] = [];


	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Policy>) {
        Object.assign(this, init);
    }
}