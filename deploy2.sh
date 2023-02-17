rm -R proxyserver/public/*
preact build $*
cp -R build/* proxyserver/public/
zip proxyserver.zip proxyserver/
