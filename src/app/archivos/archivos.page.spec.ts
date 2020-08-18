import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArchivosPage } from './archivos.page';

describe('ArchivosPage', () => {
  let component: ArchivosPage;
  let fixture: ComponentFixture<ArchivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
