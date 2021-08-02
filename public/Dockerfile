FROM nginx:stable-alpine
COPY ./ /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]