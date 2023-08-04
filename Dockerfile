# Use official node image as the base image

FROM node:14.18.0 as build-stage
WORKDIR /usr/local/app
COPY package*.json /usr/local/app/
RUN npm install
COPY ./ /usr/local/app/
RUN npm run build --output-path=/usr/local/app/dist/hris --configuration=production $configuration
FROM nginx:1.15

COPY --from=build-stage /usr/local/app/dist/hris /usr/share/nginx/html

EXPOSE 80
