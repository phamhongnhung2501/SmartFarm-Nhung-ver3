const mongoose = require('mongoose');
const configDB = require('../../config/database');
const logColor = require('../../src/untils/logColor');
const seeds = require('../../config/seeds');
const lodash = require('lodash');
//
// mongoose.connect(configDB.setting.url, configDB.options).then(
//     () => {console.log('Successfully connected to '+logColor(`color:green${configDB.setting.url}`));},
//     err => {console.error( Error(` Unable to connect to database \n${err}`) );}
// );

const Seed = require('../../src/controllers/farm/seeds/models/seeds');

function difference(oldObj, newObj) {
    return lodash.transform(oldObj, (result, value, key) => {
        if (!lodash.isEqual(value, newObj[key])) {
            result[key] = lodash.isObject(value) && lodash.isObject(newObj[key]) ? difference(value, newObj[key]) : newObj[key];
        }
    });
}

async function checkExist(newObj){
    try {
        let oldObj = await Seed.findOne({seed: newObj.seed},{_id:0}).lean();
        if(!oldObj) await Seed.create(newObj);
        else{
            let diff = difference(oldObj, newObj);
            if(!lodash.isEmpty(diff)) await Seed.findOneAndUpdate({seed:newObj.seed},newObj)
        }
    }catch (err) {
        throw err
    }
}

async function newSeed() {
    try{
        await checkExist(seeds.tomato);
        await checkExist(seeds.pakchoi);
        await checkExist(seeds.brassica);
        await checkExist(seeds.cucumber);
        await checkExist(seeds.cabbage);
    }catch (err) {
        throw err
    }
}

module.exports = {
    newSeed
};
