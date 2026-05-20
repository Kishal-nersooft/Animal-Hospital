FROM python:3.12-alpine

WORKDIR /app

COPY index.html channel-doctor.html style.css script.js channel-doctor.js ./

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8005/ > /dev/null || exit 1

CMD ["python", "-m", "http.server", "8005", "--bind", "0.0.0.0"]
