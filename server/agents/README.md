# Multi-Agent System Quick Start Guide

## Setup Instructions

### 1. Add Your OpenAI API Key
Edit `server/.env` and replace `your_openai_api_key_here` with your actual OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### 2. Restart Your Server
Since you already have the server running, restart it to load the new dependencies and routes:
```bash
# Stop the current server (Ctrl+C) then:
cd server
node index.js
```

## Usage

### Chat with the Agent Team
**Endpoint:** `POST http://localhost:5001/api/agents/chat`

**Request Body:**
```json
{
  "message": "How can we improve conversion rates on our luxury brand?"
}
```

The supervisor will automatically route your question to the most appropriate agent (CEO, Marketing, Data, etc.).

**Optional: Target a Specific Agent:**
```json
{
  "message": "Write a React component for a luxury product card",
  "targetAgent": "developer"
}
```

### List All Agents
**Endpoint:** `GET http://localhost:5001/api/agents/list`

Returns information about all 7 available agents.

## Agent Roster

| Agent | Expertise |
|-------|-----------|
| **CEO** | Strategy and business decisions |
| **Developer** | Technical implementation and clean code |
| **Designer** | Luxury UI/UX design |
| **Marketing** | Growth strategies and campaigns |
| **Support** | Customer service excellence |
| **Data** | Analytics and insights |
| **Testing** | Quality assurance and testing |

## Example Test

```bash
curl -X POST http://localhost:5000/api/agents/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What technologies should we use for our luxury brand redesign?\"}"
```
