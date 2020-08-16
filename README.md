# js-promise-concurrency
JS Promise concurrency

Example:

  var tq = new taskq(2);        //max concurrency = 2

  tq.enqueue((resolve) => {
    setTimeout(() => {
      console.log('t1');
      resolve();
    }, 1000);
  })
  .enqueue((resolve) => {
    setTimeout(() => {
      console.log('t2');
      resolve();
    }, 2000);
  })
  .enqueue((resolve) => {
    console.log('t3');
    resolve();
  })
  .enqueue((resolve) => {
    console.log('t4');
    resolve();
  });

  tq.ready().then(() => {
    console.log('ready!!!!');
  });
