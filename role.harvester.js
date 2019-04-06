let roleBuilder = require('role.builder');

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.carry.energy < creep.carryCapacity) {//harvest
          let sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
        else {//storing
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
            } else{//if no place to put energy, work as builder
                roleBuilder.run(creep);
            }
      }
	}
};

module.exports = roleHarvester;
