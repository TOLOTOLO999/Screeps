let roleHarvester = require('role.harvester');

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
        
       
	    if(creep.memory.repairing) {
            let targets = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: (s) =>  s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            });
            
            if(targets) {
                if(creep.repair(targets) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else{//if nothing needs repair
                roleHarvester.run(creep);
            }
        }
        else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleRepairer;