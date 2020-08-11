import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, Type, ViewChildren, QueryList } from '@angular/core';
import { ItemDirective } from './item.directive';
import { ItemComponent } from './item.component';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-base',
  templateUrl: './list-base.component.html',
  styleUrls: ['./list-base.component.scss'],
})
export class ListBaseComponent implements OnInit {

  @Input() itemComponent:Type<any>;
  @Input() service:any;
  @ViewChildren(ItemDirective) itemHost: QueryList<ItemDirective>;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  public page = 1;
  
  public items =[];

  private isLoading= false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public loadingController: LoadingController,
  ) {
   
  }

  ngOnInit() {
    this.actualizar();
  }

  actualizar(){
    var service = this.service();
    service.all(this.page).subscribe(response=>{
      console.log(response.data.data);
      var elementos = response.data.data; 
    })  
    
    this.presentLoading();  

    service.all(this.page).subscribe(response=>{   
      var resp:any = response;
      var elementos = resp.data.data;
      elementos.forEach(element => {
        this.items.push(element);        
      });
      this.dismissLoading();
      this.infiniteScroll.disabled = false;
      if (elementos.length < 5) {        
        this.infiniteScroll.disabled = true;
      }

    },error=>{
      this.dismissLoading();
    }); 
  }

  verMas(){
    this.page++;   
    this.actualizar(); 
  }

  ngAfterViewInit(){
    this.loadComponent();
  }
  
  loadComponent() {
   
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.itemComponent);

    this.itemHost.forEach((element,index) => {
      console.log(element);
      const viewContainerRef = element.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<ItemComponent>componentRef.instance).data = this.items[index];

    });   
  }


  doRefresh(event){ 
    this.items = [];
    this.page = 1;
    this.actualizar();
    setTimeout(() => {
      event.target.complete();
    }, 500);
    
  }

  onChange(event){

  }

  seleccionar(item){

  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Cargando',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });

  }
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
