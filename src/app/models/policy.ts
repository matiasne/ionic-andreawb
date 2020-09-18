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
    public company="";
    public plan="";
    public clientRef:any; //responsable
    public clientName =""; //responsable
    public coveredRelatives = []; //familiares
    public receivedDate = "";
    public effectiveDate = "";
    public policyTermDate = "";
    public paidThroughDate ="";
    public state ="";
    public montlyPremium ="";
    public responsibility ="";
    public aplication_id ="";
    public autoplay ="";
    public elegibleForCommission ="";
    public document_needed="no";
    public need_us_passport=false;
    public need_green_card=false;
    public need_employemnt_auth=false;
    public need_paystub = false;

    public comments: Comment[] = [];
    public files: File[] = [];


	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Policy>) {
        Object.assign(this, init);
    }
}