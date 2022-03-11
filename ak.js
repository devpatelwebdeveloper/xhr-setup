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
    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
      "authorization",
      "Intuit_APIKey intuit_apikey=preprdakyresMD3ZWmgX6PHHtqv0rlkGtaaxVwJa, intuit_apikey_version=1.0"
    );
    xhr.setRequestHeader("cache-control", "no-cache");

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

    xhr.send(data);
  });
  return promise;
};

const getData = (btnID) => {
  sendHttpRequest(
    "POST",
    "https://experimentassignment-e2e.api.intuit.com/api/v4/assignments/experiments/87987/users"
  ).then((responseData) => {
    const btn = document.getElementById(btnID);
    // if (!btn.href.includes(`&flowId=${responseData.payload}`)) {
    btn.href = `${btn.href}&flowId=${responseData.payload}`;
    const getNewUrl = btn.href;
    location.href = getNewUrl;
    // }
  });
};

const modalEasyStartBtnID = "payroll-together-btn-QBO_SIMPLE_START";
const modalEssentialsBtnID = "payroll-together-btn-QBO_ESSENTIALS";
const modalPlusBtnID = "payroll-together-btn-QBO_PLUS";
const easyStartCard = document.getElementById(
  "easy-start-small-business-accounting"
);
// Modal
const modalButton = (modalBtn) => {
  const buyBtn = document.getElementById(modalBtn);
  // getData(modalBtn);
  // buyBtn.addEventListener(getData(modalBtn));
  if (buyBtn) {
    buyBtn.onclick = () => {
      getData(modalBtn);
    };
  }
};
//Inital Modal Setup
modalButton(modalEasyStartBtnID);
modalButton(modalEssentialsBtnID);
modalButton(modalPlusBtnID);
// checkButton(easyStartCard);
const suiMutationObserver = new MutationObserver((mutationRecords) => {
  // checkButton(easyStartCard);  // Use this when Direct Pricing Card
  modalButton(modalEasyStartBtnID);
  modalButton(modalEssentialsBtnID);
  modalButton(modalPlusBtnID);
});
suiMutationObserver.observe(easyStartCard, {
  childList: true
});
