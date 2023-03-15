function replaceChanged(data) {
  return data.flatMap((elem) => {
    const { status, key } = elem;
    if (status === 'changed') {
      return [
        {
          status: 'deleted',
          key,
          value: elem.value1,
        },
        {
          status: 'added',
          key,
          value: elem.value2,
        },
      ];
    }
    return elem;
  }).map((elem) => {
    const { status, key, value } = elem;
    if (Array.isArray(value)) {
      return {
        status,
        key,
        value: replaceChanged(value),
      };
    }
    return elem;
  });
}

export default replaceChanged;
