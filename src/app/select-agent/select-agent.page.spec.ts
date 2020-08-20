import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAgentPage } from './select-agent.page';

describe('SelectAgentPage', () => {
  let component: SelectAgentPage;
  let fixture: ComponentFixture<SelectAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
