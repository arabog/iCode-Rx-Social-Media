
Notes:
npm add express mongoose dotenv helmet 
morgan nodemon

npm add bcrypt


Errors:
MongooseError: The `uri` parameter to `openUri()` 
must be a string, got "undefined". Make sure the first 
parameter to `mongoose.connect()` or 
`mongoose.createConnection()` is a string.
Soln:
Move d env file inside d folder containing index.js

UnhandledPromiseRejectionWarning: MongooseError: Operation 
`users.insertOne()` buffering timed out after 10000ms
Soln:
Add or modified wt u have to ds: 
mongoose
          .connect(process.env.MONGO_URL,  { 
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
          })
          
          .then(() => console.log("Connected to MongoDB"))
          .catch(err => console.error(err))

Cannot read property 'split' of null
Soln:
Remove d quote ard d db url in .env file

 UnhandledPromiseRejectionWarning: MongoError: E11000 duplicate key error collection: social.users index: email_1 dup key: { email: "john@gmail.com" }
Soln:
ds is bcos u r trying to send d same req twice



