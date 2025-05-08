# Use a slim Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy the Flask app code to the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your Flask app will run on
EXPOSE 5000

# Run the app
CMD ["python", "run.py"]
