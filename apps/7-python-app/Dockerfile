FROM python:3.8-slim
WORKDIR /server
COPY dependencies.txt .
RUN pip install -r dependencies.txt
COPY src/ .
CMD ["python", "./server.py"]