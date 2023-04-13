import { useEffect, useState } from "react";
import { api } from "../config/constants";
import { get } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { getAutoTeamStatus, setC, setPF, setPG, setSF, setSG } from "../reducers/autoTeamSlice";
import { IPlayer } from "../config/interfaces";
import { setLoader } from "../reducers/loaderSlice";

const dynamicUrl = (
  term?: string
): string => {
  const uri = (term) ? api.url.PLAYERSBYTERM : api.url.PLAYERS
  let path = `${api.host}${uri}`;
  return (term) ? path.replace('{term}', term) : path;
}

export const PlayerList = () => {

  const dispatch = useDispatch();
  const { PG, SG, SF, PF, C } = useSelector(getAutoTeamStatus);  
  const [players, setPlayers] = useState<IPlayer[]>()
  const [page, setPage] = useState<number>(1)
  const [url, setUrl] = useState<string>(dynamicUrl())

  const getPlayers = async (path: string) => {
    dispatch(setLoader(true))
    const response: (IPlayer[]) = await get<any>(path);
    setPlayers(response);
    dispatch(setLoader(false))
  }
  
  useEffect(() => {
    const path = url.replace('{page}', page.toString())
    getPlayers(path);  
  }, [url, page])

  const searchByTerm = (term: string) => {
    setPage(1)
    const dynamic = dynamicUrl(term)
    setUrl(dynamic);
  } 

  const checkAssignedPlayer = (player: IPlayer): boolean => {
    const name = player.name
    let assigned: boolean = false
    if (player.position === 'PG') assigned = (PG && PG.name === name)
    if (player.position === 'SG') assigned = (SG && SG.name === name)
    if (player.position === 'SF') assigned = (SF && SF.name === name)
    if (player.position === 'PF') assigned = (PF && PF.name === name)
    if (player.position === 'C')  assigned = (C && C.name === name)
    return assigned
  }

  const addToTeam = (player: IPlayer) => {
    if (player.position === 'PG') dispatch(setPG(player));
    if (player.position === 'SG') dispatch(setSG(player));
    if (player.position === 'SF') dispatch(setSF(player));
    if (player.position === 'PF') dispatch(setPF(player));
    if (player.position === 'C')  dispatch(setC(player));
  }

  const addButton = (player: IPlayer): JSX.Element => {
    const assigned = checkAssignedPlayer(player)
    return (
      <button
        className={`border-[0.5px] px-3 hover:bg-slate-400 hover:text-black ${assigned ? 'disabled' : ''}`}
        onClick={() => addToTeam(player)}
      >
        {!assigned && <>ADD</>}
        {assigned && <>ADDED</>}
      </button>
    )
  }

  return (
    <>
      <div className="mb-3">
        <input 
          placeholder="Search players by name"
          className='px-3 py-1 text-black'
          onChange={(input: React.ChangeEvent<HTMLInputElement>) => searchByTerm(input.currentTarget.value)} 
        />
      </div>
      
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Player</th>
            <th scope="col" className="px-6 py-3">Position</th>
            <th scope="col" className="px-6 py-3">Total points</th>
            <th scope="col" className="px-6 py-3 w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          {players && players.map((p: IPlayer, i: number) => (
            <tr className="border-b bg-gray-800 border-gray-700" key={i}>
              <td className="px-6 py-2">{p.id}-{p.position}</td>
              <th scope="row" className="px-6 py-2 font-medium  whitespace-nowrap text-white">{p.name}</th>
              <td className="px-6 py-2">{p.position}</td>
              <td className="px-6 py-2">{p.points}</td>
              <td className="px-6 py-2 w-40">{addButton(p)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          disabled={page < 2} 
          onClick={() => setPage(page - 1)}
        >
          {'<'}
        </button>
        <span>{page}</span>
        <button 
          disabled={players && (players.length < 10)} 
          onClick={() => setPage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </>
  ); 

};
