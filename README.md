# GEMINI-FLASH-API

**Simple Python wrapper for Google's Gemini Flash API.** Enables easy access to Gemini 2.0 Flash model for text generation, multimodal inputs, and fast inference.[1][2]

## Features
- Direct API calls to Gemini 2.0 Flash (`gemini-2.0-flash` or experimental variants).[2]
- Supports text, image, audio, and video inputs where model allows.[2]
- Lightweight: Minimal dependencies for quick setup in Python projects.[3]
- Streaming responses and configurable parameters like temperature and tokens.[4]

## Installation
```bash
git clone https://github.com/444Nazky/gemini-flash-api.git
cd gemini-flash-api
pip install -r requirements.txt  # Or pip install google-generativeai if using official SDK
```
Obtain free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).[5]

## Quick Start
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel('gemini-2.0-flash')

response = model.generate_content("Hello, Gemini Flash!")
print(response.text)
```
Replace `YOUR_API_KEY` with your key. Handles up to 1M+ tokens input.[3][2]

## Usage Examples
### Text Generation
```python
response = model.generate_content("Explain quantum computing simply.")
```

### Multimodal (Image + Text)
```python
image = genai.upload_file("path/to/image.jpg")
response = model.generate_content(["What's in this image?", image])
```

## Configuration
Set environment variable: `export GOOGLE_API_KEY=your_key` for security.[5]

| Parameter | Description | Default |
|-----------|-------------|---------|
| model | `gemini-2.0-flash` or `gemini-2.0-flash-exp` | `gemini-2.0-flash` [2] |
| temperature | Creativity level (0-2) | 0.7 |
| max_tokens | Output limit | 8192 [2] |

## Contributing
Fork, create feature branch, PR to `main`. Follow PEP8.

## License
MIT License. See [LICENSE](LICENSE) file.[1]

[1](https://github.com/444Nazky/gemini-flash-api)
[2](https://ai.google.dev/gemini-api/docs/models)
[3](https://neurorouters.com/blog/google-gemini-25-flash-api-examples-curl-python-js-go)
[4](https://www.datacamp.com/tutorial/gemini-2-0-flash)
[5](https://ai.google.dev/gemini-api/docs/quickstart)
[6](https://www.youtube.com/watch?v=5zhNfPH-jps)
[7](https://github.com/developersdigest/gemini-flash-api)
[8](https://getitnow.embarcadero.com/gemini-api-wrapper-for-delphi/)
[9](https://github.com/topics/gemini-2-0-flash)
[10](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)
[11](https://github.com/google-gemini/cookbook)
