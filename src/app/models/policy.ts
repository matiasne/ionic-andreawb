import { DocumentReference } from 'angularfire2/firestore';

class Comment {
    sender_id ="";
    text="";
    date="";
}

class File{
    
}

export class Policy{
    public id ="";
    public status = "";
    public agentRef:any = "";
    public agentName = "";
    public agentId = "";
    public number = ""; 
    public clientRef:any; //responsable
    public clientName =""; //responsable
    public familyMembersRef = []; //familiares
    public receivedDate = "";
    public effectiveDate = "";
    public policyTermDate = "";
    public paidThroughDate ="";
    public state ="";
    public responsibility ="";
    public autoplay ="";
    public elegibleForCommission ="";

    public comments: Comment[] = [];
    public files: File[] = [];


	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Policy>) {
        Object.assign(this, init);
    }
}