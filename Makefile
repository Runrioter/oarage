SOURCES = packages

.PHONY: build clean clean-lib clean-log

build:
	npx tsc -p packages/oarage-server

clean: clean-lib clean-log

clean-lib:
	$(call clean-source-lib, $(SOURCES))

clean-log:
	rm lerna-debug.log

define clean-source-lib
	rm -rf $(1)/*/lib
endef