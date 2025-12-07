import { useMutation } from "@tanstack/react-query"
import { config } from "../utils/config"

const ASK_PROMPT_KEY = 'ASK_PROMPT'

const NON_VERBOSE_PREFIX = 'Only provide an answer, without an explanation to the following ask. '

export const useAskPrompt = () => {
    return useMutation({
        mutationKey: [ASK_PROMPT_KEY],
        mutationFn: askQuestion
    })
} 

export const askQuestion = async (input: {prompt: string, verbose: boolean}) => {
    const configToUse = await config();

    const body = {
        model: configToUse.MODEL,
        messages: [{
            role: configToUse.ROLE,
            content: !input.verbose ? NON_VERBOSE_PREFIX + input.prompt : input.prompt
        }]
    }

    const response = await fetch(
        configToUse.SERVER_URL,
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

    )

    if (response.status !== 200) {
        // return Readable.from("bad");
        throw new Error("bad");
    }

    return response.body;
}