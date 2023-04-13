import { useSelector } from "react-redux";
import { getLoaderStatus } from "../reducers/loaderSlice";

export const Header = () => {

  const { loader } = useSelector(getLoaderStatus);

  return (
    <header>

      <div className='logo'>
        <div className={`basket-ball ${loader ? 'rotate' : ''}`}>
          <div className="line two" />
          <div className="line one" />
        </div>
      </div>

      <p className='text-left pt-2 text-xl leading-5'>
        <span className='text-3xl font-bold'>
          NBA
        </span>
        <br />
        Team Builder
      </p>
      
    </header>
  )

}