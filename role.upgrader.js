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

	    if(creep.memory.upgrading) {//upgrade
            if (modules.numbers['harvester'] === 0 && creep.room.energyAvailable < 0.5 * creep.room.energyCapacityAvailable){
                //----------------------WORK AS HARVESTERS----------------------
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else{
                //----------------------WORK AS UPGRADERS--------------------------
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

        }
        else {//harvest
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_CONTAINER
            });
            if (containers.length > 0 && containers[1].store[RESOURCE_ENERGY] > 0){//collect from containers
                if(creep.withdraw(containers[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[1]);
                }
            } else{//harvest from energy sources
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1],{visualizePathStyle: {stroke: '#ffaa00'}});
                }
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