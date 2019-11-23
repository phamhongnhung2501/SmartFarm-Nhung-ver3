const mongoose = require('mongoose');
const response = require('../../base/response');
const Information = require('./models/info');
const User = require('../../user/models/users');
const Seed = require('./models/seeds');
const Stage = require('./models/stage');
const serializer = require('../../base/serializer');
const lodash = require('lodash');
const validator = ["stage_days","min_temp","max_temp","min_light","max_light","min_PH","max_PH",
                    "min_soil_moisture","max_soil_moisture","min_hum","max_hum"];
const validator_farm = ["name", "seed", "stage_1","stage_3","stage_4"];
const gateway = require('../../../../config/seeds').gateway;

/** Get some info of farms*/
async function getSubstation(req, res) {
    try{
        let full_infos = [];
        let farms = req.user.farms;
        for(let i=0;i<farms.length;i++){
            let info = await Information.findOne({sub_id: farms[i]});
            if(info) full_infos.push(await serializer.convertOutput(info))
        }
        response.ok(res, full_infos);
    }catch(err){
        return response.internal(res, err)
    }
}

/** Get information of farm*/
async function getSubById(req, res) {
    try{
        let info = await Information.findOne({sub_id: req.params.sub_id});
        if(!info) return response.notFound(res, "Farm doesn't exists!!!");
        if(!req.user.farms.includes(req.params.sub_id)) return response.forbidden(res, "Permission Denied!!!");
        let full_info = await serializer.convertOutput(info);
        return response.ok(res, full_info);
    }catch(err){
        console.log(err)
        return response.internal(res, err)
    }
}


async function newSubstation(req, res) {
    try{
        let data = req.body;
        // console.log(req.body);
        for(let i=1;i<5;i++){
            if(!data[validator_farm[i]]) return response.badData(res, `${validator_farm[i]} is required!!!`)
        }
        for(let i=1;i<5;i++){
            if(data["stage_"+i]) checkInput(data, i);
        }
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");//1
        if(!gateway.includes(data.sub_id)) return response.badData(res, "Sensor doesn't exist!!!");//2
        let check_sub = await Information.findOne({sub_id: data.sub_id});
        if(check_sub) return response.badRequest(res,"Sensor has already in use!!!");
        let stage_1 = await Stage.create(data.stage_1);
        let stage_2 = await Stage.create(data.stage_2);
        let stage_3 = await Stage.create(data.stage_3);
        let stage_4 = await Stage.create(data.stage_4);

        let new_farm = {
            name: data.name,
            sub_id: data.sub_id,
            started_plant: data.started_plant,
            owner_id: req.user._id,
            seed: data.seed,
            stage_1: stage_1._id,
            stage_2: !stage_2 ? null:stage_2._id,
            stage_3: stage_3._id,
            stage_4: stage_4._id,
        };
        let farm = await Information.create(new_farm);
        await User.updateMany({is_admin:true},{ $push: {"farms": farm.sub_id}});
        let full_info = await serializer.convertOutput(farm);
        return response.created(res, full_info)
    }catch(err){
        return response.internal(res, err)
    }
}
/** Creat new farm*/
// async function newSubstation(req, res) {
//     try{
//         console.log(req.body);
//         let data_seed={
//             seed: req.body.seed,
//             stage_1_days: req.body.stage_1_days,
//             stage_2_days: req.body.stage_2_days,
//             stage_3_days: req.body.stage_3_days,
//             stage_4_days: req.body.stage_4_days,
//             stage_1: req.body.stage_1,
//             stage_2: req.body.stage_2,
//             stage_3: req.body.stage_3,
//             stage_4: req.body.stage_4,
//         };
//         if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");//1
//
//         if(!gateway.includes(req.body.sub_id)) return response.badData(res, "Sensor doesn't exist!!!");//2
//         let check_sub = await Information.findOne({sub_id: req.body.sub_id});
//         if(check_sub) return response.badRequest(res,"Sensor has already in use!!!");
//         if(!req.body.name) return response.badData(res, "Name is required.");
//         // let seeds = await mongoose.models['farm_seeds_config'].find({}).distinct("seed");
//         // if(!seeds.includes(req.body.seed.seed)) return response.badData(res, "Seed doesn't support!!!");
//
//         let new_seed = await Seed.create(data_seed);
//         let new_farm = {
//             name: req.body.name,
//             sub_id: req.body.sub_id,
//             start_plant: req.body.started_plant,
//             owner_id: req.user._id,
//             seed: new_seed._id
//         };
//         let farm = await Information.create(new_farm);
//         await User.updateMany({is_admin:true},{ $push: {"farms": farm.sub_id}});
//         let full_info = await serializer.convertOutput(farm);
//         return response.created(res, full_info)
//     }catch(err){
//         console.log(err);
//         return response.internal(res, err)
//     }
// }

