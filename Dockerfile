# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with clean install (reproducible builds)
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .

# VITE_ variables are baked into the static bundle at build time.
# Pass the key via --build-arg during `gcloud run deploy --source .`.
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

RUN npm run build

# -------------------------------------------------------------------
# Stage 2: Serve with Nginx (lightweight production image)
# -------------------------------------------------------------------
FROM nginx:1.27-alpine

# Remove default Nginx placeholder page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run routes traffic to port 8080 by default
EXPOSE 8080

# Run Nginx in the foreground (required for containerized environments)
CMD ["nginx", "-g", "daemon off;"]
