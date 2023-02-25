// use the docker engine API to fetch containers and their logs
// this was originally intended as backend middleware, so that's
// why it's creating an object to export as a module

// i am not great at async, so be savage if you need to Chris :-)

// docker enginer API reference, 1.42 is current
// https://docs.docker.com/engine/api/v1.42/

const axios = require('axios');

logGetter = {};
logs = {};
containers = {};

//write this so that only new containers are added
logGetter.updateContainers = async (containers) => {
  // run a get request on the docker engine daemon
  // that returns all containers
  try {
    //by default the daemon returns running containers, the all=true
    //parameter returns all of them
    await axios.get('/containers/json?all=true', {
      socketPath: '/var/run/docker.sock',
    })
    .then((res) => {
      // res.data is our array of containers
      res.data.forEach(container => {
        // only add new containers
        // #TODO update changes in container state
        if (containers[container.Id] === undefined){
          containers[container.Id] = container;
        }
      })
    })
  } catch (error) {
    console.log('error in fetching container ids');
    console.log(error);
  }
  return containers;
  
}

logGetter.getLogs = async (containers) => {
  try {
    let ids = Object.keys(containers);
    ids.forEach(id => {
      // i think you use the parameter follow=true to keep a stream open
      //
      // how do we handle a stream for each container?
      axios.get(`/containers/${id}/logs?stderr=true`, {
        socketPath: '/var/run/docker.sock',
      })
      .then((log) => {
        logs[id] = log;
      })
    });
  } catch (error) {
    console.log('error in fetching logs');
    console.log(error.response);
  }
  
}

// stats is similar to the above. here's the start of it. stream=true
// keeps the connection open

// await axios.get(`/containers/${ids}/stats?stream=false`, {
//   socketPath: '/var/run/docker.sock'})

// just a test function
containers = logGetter.updateContainers(containers);


module.exports = logGetter;