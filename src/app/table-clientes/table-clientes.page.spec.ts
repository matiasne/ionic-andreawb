import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableClientesPage } from './table-clientes.page';

describe('TableClientesPage', () => {
  let component: TableClientesPage;
  let fixture: ComponentFixture<TableClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
