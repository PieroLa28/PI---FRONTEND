import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProyectoAddComponent } from './gestionar-proyecto-add.component';

describe('GestionarProyectoAddComponent', () => {
  let component: GestionarProyectoAddComponent;
  let fixture: ComponentFixture<GestionarProyectoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarProyectoAddComponent]
    });
    fixture = TestBed.createComponent(GestionarProyectoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
