function replaceChanged(data) {
  return data.flatMap((elem) => {
    if (elem.status === 'changed') {
      return [
        { status: 'deleted', key: elem.key, value: elem.value1 },
        { status: 'added', key: elem.key, value: elem.value2 },
      ];
    }
    return elem;
  }).map((elem) => {
    if (Array.isArray(elem.value)) {
      return { status: elem.status, key: elem.key, value: replaceChanged(elem.value) };
    }
    return elem;
  });
}

export default replaceChanged;
