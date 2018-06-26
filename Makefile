.PHONY: all deploy run
all: deploy;

include stdmacros.mk


DEST=${HOME}/bin
PROGRAM=hbfileserver
PACROOT=${HOME}/env/conf/autoproxy;

OS=Darwin


deploy: copy/${PROGRAM}.js copy/${PROGRAM} deploy.${OS}

deploy.Darwin: installplist-Darwin/install.Darwin/com.nokiddin.hailbopp.hbfileserver.plist

copy/%: 
	@${CP} ${@F} ${DEST}/;


installplist-Darwin/%:
	df=${@D} ff=${@F}; sudo ${CP} $$(basename $$df)/$$ff /Library/LaunchDaemons
	sudo chown root:wheel /Library/LaunchDaemons/${@F}


run:
	@${DEST}/${PROGRAM};



