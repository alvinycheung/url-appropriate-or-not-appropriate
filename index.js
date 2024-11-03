require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { exec } = require("child_process");
const colors = require("colors");

const app = express();
const PORT = 3000;

// Set environment mode, defaulting to 'production'
const ENV_MODE = process.env.NODE_ENV || "production";
const isDevMode = ENV_MODE === "development";

app.use(express.json());

// POST /analyze_urls
app.post("/analyze_urls", async (req, res) => {
  if (isDevMode) console.log("📥 Received request to analyze URLs".blue);
  const { urls } = req.body;
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        if (isDevMode) console.log(`🌐 Fetching content from URL: ${url}`.cyan);
        // Fetch HTML content
        const response = await axios.get(url);
        const htmlContent = response.data;

        if (isDevMode)
          console.log(`🤖 Analyzing content with GPT-4 for URL: ${url}`.yellow);
        // Analyze content with OpenAI API
        const analysis = await analyzeContentWithGpt(htmlContent);
        if (isDevMode)
          console.log(`✅ Analysis complete for URL: ${url}`.green);
        return {
          url,
          isAppropriate: analysis.isAppropriate,
          reason: analysis.reason,
        };
      } catch (error) {
        if (isDevMode)
          console.error(
            `❌ Error fetching or analyzing URL: ${url} - ${error.message}`.red
          );
        return { url, isAppropriate: false, error: error.message };
      }
    })
  );

  if (isDevMode)
    console.log("📤 Sending response with analysis results".magenta);
  res.json(results);
});

// Function to analyze HTML content with OpenAI API
async function analyzeContentWithGpt(content) {
  const apiKey = process.env.OPENAI_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          'You are a content evaluator. Respond with either "appropriate" or "inappropriate" depending on whether the content is suitable. If inappropriate, provide a brief reason why.',
      },
      { role: "user", content },
    ],
    max_tokens: 50, // Limiting tokens for faster and more concise responses
  };

  try {
    if (isDevMode)
      console.log(
        "🔍 Sending request to OpenAI API for content analysis".yellow
      );
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      { headers }
    );
    const decision = response.data.choices[0].message.content
      .trim()
      .toLowerCase();

    if (decision.startsWith("inappropriate")) {
      if (isDevMode) console.log("⚠️ Content flagged as inappropriate".red);
      return {
        isAppropriate: false,
        reason: decision.replace("inappropriate:", "").trim(),
      };
    }
    if (isDevMode) console.log("✅ Content marked as appropriate".green);
    return { isAppropriate: true, reason: "appropriate content" };
  } catch (error) {
    if (isDevMode)
      console.error(
        "❌ Error analyzing content with OpenAI API:",
        error.message.red
      );
    return { isAppropriate: false, reason: "Error in analysis" }; // Mark as inappropriate if GPT fails
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`.green);
});

// Bash command integration
if (require.main === module && process.argv.length > 2) {
  const urls = process.argv.slice(2);
  const requestBody = JSON.stringify({ urls });

  if (isDevMode) console.log("🛠️  Running analysis via command line".blue);
  axios
    .post(`http://localhost:${PORT}/analyze_urls`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(
        "📊 Analysis Results:".green,
        JSON.stringify(response.data, null, 2)
      );
    })
    .catch((error) => {
      console.error("❌ Error making request:", error.message.red);
    });
}
