import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRegistroPage } from './form-registro.page';

describe('FormRegistroPage', () => {
  let component: FormRegistroPage;
  let fixture: ComponentFixture<FormRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
