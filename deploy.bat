del /q /s proxyserver\public\*.*
call build.bat
xcopy build\*.* proxyserver\public\ /s
