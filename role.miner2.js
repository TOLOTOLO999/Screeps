let roleMiner2 = {

    run: function(creep){
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER
        });
        let sources = creep.room.find(FIND_SOURCES);
        if (creep.pos.isEqualTo(containers[1].pos)){
            creep.harvest(sources[1]);
        } else{//go mining
            creep.moveTo(containers[1]);
        }

    },

    body: [WORK,WORK,WORK,WORK,WORK,MOVE],

    create: function(){
        let minMiner = 2;
        if(modules.numbers['miner'] < minMiner) {
            let newName = 'Miner' + Game.time;
            console.log('Spawning new miners: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(this.body, newName,
                {memory: {role: 'miner2'}});
        }
    }

};

module.exports = roleMiner2;