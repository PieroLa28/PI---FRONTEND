import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProyectoEditComponent } from './gestionar-proyecto-edit.component';

describe('GestionarProyectoEditComponent', () => {
  let component: GestionarProyectoEditComponent;
  let fixture: ComponentFixture<GestionarProyectoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarProyectoEditComponent]
    });
    fixture = TestBed.createComponent(GestionarProyectoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
