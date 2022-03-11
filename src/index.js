import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    var data = JSON.stringify({
      assignmentParams: {
        assignmentOptions: {
          allowDynamicWLBL: true,
          allowRemoteAssgmnts: true,
          existingPersistentAssgmntsOnly: true,
          includePersistentAssgmnts: true,
          includeRemoteTaggedIds: true,
          runningPersistentExptsOnly: true
        },
        contextMap: {}
      },
      entityId: {
        IVID: "string",
        ns: "sbgm-ca-xhr"
      }
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });
    xhr.open(method, url);

    // xhr.open(
    //   "POST",
    //   "https://experimentassignment-e2e.api.intuit.com/api/v4/assignments/experiments/87987/users"
    // );
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
      "authorization",
      "Intuit_APIKey intuit_apikey=preprdakyresMD3ZWmgX6PHHtqv0rlkGtaaxVwJa, intuit_apikey_version=1.0"
    );
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.responseType = "json";

    // if (data) {
    //   xhr.setRequestHeader('Content-Type', 'application/json');
    // }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    // xhr.send(JSON.stringify(data));
    xhr.send(data);
  });
  return promise;
};

const getData = () => {
  sendHttpRequest(
    "POST",
    "https://experimentassignment-e2e.api.intuit.com/api/v4/assignments/experiments/87987/users"
  ).then((responseData) => {
    console.log(responseData);
  });
};

// const getData = () => {
//   var data = JSON.stringify({
//     assignmentParams: {
//       assignmentOptions: {
//         allowDynamicWLBL: true,
//         allowRemoteAssgmnts: true,
//         existingPersistentAssgmntsOnly: true,
//         includePersistentAssgmnts: true,
//         includeRemoteTaggedIds: true,
//         runningPersistentExptsOnly: true
//       },
//       contextMap: {}
//     },
//     entityId: {
//       IVID: "string",
//       ns: "sbgm-ca-xhr"
//     }
//   });

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open(
//     "POST",
//     "https://experimentassignment-e2e.api.intuit.com/api/v4/assignments/experiments/87987/users"
//   );
//   xhr.setRequestHeader("content-type", "application/json");
//   xhr.setRequestHeader(
//     "authorization",
//     "Intuit_APIKey intuit_apikey=preprdakyresMD3ZWmgX6PHHtqv0rlkGtaaxVwJa, intuit_apikey_version=1.0"
//   );
//   xhr.setRequestHeader("cache-control", "no-cache");

//   xhr.send(data);
// };

const btn = document.getElementById("get-data");

btn.addEventListener("click", getData);
