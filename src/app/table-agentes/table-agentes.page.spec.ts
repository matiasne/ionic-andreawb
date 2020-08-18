import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableAgentesPage } from './table-agentes.page';

describe('TableAgentesPage', () => {
  let component: TableAgentesPage;
  let fixture: ComponentFixture<TableAgentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAgentesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableAgentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
