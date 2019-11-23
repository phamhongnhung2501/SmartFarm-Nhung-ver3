const config_api = require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function createProject(data, callback) {
    console.log(data);

    axios({
        url: config_api.project,
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            name: data.name,
            manager: data.manager,
            sub_id: data.sub_id,
            seed: data.seed,
            phone_number: data.phone_number,
            started_plant: data.started_plant,
            stage_1: {
                stage_days: data.stage_1_days,
                min_temp: data.stage_1.min_temp,
                max_temp:  data.stage_1.max_temp,
                min_light: data.stage_1.min_light,
                max_light: data.stage_1.max_light,
                min_PH: data.stage_1.min_PH,
                max_PH: data.stage_1.max_PH,
                min_soil_moisture: data.stage_1.min_soil_moisture,
                max_soil_moisture: data.stage_1.max_soil_moisture,
                min_hum: data.stage_1.min_hum,
                max_hum: data.stage_1.max_hum,
            },
            stage_2: {
                stage_days: data.stage_2_days,
                min_temp: data.stage_2.min_temp,
                max_temp: data.stage_2.max_temp,
                min_light: data.stage_2.min_light,
                max_light: data.stage_2.max_light,
                min_PH: data.stage_2.min_PH,
                max_PH: data.stage_2.max_PH,
                min_soil_moisture: data.stage_2.min_soil_moisture,
                max_soil_moisture: data.stage_2.max_soil_moisture,
                min_hum: data.stage_2.min_hum,
                max_hum: data.stage_2.max_hum,
            },
            stage_3: {
                stage_days: data.stage_3_days,
                min_temp: data.stage_3.min_temp,
                max_temp: data.stage_3.max_temp,
                min_light: data.stage_3.min_light,
                max_light: data.stage_3.max_light,
                min_PH: data.stage_3.min_PH,
                max_PH: data.stage_3.max_PH,
                min_soil_moisture: data.stage_3.min_soil_moisture,
                max_soil_moisture: data.stage_3.max_soil_moisture,
                min_hum: data.stage_3.min_hum,
                max_hum: data.stage_3.max_hum,
            },
            stage_4: {
                stage_days: data.stage_4_days,
                min_temp: data.stage_4.min_temp,
                max_temp: data.stage_4.max_temp,
                min_light: data.stage_4.min_light,
                max_light: data.stage_4.max_light,
                min_PH: data.stage_4.min_PH,
                max_PH: data.stage_4.max_PH,
                min_soil_moisture: data.stage_4.min_soil_moisture,
                max_soil_moisture: data.stage_4.max_soil_moisture,
                min_hum: data.stage_4.min_hum,
                max_hum: data.stage_4.max_hum,
            }
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getInfoProjectAll(callback) {
    axios({
        url: config_api.project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);
            
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}


function getInfoProject(id, callback) {
    console.log(id);
    
    /* Check valid input */
    let id_project;
    if (id === "this") {
        id_project = utils.getProjectId();
    } else {
        id_project = id;
    }

    axios({
        url: config_api.project + "/" + id_project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            console.log(result.data);
            
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}


function getListSeed(callback) {
    axios({
        url: config_api.seed ,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getListGateWay(callback) {
    axios({
        url: config_api.gateway ,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            // console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

module.exports = {
    getInfoProjectAll: getInfoProjectAll,
    getInfoProject: getInfoProject,
    createProject: createProject,
    getListSeed: getListSeed,
    getListGateWay: getListGateWay,

}