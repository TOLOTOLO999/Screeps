let roleMiner = {

    run: function(creep){
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_CONTAINER
        });
        let sources = creep.room.find(FIND_SOURCES);
        // if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        // }
        // let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
        if (creep.pos.isEqualTo(containers[0].pos)){
            creep.harvest(sources[0]);
        } else{//go mining
            creep.moveTo(containers[0]);
        }
        // for (let miner in miners){
        //     if (miner.pos ===  (18,11)){
        //         if (creep.pos.isEqualTo(containers[1].pos)){
        //             creep.harvest(containers[1]);
        //         } else{//go mining
        //             creep.moveTo(containers[1]);
        //         }
        //     } else {
        //
        //     }
        // }
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