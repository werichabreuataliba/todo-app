const express = require('express')

module.exports = function(server){
    
    //API routes
    const router = express.Router()
    server.use('/api', router)
    
    //TODO routes    
    const todoSerivce = require('../api/todo/todoService')    
    todoSerivce.register(server,'/todos')
    
}