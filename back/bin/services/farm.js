const Data = require('../../src/controllers/farm/data/models/data');

async function saveData(obj){
    try{
        await Data.create(obj)
    }catch(err){
        throw err
    }
}

module.exports={
    saveData
};