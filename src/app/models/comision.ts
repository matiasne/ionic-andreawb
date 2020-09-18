export class Comision{
    public id ="";
    public companiaId="";
    public companiaNombre="";
    public fileName ="";
    public url="";   
    public format="";
    public createdAt={seconds: 1597627191, nanoseconds: 876000000};

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Comision>) {
        Object.assign(this, init);
    }
}