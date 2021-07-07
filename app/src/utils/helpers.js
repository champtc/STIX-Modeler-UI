import _cloneDeep from 'lodash/cloneDeep';

export const removeEmptyValues = bundle => {
  let bundleClone = _cloneDeep(bundle);
  bundleClone.objects.map(o => {
    for (let key in o) {
      console.log('Key', key);
      if (Array.isArray(o[key])) {
        if (!o[key].length) {
          delete o[key];
        }
      } else {
        if (typeof o[key] === 'object') {
          if (!Object.keys(o[key]).length) {
            delete o[key];
          }
        } else {
          if (o[key] && !o[key].length) {
            delete o[key];
          }
          if (!o[key]) {
            delete o[key];
          }
        }
      }
    }
  });
  return bundleClone;
};
