let roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('⚡ repair');
	    }


	    if(creep.memory.repairing) {//repair
            let targets = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: (s) =>  s.hits <= s.hitsMax * 0.75 && s.structureType !== STRUCTURE_WALL
            });

            if(targets) {
                if(creep.repair(targets) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
             else{//if nothing needs repair, store energy at storageTargets
                let storageTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                      return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                          structure.energy < structure.energyCapacity;
                }
                });
                if(storageTargets.length > 0) {
                    if(creep.transfer(storageTargets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storageTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {//harvest
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_CONTAINER
            });
            if (containers.length > 0 && containers[0].store[RESOURCE_ENERGY] > 0){//collect from containers
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            } else{//harvest from energy sources
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0],{visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	},

    body: [WORK,CARRY,CARRY,MOVE],

    create: function(){
        let minRepairers = 3;
        if(modules.numbers['repairer'] < minRepairers) {
            let newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'repairer'}});
        }
    },

    number: _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length

};

module.exports = roleRepairer;