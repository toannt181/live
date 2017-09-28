#!/usr/bin/env bash
DIR=chat_ci_$1
sudo cp -rf . /var/www/chat/stage/current/$DIR
cd  /var/www/chat/stage/current/$DIR


sudo cp .env.example .env

sudo sed -i "s/DB_DATABASE=homestead/DB_DATABASE=stage_chat/g" .env
sudo sed -i "s/DB_USERNAME=homestead/DB_USERNAME=stage_chat/g" .env
sudo sed -i "s/DB_PASSWORD=secret/DB_PASSWORD=stage_chat123/g" .env


#sudo sed -i "s/GOOGLE_CLIENT_ID=215755203697-98sce74cljtplbfledtlvvmb8nf8rls0.apps.googleusercontent.com/GOOGLE_CLIENT_ID=215755203697-52b7t6j2ap14dsn2mhjutbl4o3pvpatq.apps.googleusercontent.com/g" .env
#sudo sed -i "s/GOOGLE_CLIENT_SECRET=4TJ3KUaKPBGZrZVnjr0euF0R/GOOGLE_CLIENT_SECRET=biWgBsRM32zGvHsJ-u6AvGag/g" .env
#sudo sed -i "s/GOOGLE_CALLBACK=http:\/\/local.cs.com\/admin\/callback/GOOGLE_CALLBACK=http:\/\/stage.cs.teko.vn\/admin\/callback/g" .env


sudo rm -rf storage
sudo ln -s /var/www/chat/stage/storage /var/www/chat/stage/current/$DIR/storage

sudo composer install
sudo chmod -R 777 storage
sudo chmod -R 777 bootstrap
sudo php artisan key:generate


sudo php artisan migrate
sudo php artisan db:seed
#sed -i "s/APP_ENV=local/APP_ENV=production/g" .env
sudo chown -R www-data:www-data /var/www/chat/stage/current/$DIR
sudo rm -rf /var/www/chat/stage/running
sudo ln -s /var/www/chat/stage/current/$DIR /var/www/chat/stage/running
#sudo php artisan storage:link
#sudo service supervisor restart stage_cs_long_pulling
sudo cp -rf /var/www/chat/stage/current/$DIR/deploy/nginx_chat_stage /etc/nginx/sites-enabled/staging.chat.teko.vn
sudo sed -i "s/NUMBER/$DIR/g" /etc/nginx/sites-enabled/staging.chat.teko.vn
sudo service nginx restart
