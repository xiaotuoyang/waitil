/**
 *
 * @param {Function} condition
 * @param {Number|String} interval
 * @param {Number|String} timeout
 * @return {Promise}
 */
module.exports = function waitUntil(condition, interval, timeout) {
  timeout = +timeout || 60000;
  interval = +interval || 1000;

  const timers = [];
  let stop = false;
  return new Promise((rs, rj) => {
      timers.push(setTimeout(callCondition, interval));
      timers.push(
          setTimeout(() => {
              clearTimer();
              rj(new Error(`timeout: ${timeout}ms`));
          }, timeout)
      );

      function clearTimer () {
          // eslint-disable-next-line no-restricted-syntax
          for (const timer of timers) {
              clearTimeout(timer);
          }
          stop = true;
      };

      async function callCondition() {
          try {
              if (result = await condition()) {
                  clearTimer();
                  rs(result);
                  return;
              }
              if (stop) {
                  clearTimer();
                  return;
              }
              // use setTimeout
              timers.push(setTimeout(callCondition, interval));
          } catch (error) {
              clearTimer();
              rj(error);
          }
      }
  });
};
