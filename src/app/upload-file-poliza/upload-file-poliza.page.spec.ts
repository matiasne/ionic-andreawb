import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadFilePolizaPage } from './upload-file-poliza.page';

describe('UploadFilePolizaPage', () => {
  let component: UploadFilePolizaPage;
  let fixture: ComponentFixture<UploadFilePolizaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilePolizaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadFilePolizaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
