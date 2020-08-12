import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRegistroClientePage } from './form-registro-cliente.page';

describe('FormRegistroClientePage', () => {
  let component: FormRegistroClientePage;
  let fixture: ComponentFixture<FormRegistroClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
