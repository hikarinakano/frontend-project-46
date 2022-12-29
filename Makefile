gendiff: # launches help info for gendiff file
	node bin/gendiff.js -h

make install:
	npm install
	
make lint: # launch npx eslint
	npx eslint .	

make say-hello: # prints hello world in bash
	echo "Hello, world!"

make test: # starts tests
	npm test

make test-coverage: #tests coverage
	npm test -- --coverage 