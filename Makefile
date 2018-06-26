.PHONY: all deploy run
include stdmacros.mk


DEST=${HOME}/bin
PROGRAM=hbfileserver
PACROOT=${HOME}/env/conf/autoproxy;

OS=Darwin

all: deploy;

deploy: copy/${PROGRAM}.js copy/${PROGRAM} deploy.${OS}

deploy.Darwin: installplist-Darwin/install/Darwin/com.nokiddin.hailbopp.hbfileserver.plist

copy/%: 
	@${CP} ${@F} ${DEST}/;


installplist-Darwin/%:
	sudo ${CP} ${@F} /Library/LaunchDaemons
	sudo chown root:wheel /Library/LaunchDaemons/${@F}


run:
	@${DEST}/${PROGRAM};



