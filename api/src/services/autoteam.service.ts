import { emptyOrRows } from "../utils/db.util";
import { query } from "./db.service";

export const getStats = async (): Promise<IPlayerStats[]> => {
  const rows = await query(
    `SELECT player as name, pos as position, age, games, points 
     FROM stats`,
    []
  );
  return emptyOrRows(rows);
}

