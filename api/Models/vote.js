class vote {
    constructor(id, conversationId, type, isPinned, question, option, allowMultipleAnswers, allowAddOption, hideMemberAnswers, allowChangeAnswes, duration) {
        this.id = id;
        this.conversationId = conversationId;
        this.type = type;
        this.isPinned = isPinned;
        this.question = question;
        this.option = option;
        this.allowMultipleAnswers = allowMultipleAnswers;
        this.allowAddOption = allowAddOption;
        this.hideMemberAnswers = hideMemberAnswers;
        this.allowChangeAnswes = allowChangeAnswes;
        this.duration = duration;
    }
}
module.exports = vote;