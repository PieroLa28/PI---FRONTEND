import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosCreadosComponent } from './proyectos-creados.component';

describe('ProyectosCreadosComponent', () => {
  let component: ProyectosCreadosComponent;
  let fixture: ComponentFixture<ProyectosCreadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosCreadosComponent]
    });
    fixture = TestBed.createComponent(ProyectosCreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
