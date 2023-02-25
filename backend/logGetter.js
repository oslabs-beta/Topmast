// use the docker engine API to fetch containers and their logs

const axios = require('axios');

logGetter = {};
ids = [];
logs = {};

logGetter.getContainerIds = async (req, res, next) => {
  // run a get request on the docker engine daemon
  // that returns all containers
  try{
    await axios.get('/containers/json?all=true', {
      socketPath: '/var/run/docker.sock',
    })
    .then((containers) => {
      containers.data.forEach(container => {
        ids.push(container.Id);
      })
    });
    } catch (error) {
      console.log('error in fetching container ids');
      console.log(error.response);
  }
  
  // axios.get(`/containers/${ids[0]}/stats?stream=false`, {
  //   socketPath: '/var/run/docker.sock',
  // }).then((stats) => {console.log(stats);})

  // grab each log
  try {
    ids.forEach(id => {
      // do we use stderr or stdout?
      axios.get(`/containers/${id}/logs?stderr=true`, {
        socketPath: '/var/run/docker.sock',
      })
      .then((log) => {
        console.log(log);
        // console.log(log);
        // console.log(log.data);
        logs[id] = log;
      })
    });
  } catch (error) {
    console.log('error in fetching logs');
    console.log(error.response);
  }

  console.log(logs);
}
  // .then((containers) => {
  //   for (let container in containers.data){
  //     console.log(container.id);
  //     ids.push(container.data.id);
  //   }
  //   console.log(ids);
  // })
  
  // disable when using locally
  // next();



logGetter.getContainerIds();
// logGetter.getLogs();

// getContainers();

module.exports = logGetter;