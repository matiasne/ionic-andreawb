export class Comentario{
    public id ="";
    public text="";
    public agentName="";
    public agentId="";
    public createdAt={seconds: 1597627191, nanoseconds: 876000000};

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Comentario>) {
        Object.assign(this, init);
    }
}