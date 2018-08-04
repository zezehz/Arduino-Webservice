import { TestBed, inject } from '@angular/core/testing';

import { ServicoArduinoService } from './servico-arduino.service';

describe('ServicoArduinoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoArduinoService]
    });
  });

  it('should be created', inject([ServicoArduinoService], (service: ServicoArduinoService) => {
    expect(service).toBeTruthy();
  }));
});
