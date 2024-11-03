# URL Analysis Microservice

This project is a Node.js microservice that takes a list of URLs, scrapes the HTML content, and analyzes it using the OpenAI GPT-4 model to determine if the content is appropriate or inappropriate. The analysis is designed to quickly flag potentially inappropriate content, providing concise feedback for each URL.

## Features

- Accepts a list of URLs via a REST API endpoint or command line.
- Uses GPT-4 to classify content as appropriate or inappropriate.
- Outputs results, including reasons for content flagged as inappropriate.
- Command line support for easy batch URL analysis.
- Colored logs and emojis for better readability of the console output.
- Development and Production Modes for better control over logging and output.

## Prerequisites

- Node.js (v14 or above)
- npm
- OpenAI API Key (You need to create a `.env` file with your OpenAI API key)

## Installation

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

   - Create a `.env` file in the root directory:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

4. **Add `.env` to `.gitignore`** (already included):
   The `.env` file contains sensitive information and should not be committed to version control.

## Usage

### Run the Server

To start the microservice, run:

```sh
node index.js
```

This will start the server on `http://localhost:3000`.

By default, the server runs in **production mode**, which suppresses detailed logging. To run in **development mode** with detailed logs, set the `NODE_ENV` environment variable to `development`:

**Run in Development Mode**:

```sh
NODE_ENV=development node index.js
```

### Analyze URLs via REST API

To analyze URLs, you can send a POST request to the `/analyze_urls` endpoint.

**Example Request**:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"urls": ["http://free-online-prizes.com", "http://click4cash.com", "http://badcontent-example.net", "http://fakegiveaway.xyz", "http://quickloansnow.biz", "http://spammyoffer.info", "https://www.wikipedia.org", "https://www.bbc.com", "https://www.nasa.gov", "https://www.github.com", "https://www.openai.com", "https://www.nytimes.com"]}' http://localhost:3000/analyze_urls
```

**Response Format**:

```json
[
  {
    "url": "http://example.com",
    "isAppropriate": true,
    "reason": "appropriate content"
  }
]
```

### Command Line Usage

You can also pass URLs directly through the command line for analysis.

**Example**:

```sh
node index.js http://example.com http://another-example.com
```

**Example Output**:

```
🛠️  Running analysis via command line
📊 Analysis Results: [
  {
    "url": "http://example.com",
    "isAppropriate": true,
    "reason": "appropriate content"
  },
  {
    "url": "http://another-example.com",
    "isAppropriate": false,
    "reason": "inappropriate: explicit content"
  }
]
```

**Example with Both Good and Bad URLs**:

```sh
NODE_ENV=development node index.js
```

In development mode, detailed logs with colored output will help you see each step of the analysis process.

## Project Structure

```
url-analysis-microservice/
├── index.js         # Main application file
├── package.json     # Dependencies and scripts
├── .env             # Environment variables (not committed)
├── .gitignore       # Git ignore rules
```

## Dependencies

- **express**: To create the REST API.
- **axios**: For making HTTP requests to URLs and OpenAI.
- **dotenv**: To manage environment variables.
- **colors**: To enhance console output with colors.

## Logs and Debugging

- **Emojis and Color-Coded Logs**: The application uses the `colors` library and emojis to provide clear, readable logs at every major step (e.g., requests received, content analysis started, errors, etc.).
- **Development Mode**: To see detailed logs and steps, run the server in development mode (`NODE_ENV=development`). In production mode, these logs are suppressed to reduce noise.

## Security Note

- Do **not** share your `.env` file or your OpenAI API key.
- Ensure the `.env` file is added to `.gitignore` so that it isn't included in version control.

## Troubleshooting

- **API Key Issues**: Ensure your OpenAI API key is set properly in the `.env` file.
- **Server Not Running**: Make sure you're running the server from the correct directory and that no other process is using port 3000.

## Future Improvements

- Add more detailed logging to capture edge cases.
- Rate-limit requests to prevent overuse of the OpenAI API.
- Add better error handling and more granular response messages.

## License

This project is open-source and available under the MIT License.

## Contributions

Feel free to open issues or submit pull requests to improve the functionality or fix bugs.

## Contact

- Created by **Alvin Cheung**. For any queries, feel free to reach out.

Enjoy analyzing URLs with ease and automation! 🚀
