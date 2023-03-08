// use the docker engine API to fetch containers and their logs
// this was originally intended as backend middleware, so that's
// why it's creating an object to export as a module


// docker enginer API reference, 1.42 is current
// https://docs.docker.com/engine/api/v1.42/

const axios = require('axios');
const http = require('http');

logGetter = {};
// logs = {};
containers = {};
stats = {};

// this function will return a promise with all containers on resolution
logGetter.updateContainers = async (containers) => {
  // run a get request on the docker engine daemon
  // that returns all containers
  try {
    //by default the daemon returns running containers, the all=true
    //parameter returns all of them
    const { data }  = await axios.get('/containers/json?all=true', {
      socketPath: '/var/run/docker.sock',
    })
      // res.data is our array of containers
      // console.log(JSON.stringify(data, null, 2));
    data.forEach(container => {
      // only add new containers
        // #TODO update changes in container state
      if (containers[container.Id] === undefined){
        containers[container.Id] = container;
      }
      // console.log(container.Id);
      // logs[container.Id] = await logGetter.getLog(container.Id);
      // console.log(logs, null, 2);
        return containers;
    });
  } catch (error) {
    console.log('error in fetching container ids');
    console.log(error);
  }

}

// logGetter.getLog = async (id) => {
//   console.log('get log is running');
//   // console.log(id);
//   try {
//     let log = await axios.get(`/containers/${id}/logs?stderr=true`, {
//       socketPath: '/var/run/docker.sock',
//     })
//     console.log(log);
//     return log;
//   } catch (error) {
//     console.log('error in fetching log for ', id);
//     console.log(error);
//   }
// }


// ASYNC VERSION
logGetter.getLogs = async (containers) => {
  console.log('get logs is running');
  console.log(containers);
  // const thing = await containers
  try {
    console.log('fetching ids');
    let ids = await Object.keys(containers);
    console.log('looping through ids');
    ids.forEach(id => {
      // i think you use the parameter follow=true to keep a stream open
      //
      // how do we handle a stream for each container?
      console.log('attempting to get logs for ', id);
      axios.get(`/containers/${id}/logs?stderr=true`, {
        socketPath: '/var/run/docker.sock',
      })
      .then((log) => {
        logs[id] = log;
      }).then(() => {
        console.log(logs);
      })
    });
  } catch (error) {
    console.log('error in fetching logs');
    console.log(error.response);
  }
  
}

// SYNC VERSION COPIED FROM DOCKER-WATCH-APP
logGetter.getStats = (id) => {
  let statsBody = [];
  // const log = axios.get(`/containers/${id}/stats`, {
  //   socketPath: '/var/run/docker.sock',})
  const clientStatsOptions = {
    socketPath: '/var/run/docker.sock',
    path: `/v1.41/containers/${id}/stats?stream=false`,
    method: 'GET',
  };
  const stats = http.request(clientStatsOptions, (resStats) => {
    let statsBody = [];
      // collect the data
    resStats.on('data', (chunk) => {
      statsBody.push(chunk);
    });
    resStats.on('end', () => {
      statsBody = JSON.parse(Buffer.concat(statsBody));
      let print = JSON.stringify(statsBody, null, 2);
    })
  });
  stats.end();
  // console.log(statsBody);
}

// ASYNC GET STATS
// logGetter.getStats = async (containers) => {
//   try {
//     let ids = Object.keys(containers);
//     ids.forEach(id => {
//       // i think you use the parameter follow=true to keep a stream open
//       //
//       // how do we handle a stream for each container?
//       console.log(`attempting to get stats for`, id);
//       axios.get(`/containers/${id}/stats`, {
//         socketPath: '/var/run/docker.sock',
//       })
//       .then((stat) => {
//         stats[id] = stat;
//       }).then(() => {
//         console.log(JSON.stringify(stats));
//       })
//     });
//   } catch (error) {
//     console.log('error in fetching logs');
//     console.log(error.response);
//   }
// }

// just a test function
// conta
containers = logGetter.updateContainers(containers);
// console.log(containers);

logGetter.getStats('f6d0631bb99c07be290e1e25568a5ccec4b6e0d26c0e99929173526d6880b728');
// logGetter.getLogs(containers);
// logGetter.getStats(containers);


module.exports = logGetter;