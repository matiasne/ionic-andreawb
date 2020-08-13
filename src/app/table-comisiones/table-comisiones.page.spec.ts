import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableComisionesPage } from './table-comisiones.page';

describe('TableComisionesPage', () => {
  let component: TableComisionesPage;
  let fixture: ComponentFixture<TableComisionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComisionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComisionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
