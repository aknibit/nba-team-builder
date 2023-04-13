
import './App.scss';
import { PlayerList } from './components/PlayerList';
import { SelectedTeam } from './components/SelectedTeam';
import { AutoTeam } from './components/AutoTeam';
import { Header } from './components/Header';

const App = () => (
  <>
    <Header />
    <main>

      <div className='players-area'>
        <PlayerList />
      </div>

      <div className='team-area'>
        <AutoTeam />                    
        <SelectedTeam /> 
      </div>

    </main>
  </>
);

export default App;
