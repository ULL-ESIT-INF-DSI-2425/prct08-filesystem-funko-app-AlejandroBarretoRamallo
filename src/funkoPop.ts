export enum funkoType  {
  POP,  PPO_RIDES, VYNIL_SODA, VYNIL_GOLD
} 

export enum gender {
 ANIMACION, PELICULAS_Y_TV, VIDEOJUEGOS, DEPORTES, MUSICA, ANIME
} 

export interface FunkoPop {
  id: number,
  nombre: string,
  descripcion: string,
  tipo: funkoType,
  genero: gender,
  franquicia: string,
  numero: number,
  esExclusivo: boolean,
  caracteristicasEspeciales: string,
  valorMercado: number
}
