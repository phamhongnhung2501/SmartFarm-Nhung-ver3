const network = require('../../../config/network');
const configStatus = require('../../../config/seeds');
const Stage = require('../farm/information/models/stage');
const User = require('../user/models/users');

async function convertOutput(object) {
    if(object.toObject) object = object.toObject({getters: true});
    if(object.photo) object.photo = getPhoto(object.photo);
    if(object.owner_id) {
        object.manager = await getUser(object.owner_id);
        delete object.owner_id
    }
    if(object.id) delete object.id;
    if(object.password) delete object.password;
    if(object.started_plant) {
        let full_stage = await getStageSeed(object.started_plant, object.stage_1,object.stage_3,object.stage_4,object.stage_2);
        object.status = full_stage.status;
        object.stage_1 = full_stage.stage_1;
        object.stage_2 = full_stage.stage_2;
        object.stage_3 = full_stage.stage_3;
        object.stage_4 = full_stage.stage_4;
    }
    delete object.__v;
    return Object.entries(object).sort().reduce((obj, [k,v]) => ({...obj, [k]: v}), {});
}

function getPhoto(img_path){
    let splited_path = img_path.split('\\');
    let photo_url = splited_path.slice(0, splited_path.length).join('/');
    return `http://${network.hostname}:${network.port}/static/${photo_url}`;
}

async function getUser(user_id){
    try{
        return await User.findById(user_id, {full_name: 1, email: 1, phone_number: 1, _id: 0});
    }catch(err){
        throw err
    }
}

async function getStageSeed(time, stage_1, stage_3, stage_4, stage_2){
    try{
        let days = Math.floor((new Date() - time)/(1000*60*60*24));
        let stage_1_info = await Stage.findById(stage_1,{_id:0});
        let stage_2_info = await Stage.findById(stage_2,{_id:0});
        let stage_3_info = await Stage.findById(stage_3,{_id:0});
        let stage_4_info = await Stage.findById(stage_4,{_id:0});
        let full_stage={
            status: stage_1_info,
            stage_1: stage_1_info,
            stage_2: stage_2_info,
            stage_3: stage_3_info,
            stage_4: stage_4_info,
        };
        let stage_1_days = stage_1_info.stage_days;
        let stage_2_days = stage_1_days + stage_1_info.stage_days;
        let stage_3_days = stage_2_days + stage_1_info.stage_days;
        return full_stage
        // if(days <= stage_1_info.stage_days) return stage_1_info.stage_1;
        // if(days <= stage_2_days && days > stage_1_days) return seed.stage_2;
        // if(seed.stage_3_days === 0) return seed.stage_2;
        // else {
        //     if (days <= stage_3_days && days > stage_2_days) return seed.stage_3;
        // }
        // if(seed.stage_4_days === 0) return seed.stage_3;
        // else {
        //     if (days > stage_3_days) return seed.stage_4;
        // }
    }catch(err){
        throw err
    }
}

module.exports = {
  convertOutput
};