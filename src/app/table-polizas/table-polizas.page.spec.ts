import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablePolizasPage } from './table-polizas.page';

describe('TablePolizasPage', () => {
  let component: TablePolizasPage;
  let fixture: ComponentFixture<TablePolizasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePolizasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablePolizasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
