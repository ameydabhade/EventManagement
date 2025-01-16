import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'


const app = new express();

app.listen(5800,(req,res)=>{
    console.log("Server is Up at 5800")
})