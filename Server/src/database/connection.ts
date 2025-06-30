import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database : process.env.DB_NAME,
  username : process.env.DB_USER,
  password : process.env.DB_PASS,
  host : process.env.DB_HOST,
  dialect : "mysql",
  port : Number(process.env.DB_PORT),
  models: [__dirname + "/models"], // Path to your models directory
});


sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });


sequelize.sync({alter:false})
.then(()=>{
    console.log("migrated successfully new changes")
})
.catch((error) => {
    console.error("Error synchronizing models:", error);
});

export default sequelize;
