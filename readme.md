# URL Analysis Microservice

This is a simple Node.js microservice that checks if a list of URLs contain appropriate content using OpenAI's GPT-4. You can run it in either production or development mode.

## Prerequisites

- Node.js (v14 or above)
- npm
- OpenAI API Key (you need to create a `.env` file)

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/url-analysis-microservice.git
   cd url-analysis-microservice
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory with your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

## Running the Service

### Start the Server

By default, the service runs in **production mode** (minimal logs).

```sh
node index.js
```

To run in **development mode** (with detailed logs), use:

```sh
NODE_ENV=development node index.js
```

The server will start on `http://localhost:3000`.

### Analyze URLs via API

Send a POST request to analyze URLs.

**Example**:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"urls": ["http://example.com"]}' http://localhost:3000/analyze_urls
```

### Command Line Usage

You can also analyze URLs directly from the command line:

```sh
node index.js http://example.com http://another-example.com
```

## Modes

- **Production Mode**: Default. Minimal output for performance.
- **Development Mode**: Use `NODE_ENV=development` for detailed logs to debug.

## Troubleshooting

- **Rate Limit**: If you see a `429` error, it means the OpenAI API rate limit has been exceeded. Wait a bit before trying again.
- **DNS Errors**: `ENOTFOUND` means the URL cannot be resolved. Check if the URL is correct.

## Contact

For questions or issues, feel free to reach out or open an issue in the repository.

Enjoy using the URL Analysis Microservice! 🚀
