import { useState } from "react";
import { api } from "../config/constants";
import { get } from "../axios";
import { useDispatch } from "react-redux";
import { setC, setPF, setPG, setSF, setSG } from '../reducers/autoTeamSlice';
import { IPlayer } from "../config/interfaces";
import { setLoader } from "../reducers/loaderSlice";

export const AutoTeam = () => {

  const dispatch = useDispatch();
  const [points, setPoints] = useState<string>('');
  const [exact, setExact] = useState<boolean>(false);

  const cleanUpData = (): void => {
    dispatch(setPG({ position: 'PG'}));
    dispatch(setSG({ position: 'SG'}));
    dispatch(setSF({ position: 'SF'}));
    dispatch(setPF({ position: 'PF'}));
    dispatch(setC({ position: 'C'}));
  }

  const generateTeam = async () => { 
    
    if (!points) {
      alert("Please, fill up the desired amount of points")
      return
    }
    
    dispatch(setLoader(true))
    cleanUpData()
    
    const exactQS = (exact) ? 'exact' : 'equilibrate';
    let url = `${api.host}${api.url.AUTOTEAM}`;
    url = url.replace('{points}', points)
    url = url.replace('{exact}', exactQS)

    const response: IPlayer[] = await get(url);
    response.forEach((player: IPlayer) => {
      if (player.position === 'PG') dispatch(setPG(player));
      if (player.position === 'SG') dispatch(setSG(player));
      if (player.position === 'SF') dispatch(setSF(player));
      if (player.position === 'PF') dispatch(setPF(player));
      if (player.position === 'C')  dispatch(setC(player));
    });    
    dispatch(setLoader(false))
  }

  return (
    <>
      <div className="auto-team-box">
        <div className='colored-box !h-[200px]'>

          <h2 className="text-black text-center font-bold mb-2">
            How many points do your team needs?
          </h2>
          <div className="flex">
            <input 
              placeholder="f.e. 80000"
              className='w-full px-3 py-2 mb-2 text-black outline-none' 
              onChange={(input: React.ChangeEvent<HTMLInputElement>) => setPoints(input.currentTarget.value)} 
            />
            <span className="bg-white h-10 text-xs leading-3 pt-[7px] text-gray-900 ">Exact points</span>
            <div className="bg-white h-10">
              <label className="relative inline-flex items-center cursor-pointer top-2 right-2">
                <input type="checkbox" value="" className="sr-only peer" onChange={() => setExact(!exact)}  />
                <div className="selector peer" />
              </label>
              
            </div>
          </div>
          
          <div className="text-xs text-black leading-4">
            Exact points will create less equilibrate teams (and will be slower).
          </div>
          <div className="w-full text-center mt-3">
            <button 
              className="bg-black px-6 py-2 rounded-full border-2 border-black hover:bg-transparent hover:text-black"
              onClick={generateTeam}
            >
              Generate team
            </button>
          </div>

        </div>
      </div>
    </>
  ); 

};
