# NBA Team builder

To run the application, just run

```
docker-compose up
```

...and it will run database (`port 3306`), backend (`port 3200`) and frontend (`port 3100`) automatically. Once all 3 containers are up, yhe app will be available here:

```
http://localhost:3100
```

Besides the required tecnology for this assignment, I've used the following packages

### Backend
- mysql2
- nodemon

### Frontend
- redux
- axios
- sass
- tailwind

---

## DATASET

First step was to use Excel with autofilters to detect inconsistencies (empty or wrong values), and then export with field delimiters to avoid problems importing to SQL.

The most relevant inconsistency was related to the position of some players. Some of them didn't match one of the 5 defined categories, and some of them are in more than one position. I've update the ones that didn't match checking https://nbahoopsonline.com/History/Leagues/NBA/drafts/undrafted.html, but there are still some players in more than one category (f.e. if you search for Michael Jordan, you will find one Shooting Guard and another one as Small Forward).

The app uses just 2 tables. One with single entries for all the players, and another one with all the stats, where I've add and additional column (playerID) to allow performant joins to get the position of the players while showing them on the UI.
Some indexes are in place to improve performance on both tables.

---
## UI

Proposed solution is a single page where we'll find a listing of players (with search capabilities by name and pagination) from where you will be able to pick up any player to add it to your *dream team*, taking into account position and total points.

The *dream team* is formed by one player for each position, and if you try to add a new one, the previous one will be overwritten.

If you want to generate the list automatically, you will find an option to generate a team according to a desired total of points. Here we have 2 options:
>--- 
>* **Exact points** - Will normally create a team to match the exact quantity of points. It will not create an equilibrate team, meaning that may be a big difference in terms of points between one player and another (does not work well with low quantities).
> * **Not exact points** - It will be quicker, and every player will have similar points, but normally will not sum the desired quantity of points.
>---

## BACKEND

### The most relevant piece of code on the backend is the team builder. 

First step was to get all the stats from DB, and then unify every stat for a single player (taking into account that if we have the same name and different positions, they will not be unified). If it is the same player or not, is something I did not took into consideration for this assignment, as far as it may be a different person with same name. 
> About the relevance of the metrics, I've consider that the most important one was the **average of points** per match, then **age**, and finally the total amount of **points** of a player.

Once points are unified, and for performance reason, the code prepares a subset of players where their points will be around 1/5 of the total points, wiht some deviation, up and down:

- If we are querying for **exact points**, the offset (deviation) of this 1/5 will be huge, and the dataset bigger
- If we query for a more equilibrate team (**not exact points**) the offset will be narrow, with less quantity of player, and will perform better.

Once we have the subset of data, we can start building the team. I used dynamic programming to find the combination of numbers that add up to the desired quantity of points. Firstly I tried with decision tree, that "may be" a more suitable solution, but I didn't have experience with it and I finally used the most handy solution for me.

While coding, I saw how node was failing due to memory issues, and I configured ```ENV NODE_OPTIONS=--max-old-space-size=8192``` on Dockerfile to avoid any further problem. There were no more memory problem since then.

Besides the team builder, I consider that is a pretty straigh forward backend, with a couple of controllers consulting MySQL.

---
## FINAL THOUGHTS

### What tech stack I'll use if we need to scale big?

I consider that Node/Typescript is an accurate decision to build scalable application, and because my personal experience, I'll like to build it on AWS.

About database, taking into account that we will need to store large amounts of data and real-time updates, **AWS Redshift** could be a good solution. It's petabyte scale, real time ingestion and has analytics and ML capabilities. It's a plus that is serverless and we can query using SQL flavours. I was tempted to say BigQuery... and I'm sure is a viable solution, but I don't know much about it yet.

About the UI, I will just build the app and serve it throug a CDN. **S3/Cloudfront** may be a perfect solution. If we need Google indexing our content we may need to think on NextJS, but with this quantity of data could be a little bit tricky to build and mantain.

About the backend, my first guess will be to use Lambdas functions, but I guess it will depend on how intensive can be, and dockerized solution with a load balancer can be a better fit (Fargate and ALB). Some cache may be interesting to save money and improve performance, but it may require some extra analysis to take this decision.

### Why do we need unit testing, if we are covered with integration/e2e tests

The most important reason is probably to avoid breaking the code. Spend time debugging errors once the code is deployed can be exhausting and time consuming, and doing it is cheap to code and run... but there are a few reason where is not possible:
* code is no testable
* lack of time
* lack of experience


