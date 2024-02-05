class conversation {
    constructor(conversationId, isNotification, isConversationHidden, isPinned, isNoted, isVoted) {
        this.conversationId = conversationId;
        this.isNotification = isNotification;
        this.isConversationHidden = isConversationHidden;
        this.isPinned = isPinned;
        this.isNoted = isNoted;
        this.isVoted = isVoted;
    }
}
module.exports = conversation;