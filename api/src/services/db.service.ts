const mysql = require('mysql2');
const dbConfig = require('../configs/db.config');

export async function query(
  sql: string,
  params: (string|number)[]
) {
  
  const queryPromise = () =>{
    return new Promise((resolve, reject)=>{
      connectionPool.query(
        sql, 
        params, 
        (error: object, results: object) => {
          connectionPool.end()
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  };
  
  const connectionPool = mysql.createConnection(dbConfig);
  // console.log(`🟩 DB interaction ${sql}`)

  try {
    return await queryPromise();
  } catch(error) {
    console.log(error)
  }
  
}