import { getPlayersData, getPlayersDataByName } from "../services/players.service"

export const getPlayers = async (page: number): Promise<IPlayer[]> => {
    return await getPlayersData(page)
}

export const getPlayersByName = async (searchTerm: string, page: number): Promise<IPlayer[]> => {
    return await getPlayersDataByName(searchTerm, page)
}
