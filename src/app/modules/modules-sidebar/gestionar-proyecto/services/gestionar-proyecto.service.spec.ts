import { TestBed } from '@angular/core/testing';

import { GestionarProyectoService } from './gestionar-proyecto.service';

describe('GestionarProyectoService', () => {
  let service: GestionarProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
