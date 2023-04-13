import { getStats } from "../services/autoteam.service";
import { 
  courtPosition, 
  // generateDummyData, 
  getPlayersByPoints, 
  numPlayers, 
  pickNumbersToSum, 
  sortPlayers,
  unifyStatsByPlayerAndPos 
} from "../utils/autoteam.util";

export const getAutoTeam = async (points: number, exact: boolean): Promise<IPlayerStats[]> => {

  const estimatedPointsByPlayer: number = points/numPlayers
  const multiplier = (exact) ? 5 : 0.5
  let pointsOffset: number = estimatedPointsByPlayer * multiplier

  // WHILE DEV, generate some dummy data
  // const players = generateDummyData(30000)
  // const sortedPlayers: IPlayerStats[] = sortPlayers(players) 

  const stats: IPlayerStats[] = await getStats();
  const unifiedStats: IPlayerStats[] = unifyStatsByPlayerAndPos(stats)  
  const sortedStats: IPlayerStats[] = sortPlayers(unifiedStats)

  const smallSubset: IPlayerStats[] = []
  courtPosition.forEach((pos) => {
    const position = pos as PositionType
    const players = getPlayersByPoints(
      sortedStats,
      estimatedPointsByPlayer,
      position,
      pointsOffset
    )
    smallSubset.push(...players)
  })

  return pickNumbersToSum(smallSubset, points)
}

