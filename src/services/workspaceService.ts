import { config } from "../utils/config";

export interface ConversationMessage {
  conversationName: string;
  role: string;
  content: string;
}

export class WorkspaceService {
  conversations: ConversationMessage[] = [];
  activeConversation: string | undefined = undefined;

  saveWorkspaces() {
    const serialized = btoa(
      JSON.stringify({
        convos: this.conversations,
        active: this.activeConversation,
      }),
    );
    localStorage.setItem("workspace", serialized);
  }

  restoreWorkspaces() {
    try {
      const saved = localStorage.getItem("workspace");
      if (saved) {
        const content = JSON.parse(atob(saved));

        this.activeConversation = content.active;
        this.conversations = content.convos;

        console.log("Successfully restored workspace", this.activeConversation);
      }
    } catch {
      console.error("Unable to restore workspaces");
      localStorage.removeItem("workspace");
    }
  }

  createConversation(convo: string) {
    this.conversations.push({
      conversationName: convo,
      role: "init",
      content: "start of convo",
    });
    this.saveWorkspaces();
  }

  getActiveConversation() {
    return this.activeConversation;
  }

  setActiveConversation(convo: string | undefined) {
    this.activeConversation = convo;
    this.saveWorkspaces();
  }

  getConversations() {
    return new Set(this.conversations.map((x) => x.conversationName));
  }

  async addQuery(conversation: string, query: string) {
    const configToUse = await config();

    this.conversations.push({
      conversationName: conversation,
      role: configToUse.ROLE,
      content: query,
    });

    this.saveWorkspaces();
  }

  async addResponse(conversation: string, response: string) {
    this.conversations.push({
      conversationName: conversation,
      role: "system",
      content: response,
    });

    this.saveWorkspaces();
  }

  getConversation(conversation: string) {
    return this.conversations.filter(
      (message) =>
        message.conversationName == conversation && message.role != "init",
    );
  }

  clearAllConversations() {
    this.conversations = [];
    this.activeConversation = undefined;
    this.saveWorkspaces();
  }

  clearConversation(toClear: string) {
    this.conversations = this.conversations.filter(
      (message) => message.conversationName != toClear,
    );

    if (toClear == this.activeConversation) {
      this.activeConversation = undefined;
    }

    this.saveWorkspaces();
  }
}
