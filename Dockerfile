FROM nginx:stable-alpine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
