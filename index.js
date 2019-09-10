import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
import expressGraphQL from "express-graphql"
import cors from "cors"

import schema from "./schema"

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true, })
    .then(res => console.log("connected to mongoose instance"))
    .catch(er => console.log("failed to connect to mongoose instance"));

app.use('/graphql', cors(), (req, res) => {
    expressGraphQL({
        schema,
        graphiql: true,
    })(req, res)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(PORT));
