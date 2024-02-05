class groupChat {
    constructor(inviteId, type, name, memberIds, content) {
        this.inviteId = inviteId;
        this.type = type;
        this.name = name;
        this.memberIds = memberIds;
        this.content = content;
    }
}
module.exports = groupChat;