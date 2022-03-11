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

const getData = (btn) => {
  sendHttpRequest(
    "POST",
    "https://experimentassignment-e2e.api.intuit.com/api/v4/assignments/experiments/87987/users"
  ).then((responseData) => {
    btn.href = `${btn.href}&flowId=${responseData.payload}`;
    const getNewUrl = btn.href;
    location.href = getNewUrl;
  });
};

//Buy Modal
const modalEasyStartBtnID = "payroll-together-btn-QBO_SIMPLE_START";
const modalEssentialsBtnID = "payroll-together-btn-QBO_ESSENTIALS";
const modalPlusBtnID = "payroll-together-btn-QBO_PLUS";
const modalButton = (modalBtn) => {
  const buyBtn = document.getElementById(modalBtn);
  if (buyBtn) {
    buyBtn.onclick = (e) => {
      e.preventDefault();
      getData(buyBtn);
    };
  }
};
//Inital Modal Setup
modalButton(modalEasyStartBtnID);
modalButton(modalEssentialsBtnID);
modalButton(modalPlusBtnID);
const buyModalObserver = new MutationObserver((mutationRecords) => {
  // checkButton(easyStartCard);  // Use this when Direct Pricing Card
  modalButton(modalEasyStartBtnID);
  modalButton(modalEssentialsBtnID);
  modalButton(modalPlusBtnID);
});
buyModalObserver.observe(document.body, {
  childList: true
});

// Trial Modal

// Payroll Toggle
const easyStartCard = document.getElementById(
  "easy-start-small-business-accounting"
);
const essentialsCard = document.getElementById(
  "essentials-small-business-accounting"
);
const plusCard = document.getElementById("plus-small-business-accounting");

const checkButton = (divchild) => {
  const cardBtn = divchild.children[0];
  console.log(`cardBtn`, cardBtn);
  const buyBtn = cardBtn
    .querySelector("[class*='PricingCardItem_module_pricingCtas']")
    .querySelector(".pricing-button")
    .querySelector("[data-testid='button']");
  if (buyBtn.href) {
    buyBtn.onclick = (e) => {
      e.preventDefault();
      getData(buyBtn);
    };
  }
};
const payrollToggleObserver = new MutationObserver((mutationRecords) => {
  console.log("toggle Changed");
  checkButton(easyStartCard);
  checkButton(essentialsCard);
  checkButton(plusCard);
});

payrollToggleObserver.observe(easyStartCard, {
  subtree: true,
  attributes: true
});
