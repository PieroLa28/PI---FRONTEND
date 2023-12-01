import { TestBed } from '@angular/core/testing';

import { ProyectosEtapaService } from './proyectos-etapa.service';

describe('ProyectosEtapaService', () => {
  let service: ProyectosEtapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectosEtapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
