class conversationGroup {
    constructor(type, name, memberIds, inviteId) {
        this.type = type;
        this.name = name;
        this.memberIds = memberIds;
        this.inviteId = inviteId;
    }
}
module.exports = conversationGroup;