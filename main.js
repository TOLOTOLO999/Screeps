let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');

module.exports.loop = function () {
    //clear memory
    for(let name in Memory.creeps) {
        // noinspection JSUnfilteredForInLoop
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let tower = Game.getObjectById('75915370fdf6810400e04fe2');

    if(tower) {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders: ' + builders.length);
    
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    console.log('Repairers: ' + repairers.length);
    

   
    
    //create spawns 
    if(harvesters.length < 6) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
          {memory: {role: 'harvester'}});

    } 
    if(upgraders.length < 2) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgraders: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    } 
    if(builders.length < 4) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builders: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    if(repairers.length < 1) {
        let newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'repairer'}});
    }
    

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
    }


};
