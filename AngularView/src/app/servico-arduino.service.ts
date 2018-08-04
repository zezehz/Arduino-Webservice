import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


import { DadosArduino } from './dadosarduino';
import { InformacoesArduino } from './informacoesArduino';

const URLBASE: string = 'http://192.168.1.5:3000';


/***
 * 
 * Tutorial para a parte de Http:
 * https://www.concretepage.com/angular-2/angular-2-http-get-example#http-get
 * 
 */

@Injectable()
export class ServicoArduinoService {

  textoDisplay: string = '';

  constructor(private http:Http, private httpClient: HttpClient ) { }

/*
  postDadosInformacoes( informacoes: InformacoesArduino ): Observable< InformacoesArduino > {
    return this.httpClient.get<InformacoesArduino>(URLBASE+'/informacoes'+ informacoes);
  }
*/
  postDadosInformacoes( informacoes: InformacoesArduino ): Promise<InformacoesArduino> {
    return this.httpClient.post<InformacoesArduino>(URLBASE+'/infor', informacoes).toPromise()
    .catch(this.handleErrorPromise);
  }
  
  getDadosTempo( ): Promise<DadosArduino> {
    return this.http.get(URLBASE+'/dadosTempo').toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

}
