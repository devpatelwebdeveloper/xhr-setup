const flowId = "en-ca-qbo-buy-intuit-brand-leader";

//Pricing Card Items
const easyStartCard = document.getElementById(
  "easy-start-small-business-accounting"
);
//Payroll Together Modal Btn IDs
const modalEasyStartBtnID = "payroll-together-btn-QBO_SIMPLE_START";
const modalEssentialsBtnID = "payroll-together-btn-QBO_ESSENTIALS";
const modalPlusBtnID = "payroll-together-btn-QBO_PLUS";
//Direct Pricing Card
const checkButton = (divchild, varFlowId) => {
  const cardBtn = divchild.children[0];
  console.log(`cardBtn`, cardBtn);
  const buyBtn = cardBtn
    .querySelector("[class*='PricingCardItem_module_pricingCtas']")
    .querySelector(".pricing-button")
    .querySelector("[data-testid='button']");
  if (buyBtn.href) {
    console.log(`Original`, buyBtn.href);
    buyBtn.href = `${buyBtn.href}&flowId=${varFlowId}`;
    console.log(`Changed`, buyBtn.href);
  }
};
// Modal
const modalButton = (modalBtn, varFlowId) => {
  const buyBtn = document.getElementById(modalBtn);
  if (buyBtn) {
    if (!buyBtn.href.includes(`&flowId=${varFlowId}`)) {
      buyBtn.href = `${buyBtn.href}&flowId=${varFlowId}`;
    }
  }
};
//Inital Modal Setup
modalButton(modalEasyStartBtnID, flowId);
modalButton(modalEssentialsBtnID, flowId);
modalButton(modalPlusBtnID, flowId);
// checkButton(easyStartCard, flowId);
const suiMutationObserver = new MutationObserver((mutationRecords) => {
  // checkButton(easyStartCard, flowId);  // Use this when Direct Pricing Card
  modalButton(modalEasyStartBtnID, flowId);
  modalButton(modalEssentialsBtnID, flowId);
  modalButton(modalPlusBtnID, flowId);
});
suiMutationObserver.observe(easyStartCard, {
  childList: true
});
// Trial
var elemToObserve = document.querySelector(
  '[class*="PayrollTogether_payrollPriceSection"]'
);
console.log("elemToObserve", elemToObserve);
// var prevClassState = elemToObserve.classList.contains('false');
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     if (mutation.attributeName == "class") {
//       var currentClassState = mutation.target.classList.contains('false');
//       modalButton(modalEasyStartBtnID, flowId)
//       modalButton(modalEssentialsBtnID, flowId)
//       modalButton(modalPlusBtnID, flowId)
//     }
//   });
// });
// observer.observe(elemToObserve, {
//   attributes: true,
//   subtree: true
// });
