const cheerio = require("cheerio");
const axios = require("axios");

const scrapeData = async (url) => {
    try {
        const jobsArray = []

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const selector = ".sponTapItem > div.slider_container > div > div.slider_item > div > table.jobCard_mainContent > tbody > tr > td.resultContent"
        const keys = ["jobName", "companyName"];

        $(selector).each((parentIndex, parentElement) => {
            const jobData = {};
            $(parentElement).children().children().children().each((childIndex, childElement) => {
                if (!($(childElement).html().startsWith("<")) || !($(childElement).html().endsWith(">"))) {
                    if (childIndex !== 2) jobData[keys[childIndex]] = $(childElement).html();
                };          
            });
            jobsArray.push(jobData);
        });
        const cleanJobsArray = jobsArray.filter(obj => obj.jobName && obj.companyName);
        return cleanJobsArray;
    } catch (error) {
        console.log(`Something went wrong...${error}`);
    };
};

module.exports = scrapeData;