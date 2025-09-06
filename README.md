# HTML to Image Converter

A Node.js + Express + Puppeteer based HTML to image conversion API service.

## Features

- ✅ Convert HTML content to PNG images
- ✅ Support custom width and height parameters
- ✅ Professional logging system (Winston)
- ✅ Docker container deployment
- ✅ RESTful API interface

## Quick Start

### Docker Deployment

1. **Build Docker Image**
   ```bash
   docker build -t html2image .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 html2image
   ```

3. **Verify Service**
   ```bash
   curl http://localhost:3000/health
   ```

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Service**
   ```bash
   npm start
   ```

3. **Service will be available at http://localhost:3000**

## API Usage

### Convert HTML to Image

**Request Example:**
```bash
curl -X POST http://localhost:3000/htmltoimage \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<h1>Hello World</h1><p>This is a test</p>",
    "width": 800,
    "height": 600
  }' \
  --output output.png
```

**Request Parameters:**
- `html`: HTML content string (required)
- `width`: Image width (optional, default 800)
- `height`: Image height (optional, default 600)

**Response:**
- Success: Returns PNG image binary stream
- Failure: Returns JSON error message

### Test Examples

**Basic Test:**
```bash
curl -X POST http://localhost:3000/htmltoimage \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1 style=\"color: blue;\">Test Title</h1>", "width": 400, "height": 200}' \
  --output test1.png
```

**Styled Complex HTML:**
```bash
curl -X POST http://localhost:3000/htmltoimage \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div style=\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px; color: white; font-family: Arial, sans-serif;\"><h1>Beautiful Gradient</h1><p>This is a styled HTML content</p></div>",
    "width": 600,
    "height": 400
  }' \
  --output styled.png
```

## Project Structure

```
html2image/
├── Dockerfile          # Docker container configuration
├── package.json        # Project dependencies
├── server.js           # Main service file
├── logs/               # Log directory (auto-created)
│   └── app.log         # Application log file
└── README.md          # Project documentation
```

## Logging System

The project uses Winston logging framework, with logs output to both:
- **Console**: Real-time development monitoring
- **File**: logs/app.log (persistent storage)

Logs include UTC+8 timestamps and record all request and response information.

## Disclaimer

Do not use this app to conduct illegal activities. I am not responsible for any damages or consequences resulting from the use of this app.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
