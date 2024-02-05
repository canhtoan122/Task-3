class note {
    constructor(noteId, conversationId, type, isPinned, content) {
        this.noteId = noteId;
        this.conversationId = conversationId;
        this.type = type;
        this.isPinned = isPinned;
        this.content = content;
    }
}
module.exports = note;