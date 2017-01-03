FROM node:boron

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Create app and switch directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
# ENV PATH="~/.yarn/bin:$PATH"
RUN ~/.yarn/bin/yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
