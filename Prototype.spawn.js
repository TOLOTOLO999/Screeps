module.exports = function() {
        // Structure.prototype.createCustomCreep = function(roleName) {
        //     let body = [];
        //     let newName = roleName + Game.time;
        //     if (roleName === "harvester"){
        //         body = [WORK,WORK,CARRY,MOVE,MOVE];
        //     } else if (roleName === "builder"){
        //         body = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
        //     } else if (roleName === "upgrader"){
        //         body = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
        //     } else if (roleName === "repairer"){
        //         body = [WORK,CARRY,CARRY,MOVE];
        //     }
        //     this.spawnCreep(body, newName, {memory: {role: roleName}});
        // }

        StructureSpawn.prototype.create = function(roleName){
            modules.roles[roleName].create();
        }


};