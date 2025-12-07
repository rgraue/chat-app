# !/bin/bash

DATA=$( sed "s/__PROMPT__/$@/" <<< '{"model": "granite4:1b-h", "messages" : [ {"role":"system", "content": "__PROMPT__ Only provide an answer, without an explanation." }], "stream":false }' )

CONTENT=$(curl -s oryn.local:11434/api/chat -d "$DATA" -o -)

echo $(jq '.message.content' <<< $CONTENT)