rm -R proxyserver/public/*
preact build --sw  --no-prerender $*
# npm run build --no-prerender $*
cp -R build/* proxyserver/public/
zip proxyserver.zip proxyserver/
