import { TestBed } from '@angular/core/testing';

import { TipoProyectosService } from './tipo-proyectos.service';

describe('TipoProyectosService', () => {
  let service: TipoProyectosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProyectosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