/** Edit information of farm*/
async function editSub(req, res){
    let change_element = req.body;
    try {
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");

        for(let i=1;i<5;i++){
            if(change_element["stage_"+i]) checkInput(change_element, i);
        }
        let data_seed={
            name: change_element.name,
            seed: change_element.seed,
            started_plant: change_element.started_plant,
            address: change_element.address
        };
        let farm = await Information.findOneAndUpdate({sub_id:req.params.sub_id}, data_seed, {new:true});
        for(let i=1;i<5;i++){
            if(!change_element[validator_farm[i]]) return response.badData(res, `${validator_farm[i]} is required!!!`);
            await Stage.findByIdAndUpdate(farm["stage_"+i], change_element["stage_"+i]);
        }
        let full_info = await serializer.convertOutput(farm);
        response.ok(res, full_info)
    }catch (err) {
        response.internal(res, err)
    }
}

/** Follow a substation*/
async function addSubToUser(req, res) {
    try{
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");
        // console.log(req.body)
        let check_user = await User.findById(req.body.user_id);
        if(!check_user) return response.notFound(res,"User doesn't exist!!!");

        if(check_user.farms.length > req.body.sub_id.length){
            let compare = lodash.difference(check_user.farms, req.body.sub_id);
            for(let i=0;i<compare.length;i++){
                let farm = await Information.findOne({sub_id: compare[i]},{_id:1});
                if(!farm) return response.notFound(res,"Farm doesn't exist!!!");
                await User.findOneAndUpdate({_id:req.body.user_id},{ $pull: {"farms": compare[i]}},{new:true});
            }
        }
        else{
            let compare = lodash.difference(req.body.sub_id, check_user.farms);
            for(let i=0;i<compare.length;i++){
                let farm = await Information.findOne({sub_id: compare[i]},{_id:1});
                if(!farm) return response.notFound(res,"Farm doesn't exist!!!");
                await User.findOneAndUpdate({_id:req.body.user_id},{ $push: {"farms": compare[i]}},{new:true});
            }
        }
        let user = await User.findById(req.body.user_id);
        return response.created(res, user)
    }catch(err){
        console.log(err);
        return response.internal(res, err)
    }
}

/** Delete substation*/
async function deleteSub(req, res){
    try {
        if (!req.user.is_admin) return response.forbidden("Permission Denied!!!");
        await Information.findOneAndDelete({sub_id:req.params.sub_id});
        await User.updateMany({},{ $pull: {"farms": req.params.sub_id}});
        response.noContent(res)
    }catch (err) {
        response.internal(res, err);
    }
}

/** Check input*/
function checkInput(data, i){
    try {
        // if(i==2)
        for(let j=0;j<validator.length;j++){
            if(!data["stage_"+i][validator[j]]) throw Error(`stage_${i}.${validator[j]} is required!!!`)
        }
        if(data["stage_"+i].stage_days<0) throw Error("Stage < 0");
        if(data["stage_"+i].min_temp >= data["stage_"+i].max_temp) throw Error("min>max");
        if(data["stage_"+i].min_light >= data["stage_"+i].max_light) throw Error("min>max");
        if(data["stage_"+i].min_PH >= data["stage_"+i].max_PH) throw Error("min>max");
        if(data["stage_"+i].min_soil_moisture >= data["stage_"+i].max_soil_moisture) throw Error("min>max");
        if(data["stage_"+i].min_hum >= data["stage_"+i].max_hum) throw Error("min>max");
    }catch (err) {
        throw err
    }
}

module.exports={
    getSubstation,
    getSubById,
    newSubstation,
    editSub,
    addSubToUser,
    deleteSub
};