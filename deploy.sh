rm ./proxyserver.zip
rm -R proxyserver/public/*
preact build  --no-prerender $*
#npm run build --no-prerender $*
cp -R build/* proxyserver/public/
zip -r proxyserver.zip proxyserver/*
