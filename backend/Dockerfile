FROM python:3.10-slim

WORKDIR /app

# 1) Install any OS-level deps (e.g. for bcrypt, pillow, etc.)
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# 2) Copy only requirements.txt first (so Docker cache works)
COPY requirements.txt .

# 3) Install Python deps
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# 4) Copy your application code
COPY . .

EXPOSE 5000
CMD ["python", "run.py"]
