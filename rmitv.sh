docker images -a | grep "tvprograms" | awk '{print $3}' | xargs docker rmi
