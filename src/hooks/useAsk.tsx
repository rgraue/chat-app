import { useMutation } from "@tanstack/react-query"
import { config } from "../utils/config"
import { ConversationMessage } from "../services/workspaceService"

const ASK_PROMPT_KEY = 'ASK_PROMPT'

const NON_VERBOSE_PREFIX = 'Only provide an answer, without an explanation to the following ask: '

export const useAskPrompt = () => {
    return useMutation({
        mutationKey: [ASK_PROMPT_KEY],
        mutationFn: askQuestion
    })
}


export const askQuestion = async (input: {prompt: string, verbose: boolean, model: string, conversation?: ConversationMessage[] }) => {
    const configToUse = await config();

    const messages = []
    if (input.conversation) {
        messages.push(...input.conversation.map(message => {
            return {
                role: message.role,
                content: message.content
            }
        }));
    }

    messages.push({
        role: configToUse.ROLE,
        content: !input.verbose ? NON_VERBOSE_PREFIX + input.prompt : input.prompt
    })

    const body = {
        model: input.model,
        messages
    }

    const response = await sendPost(`${configToUse.SERVER_URL}/api/chat`, body);

    if (response.status !== 200) {
        // return Readable.from("bad");
        throw new Error("bad");
    }

    return response.body;
}

// @ts-ignore
const sendPost = async (url: string, body: any ) => fetch(
    url,
    {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

)