// const mongoose = require('mongoose');
const response = require('../../base/response');
const Information = require('../information/models/info');
const Seed = require('../seeds/models/seeds');
const gateway = require('../../../../config/seeds').gateway;

async function getSeeds(req, res){
    try {
        let seeds = await Seed.find({}).distinct("seed");
        response.ok(res, seeds)
    }catch (err) {
        response.internal(res, err)
    }
}

async function newSeed(req, res){
    try{
        let {stage_1_days, stage_2_days, stage_3_days, stage_4_days}= req.body;
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");
        if(stage_1_days===0||stage_2_days===0||stage_3_days===0||stage_4_days===0) return response.badData(res, "Days >= 0!!!");
        let existed_seed = await Seed.findOne({seed: req.body.seed});
        if(existed_seed) return response.badData(res, "Seed is existed!!!");
        let seed = await Seed.create(req.body);
        response.ok(res, seed)
    }catch(err){
        response.internal(res, err)
    }
}

async function getSeed(req, res){
    try{
        let seed = await Seed.findOne({seed: req.params.seed});
        response.ok(res, seed)
    }catch(err){
        response.internal(res, err)
    }
}

async function getSensor(req, res){
    try{
        let gate = gateway;
        let subs = await Information.find({}).distinct("sub_id");
        for(let i=0;i<subs.length;i++){
            gate = gate.filter(item => item !== subs[i])
        }
        response.ok(res, gate)
    }catch(err){
        response.internal(res, err)
    }
}


module.exports={
    getSeeds,
    getSeed,
    getSensor,
    newSeed
};