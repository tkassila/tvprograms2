rm -R proxyserver/public/*
preact build --no-prerender $*
cp -R build/* proxyserver/public/
zip proxyserver.zip proxyserver/
