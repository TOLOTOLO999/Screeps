let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	},

    body: [WORK,WORK,CARRY,CARRY,MOVE,MOVE],

    create: function(){
        let minUpgraders = 4;
        if(modules.numbers['upgrader'] < minUpgraders) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgraders: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'upgrader'}});
        }
    }
};

module.exports = roleUpgrader;