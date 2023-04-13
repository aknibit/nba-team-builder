export interface IPlayer {
  id?: number;
  name?: string;
  position: string;
  age?: number;
  games?: number; 
  points?: number;
}
  
export interface AutoTeamState {
  PG: IPlayer
  SG: IPlayer
  SF: IPlayer
  PF: IPlayer
  C: IPlayer
}