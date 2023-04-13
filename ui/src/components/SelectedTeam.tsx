import { useDispatch, useSelector } from "react-redux";
import { getAutoTeamStatus, setC, setPF, setPG, setSF, setSG } from "../reducers/autoTeamSlice";
import { IPlayer } from "../config/interfaces";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const SelectedTeam = () => {
  const dispatch = useDispatch();
  const { PG, SG, SF, PF, C } = useSelector(getAutoTeamStatus);

  const points: (number|undefined)[] = [PG, SG, SF, PF, C].map(p => p && p.points) 
  const assignedValues: number[] = points.filter(notEmpty)
  const allPoints: number = assignedValues.reduce((a, b) => a + Number(b), 0) 

  const removePlayer = (pos: string) => {
    if (pos === 'PG') dispatch(setPG({ position: 'PG' }));
    if (pos === 'SG') dispatch(setSG({ position: 'SG' }));
    if (pos === 'SF') dispatch(setSF({ position: 'SF' }));
    if (pos === 'PF') dispatch(setPF({ position: 'PF' }));
    if (pos === 'C')  dispatch(setC({ position: 'C' }));
  }

  return (
    <>
      <div className="flex my-4">
        <h2 className="flex-grow text-2xl">Your dream team...</h2>  
        <span className="pt-1">{allPoints} points</span>
      </div>

      {[PG, SG, SF, PF, C].map((pos: IPlayer, index: number) => {
        return (
          <div className='squared flex h-10' key={index}>
            <div className="pos">
              {pos.position}
            </div>
            <div className="name">
              {pos.name}
            </div>
            <div className="points">
              {pos.points}
              {pos.points &&
                <button className="text-red-300" onClick={() => removePlayer(pos.position)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 pt-[5px] ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              }
            </div>
          </div>
        )
      })}

    </>
  ); 
};
