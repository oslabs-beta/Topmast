FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="Topmast" \
    org.opencontainers.image.description="Topmast is an extension that creates a dashboard for logging, CPU and memory use for Docker developers" \
    org.opencontainers.image.vendor="Moby-Metrics" \
    com.docker.desktop.extension.api.version="0.3.3" \
    com.docker.desktop.extension.icon="https://github.com/superbunker/8-Bit-GIFs/raw/main/a-black_box.gif" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="Topmast simplifies the management of Docker logs and container statistics. This extension will provide a centralized platform for viewing and analyzing Docker logs, as well as tracking and monitoring container performance. With Topmast, users will be able to consolidate their Docker-related data in one place, enabling easier troubleshooting and analysis." \
    com.docker.extension.publisher-url="https://topmast.dev" \
    com.docker.extension.additional-urls="https://github.com/oslabs-beta/Moby-Metrics" \
    com.docker.extension.changelog=""

COPY docker-compose.yaml .
COPY metadata.json .
COPY docker.svg .
COPY topmast_cruise.svg .
COPY topmast_cruise.png .
COPY --from=client-builder /ui/build ui
