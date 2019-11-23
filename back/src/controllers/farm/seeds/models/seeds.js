const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    seed: {
        type: String,
        require: true,
        index: true
    },
    stage_1_days: {
        type: Number,
        require: true
    },
    stage_2_days: {
        type: Number,
        require: true
    },
    stage_3_days: Number,
    stage_4_days: Number,
    stage_1:{
        min_temp: {type: Number, require: true},
        max_temp: {type: Number, require: true},
        min_light: {type: Number, require: true},
        max_light: {type: Number, require: true},
        min_PH: {type: Number, require: true},
        max_PH: {type: Number, require: true},
        min_soil_moisture: {type: Number, require: true},
        max_soil_moisture: {type: Number, require: true},
        min_hum: {type: Number, require: true},
        max_hum: {type: Number, require: true}
    },
    stage_2:{
        min_temp: {type: Number, require: true},
        max_temp: {type: Number, require: true},
        min_light: {type: Number, require: true},
        max_light: {type: Number, require: true},
        min_PH: {type: Number, require: true},
        max_PH: {type: Number, require: true},
        min_soil_moisture: {type: Number, require: true},
        max_soil_moisture: {type: Number, require: true},
        min_hum: {type: Number, require: true},
        max_hum: {type: Number, require: true}
    },
    stage_3:{
        min_temp: Number,
        max_temp: Number,
        min_light: Number,
        max_light: Number,
        min_PH: Number,
        max_PH: Number,
        min_soil_moisture: Number,
        max_soil_moisture: Number,
        min_hum: Number,
        max_hum: Number
    },
    stage_4:{
        min_temp: Number,
        max_temp: Number,
        min_light: Number,
        max_light: Number,
        min_PH: Number,
        max_PH: Number,
        min_soil_moisture: Number,
        max_soil_moisture: Number,
        min_hum: Number,
        max_hum: Number
    }
},{ versionKey: false });

const Seed = mongoose.model("farm_seeds_config", SeedSchema);
module.exports = Seed;
