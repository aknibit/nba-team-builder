import { emptyOrRows, getOffset } from "../utils/db.util";
import { query } from "./db.service";

export const getPlayersData = async (
  page: number = 1
): Promise<IPlayer[]> => {

  const resultsPerPage = 10
  const offset = getOffset(page, resultsPerPage)
  const rows = await query(
    `SELECT p.id, p.player as name, s.pos as position, SUM(s.points) AS points FROM players p 
     INNER JOIN stats s ON p.id = s.playerID 
     GROUP BY s.playerID, s.pos
     ORDER BY p.id
     LIMIT ?,?`, 
    [offset, resultsPerPage]
  )
  return emptyOrRows(rows)
}

export const getPlayersDataByName = async (
  searchTerm: string, 
  page: number = 1
): Promise<IPlayer[]> => {

  const resultsPerPage = 10;
  const offset = getOffset(page, resultsPerPage)
  const rows = await query(
    `SELECT p.id, p.player as name, s.pos as position, SUM(s.points) AS points FROM players p 
     INNER JOIN stats s ON p.id = s.playerID 
     WHERE p.player LIKE ?
     GROUP BY s.playerID, s.pos
     ORDER BY p.id
     LIMIT ?,?`, 
     [`%${searchTerm}%`, offset, resultsPerPage]
  )
  return emptyOrRows(rows)
}

