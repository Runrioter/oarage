SOURCES = packages

.PHONY: build clean clean-lib clean-log lint

build: clean lint
	npx tsc -p packages/oarage-server

lint:
	npx tslint -p packages/oarage-server

clean: clean-lib clean-log

clean-lib:
	$(call clean-source-lib, $(SOURCES))

clean-log:
	rm -f lerna-debug.log

define clean-source-lib
	rm -rf $(1)/*/lib
endef