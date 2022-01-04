@echo off
rem set > set.txt
rem del koe.txt
curl.exe %*
rem curl.exe -v %* > koe.txt 2> curl.stderr.txt
rem type koe.html
rem echo "kissa, hei1"