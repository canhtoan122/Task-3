class grantRole {
    constructor(id, owners, admins, members) {
        this.id = id;
        this.owners = owners;
        this.admins = admins;
        this.members = members;
    }
}
module.exports = grantRole;