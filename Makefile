gendiff: # launches help info for gendiff file
	node bin/gendiff.js -h

make install:
	npm ci

make lint: # launch npx eslint
	npx eslint .	

make test: # starts tests
	npm test

make test-coverage: #tests coverage
	npm test -- --coverage 