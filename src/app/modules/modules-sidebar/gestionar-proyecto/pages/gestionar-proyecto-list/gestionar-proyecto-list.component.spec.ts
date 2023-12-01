import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProyectoListComponent } from './gestionar-proyecto-list.component';

describe('GestionarProyectoListComponent', () => {
  let component: GestionarProyectoListComponent;
  let fixture: ComponentFixture<GestionarProyectoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarProyectoListComponent]
    });
    fixture = TestBed.createComponent(GestionarProyectoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
