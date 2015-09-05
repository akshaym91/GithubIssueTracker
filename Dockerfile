FROM dockerfile/nodejs

MAINTAINER Akshay Menon, akshaym91@gmail.com

WORKDIR /home/issue-tracker

# Install issue-tracker Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install issue-tracker packages
ADD package.json /home/issue-tracker/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/issue-tracker/.bowerrc
ADD bower.json /home/issue-tracker/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/issue-tracker

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt"]