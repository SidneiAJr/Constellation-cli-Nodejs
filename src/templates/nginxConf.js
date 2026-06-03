// templates/nginxConf.js
export const nginxConf = `events {}

http {
    server {
        listen 80;
        
        location /node {
            proxy_pass http://node_dev:3000;
        }
        
        location /java {
            proxy_pass http://java_dev:8080;
        }
        
        location /php {
            proxy_pass http://php_dev:80;
        }
        
        location /python {
            proxy_pass http://python_dev:5000;
        }
        
        location /cs {
            proxy_pass http://cs_dev:5000;
        }
    }
}
`