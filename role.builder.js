let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    
       if(creep.memory.building) {//constructing
           if (modules.numbers.harvester < 2 && creep.room.energyAvailable < 0.5 * creep.room.energyCapacityAvailable){
               //---------------WORK AS HARVESTERS------------
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
               let target = creep.room.find(FIND_CONSTRUCTION_SITES);
               if(target.length) {
                   if(creep.build(target[0]) === ERR_NOT_IN_RANGE) {
                       creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
                   }
               }
           }
	    }
	    else {//harvest
	        let sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	},

    body: [WORK,WORK,CARRY,MOVE,MOVE],

    create: function(){
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let minBuilders = 5;
        if(builders.length < minBuilders) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new builders: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'builder'}});
        }
    }
};

module.exports = roleBuilder;
