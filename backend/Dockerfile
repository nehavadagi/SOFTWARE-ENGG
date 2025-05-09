# 1) Base image
FROM python:3.10-slim

# 2) Prevent .pyc and buffering
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3) Working directory
WORKDIR /app

# 4) Install system deps (for bcrypt, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# 6) Copy the rest of the code
COPY . .

# 7) Expose Flask port
EXPOSE 5000

# 8) Launch via Gunicorn for production-style
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:5000"]
