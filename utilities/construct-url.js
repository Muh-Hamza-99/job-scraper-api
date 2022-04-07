const constructURL = params => {
    const paramObj = { ...params };

    const setParams = ["name", "location", "jobType", "dateOfPost", "language"];
    const originalParams = ["q", "l", "jt", "fromage", "l"];

    let url = "https://sa.indeed.com/jobs?";
    for (let key of Object.keys(paramObj)) {
        if (!setParams.includes(key)) return `Invalid query parameter passed: ${key}`;
        const position = setParams.indexOf(key);
        url += `${originalParams[position]}=${paramObj[key]}&`;
    };
    url = url.slice(0, -1);
    return url;
};

module.exports = constructURL;