import { ServicoArduinoService } from './../servico-arduino.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'

import { DadosArduino } from './../dadosarduino';
import { InformacoesArduino } from './../informacoesArduino';


@Component({
  selector: 'app-display16x2',
  templateUrl: './display16x2.component.html',
  styleUrls: ['./display16x2.component.css']
})

export class Display16x2Component implements OnInit {

  promiseArduino: Promise<DadosArduino>

  textoDisplay: string;
  errorMessage: String;
  alive = true;

  dados: DadosArduino = {
    temperatura: '25',
    umidade: '75'
  };

  informacoes: InformacoesArduino = {
    led1: '0',
    led2: '0',
    led3: '0',
    led4: '0',
    mensagen: ''
  };

  constructor( private servicoArduinoService: ServicoArduinoService ) {
    this.servicoArduinoService = servicoArduinoService;
  
    Observable.timer(0,3000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.promiseArduino = this.servicoArduinoService.getDadosTempo( );
      this.promiseArduino.then(
        dados => this.dados = dados,
        error =>  this.errorMessage = <any>error
      );
    });
   }

  ngOnInit() {
  }

  enviar( ): void {
    if( '' != this.textoDisplay )
      this.informacoes.mensagen = this.textoDisplay;

    console.log(this.informacoes);
    this.servicoArduinoService.postDadosInformacoes(this.informacoes);
    this.textoDisplay = '';
  }

  onOffLed( ): void {
    this.servicoArduinoService.postDadosInformacoes(this.informacoes);
  }

}
