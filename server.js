const express = require('express');
const puppeteer = require('puppeteer');
const winston = require('winston');

// winston log configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
      //adjust the timezone if required
      timeZone: 'Asia/Hongkong'
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    //enable the log files if necessary
    //new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

const app = express();
app.use(express.json({ limit: '5mb' }));

app.post('/htmltoimage', async (req, res) => {
  const { html, width = 800, height = 600 } = req.body;
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  
  logger.info(`Received request: html length=${html?.length || 0}, width=${width}, height=${height}`);
  
  if (!html) {
    const errorMsg = 'Missing html content';
    logger.error(`Request failed: ${errorMsg}`);
    return res.status(400).json({ error: errorMsg });
  }

  try {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    //networkidle0: no response within 500ms
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const screenshotBuffer = await page.screenshot({ type: 'png' });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshotBuffer);
    
    logger.info(`Request completed successfully: image size=${screenshotBuffer.length} bytes`);
  } catch (error) {
    logger.error(`Request failed: ${error.message}`);
    res.status(500).json({ error: 'Rendering failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`HTML to Image API running on port ${PORT}`);
});
