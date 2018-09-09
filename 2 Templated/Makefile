main:
	npm run main

help:
	@echo "  $$ make setup                  Install dependencies"
	@echo "  $$ make prepare                Precompile assets"
	@ecoh "  $$ make                        Build a character sheet"
setup:
	@npm install

prepare:
	@echo "Preparing images..."
	@for F in `ls src/images/*.png`; do <$$F base64 >$$F.base64; done

	@echo "Preparing fonts..."
	@for F in `ls src/fonts/*.ttf`; do <$$F base64 >$$F.base64; done
