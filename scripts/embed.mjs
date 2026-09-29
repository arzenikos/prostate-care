const model = process.env.OLLAMA_EMBED_MODEL ?? 'nomic-embed-text:latest';
const prompt = process.argv.slice(2).join(' ') || 'what is prostate cancer?';
const url = process.env.OLLAMA_URL ?? 'http://localhost:11434/api/embeddings';

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, prompt }),
});

const responseBody = await response.text();

if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}: ${responseBody}`);
}

const result = JSON.parse(responseBody);

if (!Array.isArray(result.embedding)) {
    throw new Error('Ollama response did not contain an embedding array.');
}

console.log(JSON.stringify(result, null, 2));
