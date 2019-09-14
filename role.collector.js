let roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
    if (_.sum(creep.carry) === 0) {
        creep.memory.collecting = true;
    } else if (_.sum(creep.carry) === creep.carryCapacity) {
        creep.memory.collecting = false;
    }
    if (creep.memory.collecting) {
        let targets = [];
        targets.push(Game.getObjectById(creep.memory.targetID));
        targets = targets.concat(creep.room.find(FIND_TOMBSTONES, { filter: t => _.sum(t.store) > 0}));
        targets = targets.concat(creep.room.find(FIND_DROPPED_RESOURCES));
        let target = creep.pos.findClosestByRange(targets);

        let withdrawResult;
        if (target instanceof Resource) {
            withdrawResult = creep.pickup(target);
        } else if (target){
            withdrawResult = creep.withdraw(target, _.findKey(target.store));
        }
        if (withdrawResult === 0) {
            creep.memory.waiting = 0;
            return 0;
        }
        if (withdrawResult === ERR_NOT_IN_RANGE) {
            let moveResult = creep.moveTo(target);
            if (moveResult === 0) {
                creep.memory.waiting = 0;
                return 0;
            }
        }
        creep.memory.waiting++;
        if (creep.memory.waiting > 10 && _.sum(creep.carry) > creep.carryCapacity / 4) {
            creep.memory.collecting = false;
        }
    } else {
        let destination = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => {
                return (s.structureType === STRUCTURE_EXTENSION && s.energy < s.energyCapacity)
                    || (s.structureType === STRUCTURE_SPAWN && s.energy < s.energyCapacity)
            }});
        if (_.sum(creep.carry) > creep.carry[RESOURCE_ENERGY]) {
            destination = creep.room.storage;
        }
        if (!destination) {
            destination = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => {
                    return s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity;
                }});
        }
        if (!destination) {
            if (creep.room.storage) {
                if (_.sum(creep.room.storage.store) < creep.room.storage.storeCapacity) {
                    destination = creep.room.storage;
                }
            }
        }
        if (!destination) {
            destination = creep.pos.findClosestByPath(FIND_MY_CREEPS, { filter: c => {
                    let role = c.memory.role;
                    return _.sum(c.carry) < c.carryCapacity
                        && (role === "builder" || role === "upgrader" || role === "repairer");
                }})
        }
        if (!destination) {
            creep.memory.waiting++;
        }
        let transferResult = creep.transfer(destination, _.findKey(creep.carry));
        if (transferResult === 0) {
            creep.memory.waiting = 0;
            return 0;
        }
        if (transferResult === ERR_NOT_IN_RANGE) {
            let moveResult = creep.moveTo(destination);
            if (moveResult === 0) {
                creep.memory.waiting = 0;
                return 0;
            }
        }
        creep.memory.waiting++;
        if (creep.memory.waiting > 10 && creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
            creep.memory.collecting = true;
        }
    }
}
};

module.exports = roleCollector;