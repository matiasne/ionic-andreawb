import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRegistroPolizaPage } from './form-registro-poliza.page';

describe('FormRegistroPolizaPage', () => {
  let component: FormRegistroPolizaPage;
  let fixture: ComponentFixture<FormRegistroPolizaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroPolizaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroPolizaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
