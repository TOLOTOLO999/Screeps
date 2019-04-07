module.exports = function () {

    global.modules = {
        roles: {
            harvester: require("role.harvester"),
            builder: require("role.builder"),
            upgrader: require("role.upgrader"),
            repairer: require("role.repairer"),
        },

        numbers: {
            harvester: _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length,
            upgrader: _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length,
            builder: _.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length,
            repairer: _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer').length,
        }
    };



};