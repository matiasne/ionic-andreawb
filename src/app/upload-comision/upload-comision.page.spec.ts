import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadComisionPage } from './upload-comision.page';

describe('UploadComisionPage', () => {
  let component: UploadComisionPage;
  let fixture: ComponentFixture<UploadComisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
