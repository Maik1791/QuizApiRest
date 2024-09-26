import { Component, OnInit } from '@angular/core';
import { RickAndMortyServiceService } from '../rick-and-morty.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.css']
})
export class RickAndMortyComponent implements OnInit {

  characters: any[] = [];
  selectedCharacterEpisodes: any[] = [];
  selectedCharacterName: string = '';
  selectedCharacterId: number | null = null;  // Nuevo: Para controlar si el mismo personaje es clicado nuevamente

  constructor(private rickAndMortyService: RickAndMortyServiceService) { }

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
      console.log(this.characters);
    });
  }

  onCharacterClick(character: any): void {
    console.log('Personaje clicado:', character.name);
    // Si el personaje clicado es el mismo, oculta los episodios
    if (this.selectedCharacterId === character.id) {
      this.selectedCharacterId = null;
      this.selectedCharacterEpisodes = [];
      this.selectedCharacterName = '';
      return;
    }

    // Si es un nuevo personaje, guarda su ID, nombre y carga sus episodios
    this.selectedCharacterId = character.id;
    this.selectedCharacterName = character.name;
    const episodeUrls = character.episode;

    const episodeRequests = episodeUrls.map((url: string) => this.rickAndMortyService.getEpisode(url));

    forkJoin(episodeRequests).subscribe((episodes: any[]) => {
      this.selectedCharacterEpisodes = episodes;
      console.log(this.selectedCharacterEpisodes); 
    });
  }
}
