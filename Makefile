gendiff: # launches help info for gendiff file
	node bin/gendiff.js -h

make lint: # launch npx eslint
	npx eslint .	

make say-hello: # prints hello world in bash
	echo "Hello, world!"