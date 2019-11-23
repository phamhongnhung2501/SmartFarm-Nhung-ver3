let tomato = {
    seed: "tomato",
    stage_1_days: 35,
    stage_2_days: 60,
    stage_3_days: 0,
    stage_1:{
        name: "germination stage",
        min_temp: 21,
        max_temp: 30,
        min_light: 2000,
        max_light: 2300,
        min_PH: 7,
        max_PH: 8,
        min_soil_moisture: 55,
        max_soil_moisture: 60,
        min_hum: 75,
        max_hum: 85
    },
    stage_2:{
        name: "development stage",
        min_temp: 21,
        max_temp: 30,
        min_light: 2000,
        max_light: 3000,
        min_PH: 5.5,
        max_PH: 7,
        min_soil_moisture: 70,
        max_soil_moisture: 80,
        min_hum: 85,
        max_hum: 90
    }
};

let pakchoi = {
    seed: "pakchoi",
    stage_1_days: 10,
    stage_2_days: 35,
    stage_3_days: 0,
    stage_1:{
        name: "germination stage",
        min_temp: 20,
        max_temp: 30,
        min_light: 2000,
        max_light: 2300,
        min_PH: 5.5,
        max_PH: 6.5,
        min_soil_moisture: 55,
        max_soil_moisture: 60,
        min_hum: 75,
        max_hum: 80
    },
    stage_2:{
        name:"development stage",
        min_temp: 18,
        max_temp: 30,
        min_light: 2000,
        max_light: 3200,
        min_PH: 6.5,
        max_PH: 7,
        min_soil_moisture: 75,
        max_soil_moisture: 85,
        min_hum: 75,
        max_hum: 90
    }
};

let brassica = {
    seed: "brassica",
    stage_1_days: 10,
    stage_2_days: 35,
    stage_3_days: 0,
    stage_1:{
        name: "germination stage",
        min_temp: 20,
        max_temp: 30,
        min_light: 2000,
        max_light: 2300,
        min_PH: 5.5,
        max_PH: 6.5,
        min_soil_moisture: 55,
        max_soil_moisture: 60,
        min_hum: 75,
        max_hum: 80
    },
    stage_2:{
        name: "development stage",
        min_temp: 18,
        max_temp: 30,
        min_light: 2000,
        max_light: 3200,
        min_PH: 5.5,
        max_PH: 6.5,
        min_soil_moisture: 75,
        max_soil_moisture: 85,
        min_hum: 75,
        max_hum: 90
    }
};

let cucumber = {
    seed: "cucumber",
    stage_1_days: 15,
    stage_2_days: 25,
    stage_3_days: 30,
    stage_1:{
        name: "germination stage",
        min_temp: 20,
        max_temp: 30,
        min_light: 2000,
        max_light: 2300,
        min_PH: 6,
        max_PH: 6,
        min_soil_moisture: 55,
        max_soil_moisture: 60,
        min_hum: 75,
        max_hum: 80
    },
    stage_2:{
        name: "development 1 stage",
        min_temp: 18,
        max_temp: 30,
        min_light: 2000,
        max_light: 3000,
        min_PH: 6,
        max_PH: 6,
        min_soil_moisture: 75,
        max_soil_moisture: 85,
        min_hum: 80,
        max_hum: 90
    },
    stage_3:{
        name: "development 2 stage",
        min_temp: 18,
        max_temp: 30,
        min_light: 2500,
        max_light: 3200,
        min_PH: 6,
        max_PH: 6,
        min_soil_moisture: 85,
        max_soil_moisture: 95,
        min_hum: 85,
        max_hum: 95
    },
};

let cabbage = {
    seed: "cabbage",
    stage_1_days: 40,
    stage_2_days: 35,
    stage_3_days: 15,
    stage_1:{
        name: "germination stage",
        min_temp: 18,
        max_temp: 20,
        min_light: 1800,
        max_light: 2200,
        min_PH: 6,
        max_PH: 6.5,
        min_soil_moisture: 70,
        max_soil_moisture: 80,
        min_hum: 76,
        max_hum: 85
    },
    stage_2:{
        name: "development 1 stage",
        min_temp: 15,
        max_temp: 18,
        min_light: 2500,
        max_light: 3000,
        min_PH: 6,
        max_PH: 6.5,
        min_soil_moisture: 75,
        max_soil_moisture: 85,
        min_hum: 80,
        max_hum: 90
    },
    stage_3:{
        name: "development 2 stage",
        min_temp: 14,
        max_temp: 18,
        min_light: 2500,
        max_light: 3000,
        min_PH: 5.6,
        max_PH: 6,
        min_soil_moisture: 75,
        max_soil_moisture: 85,
        min_hum: 80,
        max_hum: 90
    },
};

let gateway = [
    'G00', 'G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07', 'G08',
    'G09', 'G10'
];

module.exports ={
    tomato,
    pakchoi,
    brassica,
    cucumber,
    cabbage,
    gateway
};