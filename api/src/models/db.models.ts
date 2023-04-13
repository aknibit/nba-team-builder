type PositionType = 'PG'|'SG'|'SF'|'PF'|'C';

interface IPlayer {
    id: number,
    player: string
}

interface IPlayerStats {
    name: string,
    position: string,
    age: number,
    games: number,
    points: number
}
