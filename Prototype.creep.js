module.exports = function(){

    //combine creeps with different roles into one function
    Creep.prototype.run = function(){
        if (!modules.roles[this.memory.role]) {
            console.log(this);
        }
        modules.roles[this.memory.role].run(this);
    };

};