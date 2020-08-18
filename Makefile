.PHONY: \
  test \
	watch

test:
	npx jest

watch: 
	npx jest --watch