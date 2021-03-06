let roleMiner = {

    run: function(creep){
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER
        });
        let sources = creep.room.find(FIND_SOURCES);
        if (containers.length > 0){
            if (creep.pos.isEqualTo(containers[0].pos)){
                creep.harvest(sources[0]);
            } else{//go mining
                creep.moveTo(containers[0]);
            }
        }
    },

    body: [WORK,WORK,WORK,WORK,WORK,MOVE],

    create: function(){
        let minMiner = 2;
        if(modules.numbers['miner'] < minMiner) {
            let newName = 'Miner' + Game.time;
            console.log('Spawning new miners: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'miner'}});
        }
    }

};

module.exports = roleMiner;