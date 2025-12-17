server {
    if ($host = www.credit.sentiflex.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = credit.sentiflex.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80;
  #listen [::]:80;
  server_name credit.sentiflex.com www.credit.sentiflex.com;
  return 301 https://$server_name$request_uri;




}

server {
  listen 443 ssl http2;
  #listen [::]:443 ssl http2;
  server_name credit.sentiflex.com www.credit.sentiflex.com;

# ssl_certificate /etc/letsencrypt/live/sapphire.digisparksolutions.ng/fullchai>
 #   ssl_certificate_key /etc/letsencrypt/live/sapphire.digisparksolutions.ng/p>
   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  location / {
    root /var/www/pro.sentiflex.com/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
  }

  error_page 500 502 503 504 /50x.html;

  location = /50x.html {
    root /usr/share/nginx/html;
  }
    ssl_certificate /etc/letsencrypt/live/credit.sentiflex.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/credit.sentiflex.com/privkey.pem; # managed by Certbot




}
