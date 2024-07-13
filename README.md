### Technology Stack
Front End: React.js was chosen as the Front End framework due to the fact that React applications are relatively easy to set up and work with. There is also React experience within the team.
Back End: Express.js was chosen as the Back End framework due to the fact that it provides a light weight solution to creating a backend HTTP server
Database: MongoDB was chosen as the Database for this project as it is the primary focus of the project. 

### Process
The database was loaded using mongoimport for both the CSV data and GridFS to upload the images. 

Challenges faced include: 
- Updating each document with its specific coordinates based on the U.S. state listed in that document
- Pruning out the coordinates that were listed as [#N/A, #N/A]
- Figuring out a way to link each document to its respective image

### Volume

CarFiends> db.CarPrices.countDocuments()

63412

CarFiends> db.fs.chunks.countDocuments()

194

CarFiends> db.fs.files.countDocuments()

13

### Variety
Overall, we did not find any particularly interesting car listings. However, it is interesting to see how similar different vehicles can be in terms of their safety features, such as Pedestrian Detection. 

### Bells and Whistles
Overall, we feel like we worked efficiently and communicated effectively. The application seems aesthetically pleasing, and the database is well-organized. 
