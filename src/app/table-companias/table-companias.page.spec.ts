import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableCompaniasPage } from './table-companias.page';

describe('TableCompaniasPage', () => {
  let component: TableCompaniasPage;
  let fixture: ComponentFixture<TableCompaniasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCompaniasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCompaniasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
