class Comment {
    sender_id ="";
    text="";
    date="";
}

class File{
    
}

export class Policy{
    public id ="";
    public brokerId = "";
    public number = ""; 
    public clientId = ""; //responsable
    public clientesMembersId = []; //familiares
    public receivedDate = "";
    public effectiveDate = "";
    public policyTermDate = "";
    public paidThroughDate ="";
    public state ="";
    public responsibility ="";
    public autoplay ="";
    public elegibleForCommission ="";
    public numberOfMembers ="";
    public payableAgentId="";

    public comments: Comment[] = [];
    public files: File[] = [];


	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Policy>) {
        Object.assign(this, init);
    }
}