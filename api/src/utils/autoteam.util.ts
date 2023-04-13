export const courtPosition: string[] = ['PG', 'SG', 'SF', 'PF', 'C']
export const numPlayers: number = courtPosition.length;
export const calculateAverage = (points: number, games: number): number => points / games;

export const getRandomInt = (
  min: number, 
  max: number
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const unifyStatsByPlayerAndPos = (
  stats: IPlayerStats[]
): IPlayerStats[] => {
  return stats.reduce((acc: IPlayerStats[], current: IPlayerStats) => {
    const existing = acc.find((item) => item.name === current.name);
    if (existing) {
      if (existing.position !== current.position) {
        acc.push(current);
      } else {
        existing.games += current.games;
        existing.points += current.points;
        existing.age = Math.max(existing.age, current.age);
      }
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
}

export const getPlayersByPoints = (
  dataSet: IPlayerStats[],
  estimatedPoints: number, 
  pos: PositionType,
  offset: number
): IPlayerStats[] => {
  
  var players = dataSet.filter((p: any) => {
    const eqPos = p.position === pos
    const upperThan = p.points > (estimatedPoints - offset)
    const lowerThan = p.points < (estimatedPoints + offset)
    return eqPos && upperThan && lowerThan
  })
  return players;
}

export const sortPlayers = (
  players: IPlayerStats[]
): IPlayerStats[] => {
  const sortedPlayers: IPlayerStats[] = players.sort((a: any, b: any) => {
  
    // Average points per game, being considered the most important metric
    const aAvg = calculateAverage(a.points, a.games);
    const bAvg = calculateAverage(b.points, b.games);
    if (aAvg > bAvg) return -1;
    if (aAvg < bAvg) return 1;
  
    // Younger is the second important metric
    if (a.age < b.age) return -1;
    if (a.age > b.age) return 1;
  
    // For same average and age, order by points
    if (a.points > b.points) return -1;
    if (a.points < b.points) return 1;
  
    return 0;
  });

  return sortedPlayers
}

export const pickNumbersToSum = (
  array: IPlayerStats[],
  value: number
): IPlayerStats[] => {

  // The dp array is a two-dimensional array where dp[i][j] is `true` only if there is 
  // a subset of the first `i` elements of the sorted array that add up to `j`

  const sortedArray: IPlayerStats[] = array.sort((a: any, b: any) => b.points - a.points);
  const dp = new Array(sortedArray.length + 1).fill(null).map(() => new Array(value + 1).fill(false));
  dp[0][0] = true;

  for (let i = 1; i <= sortedArray.length; i++) {
    for (let j = 0; j <= value; j++) {
      if (j < sortedArray[i - 1].points) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - sortedArray[i - 1].points];
      }
    }
  }

  if (!dp[sortedArray.length][value]) {
    // If the dp[sortedArray.length][value] is false, it means that we couldn't find a combination 
    // of numbers that add up to the predefined value
  }

  const result = [];

  for (let pos of courtPosition) {
    let bestItem = null;
    let bestScore = -1;

    for (let i = sortedArray.length; i > 0; i--) {
      if (dp[i][value] && sortedArray[i - 1].position === pos && sortedArray[i - 1].points > bestScore) {
        bestItem = sortedArray[i - 1];
        bestScore = sortedArray[i - 1].points;
      }
    }

    if (bestItem) {
      result.push(bestItem);
      value -= bestItem.points;
    }
  }

  return result;
}

// export const generateDummyData = (numPlayers: number) => {
//   const firstNames = ['LeBron', 'Stephen', 'Kevin', 'Anthony', 'James', 'Kawhi', 'Giannis', 'Kyrie', 'Chris', 'Damian'];
//   const lastNames = ['James', 'Curry', 'Durant', 'Davis', 'Harden', 'Leonard', 'Antetokounmpo', 'Irving', 'Paul', 'Lillard'];
//   const positions = ['PG', 'SG', 'SF', 'PF', 'C']
//   const data = [];
//   for (let i = 0; i < numPlayers; i++) {
//     const age = Math.floor(Math.random() * 10) + 20; // Random age between 20 and 29
//     const games = getRandomInt(4,90); 
//     const points = getRandomInt(80,800); 
//     const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]; // Random first name from array
//     const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]; // Random last name from array
//     const name = firstName + ' ' + lastName;
//     const position = positions[Math.floor(Math.random()*positions.length)];
//     data.push({ name, position, age, games, points });
//   }
//   return data;
// }