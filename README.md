# Overview
This demo illustates how to implement offsets in your Apollo GraphQL endpoint in order to support paging.

# Disclaimer
This is purely for educational purposes. The app is not secure, the data store is in memory, and the approach used here won't scale. The concepts here can easily be adapted to a real world system. 

# Installing
- Clone the repo. 
- Run `npm install` (or use yarn) in the folder. 

# Running
- `npm start`
- After the server is running open "http://localhost:4000"
- The graphiql editor will open. 

# Walkthrough

## Query 1 - Retrieving the first set of results
Issue the following query to get the first set of results
```
{
  books( 
    limit:3
  ) {
      title
      author
      description
  }
}
```
![query-1](https://user-images.githubusercontent.com/141124/92410048-a855b900-f0f7-11ea-8c04-7a5421730b7e.png)

## Query 2 - Getting the next set of results
Using the `offset` param you can get the next page of results
```
{
  books( 
    limit:3,
    offset:3
  ) {
      title
      author
      description
  }
}
```
![query-2](https://user-images.githubusercontent.com/141124/92410297-8872c500-f0f8-11ea-8df8-73353b3c2601.png)
