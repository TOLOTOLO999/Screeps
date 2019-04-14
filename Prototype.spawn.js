module.exports = function() {
        
        StructureSpawn.prototype.create = function(roleName){
            modules.roles[roleName].create();
        }


};