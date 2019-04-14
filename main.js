module.exports.loop = function () {
    require('Global')();
    require("Prototype.creep")();
    require('Prototype.spawn')();

    //clear memory
    for(let name in Memory.creeps) {
        // noinspection JSUnfilteredForInLoop
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //---------------------TOWER-----------------------
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

    //-----------------------SPAWNS---------------------------
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
    //let creepsInRoom = Game.spawns['Spawn1'].room.find(FIND_CREEPS);


    if(harvesters.length < 6) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});

    }
    if(upgraders.length < 4) {
        let newName = 'Upgrader' + Game.time;
        // console.log('Spawning new upgraders: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    if(builders.length < 4) {
        let newName = 'Builder' + Game.time;
        // console.log('Spawning new builders: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    if(repairers.length < 2) {
        let newName = 'Repairer' + Game.time;
        // console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'repairer'}});
    }
    if(miners.length < 1) {
        let newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
            {memory: {role: 'miner'}});
    }

    // let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    // for (let source in sources){
    //     if (!_.some(creepsInRoom, c => c.memory.role === 'miner' && c.memory.sourceId === 'source.id')){
    //         let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
    //             filter: s => s.structureType === STRUCTURE_CONTAINER
    //         });
    //         if (containers.length > 0){
    //             Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
    //                 {memory: {role: 'miner'}});
    //             break;
    //         }
    //     }
    // }

    //create creeps
    //let creepTypes = ['harvester', 'builder', 'upgrader', 'repairer'];

    // for (let i in creepTypes){
    //     if(Game.spawns['Spawn1'].create(creepTypes[i]) === 0){
    //         break;
    //     }
    // }

    //run creeps
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        creep.run();
    }

    //display number of creeps
    for (let name in modules.numbers){
        console.log(name + ":" + modules.numbers[name]);
    }

};
