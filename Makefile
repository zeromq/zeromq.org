#
# Helper makefile to help testing website changes
#
# NOTE: last-tested hugo version is "hugo v0.120.2" released on Nov 2023
# Please note that you need the "hugo EXTENDED" version that has the ability
# to transpile Sass to CSS

# the "serve" target assumes you have a compatible hugo version installed
serve:
	hugo server \
	--buildDrafts \
	--buildFuture \
	--disableFastRender \
	--ignoreCache \
	--bind 0.0.0.0

production-build:
	hugo

preview-build:
	hugo \
	--baseURL $(DEPLOY_PRIME_URL) \
	--buildDrafts \
	--buildFuture

docker-build:
	docker build -t zeromqorgsite .

docker-run:
	docker run --name zeromqorgsite -d -p80:80 zeromqorgsite

