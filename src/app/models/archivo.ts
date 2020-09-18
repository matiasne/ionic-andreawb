export class Archivo{
    public id ="";
    public url:any="";
    public name="";
    public format="";
    public createdAt={seconds: 1597627191, nanoseconds: 876000000};

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Archivo>) {
        Object.assign(this, init);
    }
}