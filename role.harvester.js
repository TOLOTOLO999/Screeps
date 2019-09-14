let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
        });
        let sources = creep.room.find(FIND_SOURCES);
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                structure.energy < structure.energyCapacity && (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION)
        });
        let storages = creep.room.find(FIND_STRUCTURES,
            {filter: s => s.structureType === STRUCTURE_STORAGE});



        if(creep.carry.energy < creep.carryCapacity) {//harvest
            console.log(0.5 * (creep.room.energyCapacityAvailable - storages[0].storeCapacity));
            if(creep.room.energyAvailable < 0.5 * creep.room.energyCapacityAvailable && storages[0].store[RESOURCE_ENERGY] > 0.5 * creep.room.energyCapacityAvailable){
                //transfer energy from storage to spawn and extensions
                if(creep.withdraw(storages[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0],{visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else{
                if(containers.length > 0){//if there are containers available, go to containers
                    if(creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                } else{//if no containers available, go to sources
                    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0],{visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
        else {//storing
            if(targets.length > 0) {//transfer to targets
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else{//transfer to storage
                if(creep.transfer(storages[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
      }
	},
    body: [CARRY,CARRY,MOVE],

    create: function(){
            let newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'harvester'}});
    }

};

module.exports = roleHarvester;
