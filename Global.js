module.exports = function () {

    global.modules = {
        roles: {
            harvester: require("role.harvester"),
            builder: require("role.builder"),
            upgrader: require("role.upgrader"),
            repairer: require("role.repairer"),
            miner: require("role.miner"),
            miner2: require("role.miner2"),
            wallRepairer: require("role.wallrepairer"),
            collector: require("role.collector")
        },

        numbers: {
            harvester: _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length,
            upgrader: _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length,
            builder: _.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length,
            repairer: _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer').length,
            miner: _.filter(Game.creeps, (creep) => creep.memory.role === 'miner').length,
            miner2: _.filter(Game.creeps, (creep) => creep.memory.role === 'miner2').length,
            wallRepairer: _.filter(Game.creeps, (creep) => creep.memory.role === 'wallRepairer').length,
            collector: _.filter(Game.creeps, (creep) => creep.memory.role === 'collector').length,
        }
    };



};