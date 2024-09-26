import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServiceService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // Método para obtener personajes
  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }

  // Método para obtener detalles de un episodio usando su URL
  getEpisode(url: string): Observable<any> {
    return this.http.get(url);
  }
}
