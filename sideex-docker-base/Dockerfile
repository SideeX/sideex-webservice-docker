FROM ubuntu:bionic-20191029
LABEL authors="SideeX Team <feedback@sideex.io>"

#================================================
# Customize sources for apt-get
#================================================
RUN  echo "deb http://archive.ubuntu.com/ubuntu bionic main universe\n" > /etc/apt/sources.list \
  && echo "deb http://archive.ubuntu.com/ubuntu bionic-updates main universe\n" >> /etc/apt/sources.list \
  && echo "deb http://security.ubuntu.com/ubuntu bionic-security main universe\n" >> /etc/apt/sources.list

# No interactive frontend during docker build
ENV DEBIAN_FRONTEND=noninteractive \
    DEBCONF_NONINTERACTIVE_SEEN=true

#========================
# Miscellaneous packages
# Includes minimal runtime used for executing non GUI Java programs
#========================
RUN apt-get -qqy update \
  && apt-get -qqy --no-install-recommends install \
    bzip2 \
    ca-certificates \
    tzdata \
    sudo \
    unzip \
    wget \
    jq \
    curl \
    supervisor \
    gnupg2 \
  && curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#===================
# Timezone settings
# Possible alternative: https://github.com/docker/docker/issues/3359#issuecomment-32150214
#===================
ENV TZ "UTC"
RUN echo "${TZ}" > /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata

#========================================
# Add normal user with passwordless sudo
#========================================
RUN useradd -ou 0 -g 0 sideex \
         --shell /bin/bash  \
         --create-home \
  && echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
  && echo 'sideex:secret' | chpasswd
ENV HOME=/home/sideex

COPY entry_point.sh /opt/bin/
COPY sideex.js /opt/sideex-webservice/

RUN node /opt/sideex-webservice/sideex.js

#======================================
# Add Supervisor configuration file
#======================================
COPY supervisord.conf /etc

RUN  mkdir -p /var/run/supervisor /var/log/supervisor \
  && chmod -R 777 /var/run/supervisor /var/log/supervisor /etc/passwd \
  && chgrp -R 0 /var/run/supervisor /var/log/supervisor \
  && chmod -R g=u /var/run/supervisor /var/log/supervisor

#===================================================
# Run the following commands as non-privileged user
#===================================================
USER sideex

CMD ["/opt/bin/entry_point.sh"]
