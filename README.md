# Topmast


## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)


## General info

Topmast is a Docker extension that simplifies the management of Docker logs and container statistics. This extension provides a centralized platform for viewing and analyzing Docker logs, as well as tracking and monitoring container performance. With Topmast, users can consolidate their Docker-related data in one place, enabling easier troubleshooting and analysis.


## Technologies

Topmast utilizes the following technologies:

- React
- Docker
- MUI
- Typescript
- Chart.js


## Setup

To install and run Topmast locally:

```bash
npm run install-extension
npm run enable-frontend-dev
```

The first command will build and install the Topmast container. In the current build, this is insufficient to run Topmast. We also have to enable frontend development mode with the second command. This mode also enables hot module reloading, so you do not have to build and install a new container to test every change.

To verify that Topmast has installed correctly, open Docker Desktop once the installation is complete. The left-hand menu will display an extension with the Topmast logo. You can also use `docker extension ls` to see that the extension has been installed successfully.


### Chrome DevTools

Docker Desktop is built in Electron, which provides access to the Chrome Dev Tools. To create a new Dev Tools window when you click on the extension's tab, run:

```bash
npm run enable-chrome-devtools
```

To disable this behavior, run:

```bash
npm run disable-chrome-devtools
```


### Uninstalling

To remove the extension:

```bash
npm run uninstall-extension
```


## Using Topmast

The dashboard view displays all local docker containers along with their key metrics and common commands:

> _CARD IMAGE GOES HERE_

`Force Remove` will kill and remove the container

Topmast will poll all containers at one second intervals by default. This behavior can be adjusted in the useEffect hook in the DashboardView component.

Each container card has a link to a detail view. This feature is under construction and currently displays dummy data:

> _DETAIL IMAGE GOES HERE_

Navigating to the logs page will display a list of all logs generated by the local containers. Logs can be filtered by container by using the checkboxes at the top of the page. The filter choices will persist even if the user navigates to another extension:

> _LOGS IMAGE GOES HERE_


## Testing

:construction::warning: Under construction! :warning::construction:



## What's next?

- To learn more about Docker extension development refer to the Extension SDK docs at https://docs.docker.com/desktop/extensions-sdk/.
- 

## Contributors

 - **Bjorn Calrson** : [GitHub](https://github.com/bacarlsson86)

 - **Chris Kulaczkowski** : [LinkedIn](https://www.linkedin.com/in/chris-iscoding/) | [GitHub](https://github.com/Chris-isCoding)

 - **Jason Brown** : [LinkedIn](https://www.linkedin.com/in/jasonbr/) | [GitHub](https://github.com/superbunker)

 - **Michael Ruiz** : [LinkedIn](https://www.linkedin.com/in/michael-a-ruiz/) | [GitHub](https://github.com/Ruizmichael)

 - **Ryan Gause** : [LinkedIn](https://www.linkedin.com/in/ryangause) | [GitHub](https://github.com/Gauserr)


.


