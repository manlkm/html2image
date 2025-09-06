FROM node:18-slim

# Install chromium dependencies
RUN apt-get update && apt-get install -y \
    fonts-noto \
    fonts-noto-cjk \
    fonts-noto-cjk-extra \
    fonts-noto-color-emoji \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
  libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 \
  libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
  libnss3 lsb-release xdg-utils wget && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --production
RUN npx puppeteer browsers install chrome

COPY server.js ./

ENV LANG=C.UTF-8
EXPOSE 3000

CMD ["node", "server.js"]
