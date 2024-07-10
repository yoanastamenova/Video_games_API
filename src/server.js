// const express = require('express')       //legacy import
import express from 'express';
import 'dotenv/config'

const app = express()              

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server running! ${PORT}`)
})