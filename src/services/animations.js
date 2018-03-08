export const animateEntrance = dom =>
  dom.animate(
    [
      { transform: "translate3d(0,-100%,0)", opacity: 0 },
      { transform: "none", opacity: 1 },
    ],
    {
      duration: 850,
    }
  );

export const animateExit = dom => {
  let anim = [
    { transform: "none", opacity: 1 },
    { transform: "translate3d(25%,100%,0)", opacity: 0 },
  ];
  let waapi = dom.animate(anim, {
    duration: 850,
  });

  return new Promise(resolve => {
    waapi.onfinish = function(e) {
      console.log("finished exit()");
      resolve();
    };
  });
};
